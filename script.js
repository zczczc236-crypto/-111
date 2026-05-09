// 화면 전환 함수
function switchView(viewId) {
    // 1. 모든 화면(section)을 찾아서 닫아줍니다 (active 클래스 제거).
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.remove('active');
    });

    // 2. 우리가 보고 싶은 화면(viewId)만 찾아서 열어줍니다 (active 클래스 추가).
    const activeView = document.getElementById(viewId);
    if (activeView) {
        activeView.classList.add('active');
    }
}
