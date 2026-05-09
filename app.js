// Firebase 설정 (본인의 정보를 입력하세요)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// 화면 전환
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(`view-${viewId}`).style.display = 'block';
}

// 글 저장 (등록 버튼)
async function saveNovel() {
    const title = document.getElementById('novel-title').value;
    const content = document.getElementById('novel-content').value;

    if(!title || !content) return alert("내용을 입력하세요!");

    try {
        await db.collection("novels").add({
            title: title,
            content: content,
            author: auth.currentUser ? auth.currentUser.email : "익명",
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("연재가 시작되었습니다!");
        showView('home');
        loadNovels();
    } catch (e) {
        console.error("Error: ", e);
    }
}

// 글 불러오기 (다른 사람도 볼 수 있게)
async function loadNovels() {
    const listDiv = document.getElementById('novel-list');
    listDiv.innerHTML = "로딩 중...";
    
    const snapshot = await db.collection("novels").orderBy("createdAt", "desc").get();
    listDiv.innerHTML = "";
    
    snapshot.forEach(doc => {
        const data = doc.data();
        listDiv.innerHTML += `
            <div class="lib-card">
                <div class="lib-thumb"></div>
                <div class="info">
                    <h4>${data.title}</h4>
                    <p>${data.author}</p>
                    <button class="btn-small" onclick="alert('${data.content}')">읽기</button>
                </div>
            </div>
        `;
    });
}

// 로그인 처리 (간단 버전)
function handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => {
        document.getElementById('auth-btn').innerText = "로그아웃";
        loadNovels();
    });
}

// 초기 로딩
window.onload = loadNovels;
