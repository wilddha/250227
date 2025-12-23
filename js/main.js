// PG 관리자 시스템 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 햄버거 메뉴 토글 기능
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (hamburgerMenu && sidebar && sidebarOverlay) {
        // 햄버거 메뉴 클릭 이벤트
        hamburgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });

        // 오버레이 클릭 시 메뉴 닫기
        sidebarOverlay.addEventListener('click', function() {
            closeMenu();
        });

        // 사이드바 메뉴 링크 클릭 시 메뉴 닫기 (모바일에서만)
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });

        // ESC 키로 메뉴 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // 메뉴 토글 함수
    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');

        // body 스크롤 잠금/해제
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // 메뉴 닫기 함수
    function closeMenu() {
        hamburgerMenu.classList.remove('active');
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 창 크기 변경 시 데스크톱에서 메뉴 상태 초기화
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // 테이블 행 클릭 이벤트 (이미 HTML에서 onclick으로 처리됨)

    // 검색 기능
    const searchInputs = document.querySelectorAll('.search-area input[type="text"]');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });

    // 날짜 검색 기능
    const dateInputs = document.querySelectorAll('.date-range input[type="date"]');
    dateInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log('날짜 변경:', this.value);
        });
    });

    // 처리 버튼 클릭 이벤트
    const processButtons = document.querySelectorAll('.info-grid .btn-primary, .info-grid .btn-success');
    processButtons.forEach(button => {
        if (button.textContent.includes('처리')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const row = this.closest('.value');
                const select = row.querySelector('select');
                const status = select.value;

                if (confirm(`상태를 '${status}'(으)로 변경하시겠습니까?`)) {
                    alert('처리가 완료되었습니다.');
                    // 실제 서버 통신은 여기에 구현
                }
            });
        }
    });

    // 저장 버튼 클릭 이벤트
    const saveButtons = document.querySelectorAll('.btn-warning');
    saveButtons.forEach(button => {
        if (button.textContent.includes('저장')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('메모를 저장하시겠습니까?')) {
                    alert('저장되었습니다.');
                    // 실제 서버 통신은 여기에 구현
                }
            });
        }
    });

    // 로그아웃 버튼
    const logoutButtons = document.querySelectorAll('.btn-secondary');
    logoutButtons.forEach(button => {
        if (button.textContent.includes('로그아웃')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('로그아웃 하시겠습니까?')) {
                    alert('로그아웃 되었습니다.');
                    // 실제 로그아웃 처리는 여기에 구현
                    // location.href = '/logout';
                }
            });
        }
    });

    // 추천인추가 버튼
    const addReferralButton = document.querySelector('.btn-primary');
    if (addReferralButton && addReferralButton.textContent.includes('추천인추가')) {
        addReferralButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('추천인 추가 기능은 구현 예정입니다.');
            // 실제 추천인 추가 모달이나 페이지로 이동
        });
    }

    // 섹션 접기/펼치기 기능
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const section = this.parentElement;
            const content = section.querySelector('.info-grid, div[style*="padding"]');

            if (content) {
                if (content.style.display === 'none') {
                    content.style.display = '';
                    this.textContent = this.textContent.replace('▶', '▼');
                } else {
                    content.style.display = 'none';
                    this.textContent = this.textContent.replace('▼', '▶');
                }
            }
        });
    });
});

// 검색 함수
function performSearch() {
    const searchArea = document.querySelector('.search-area');
    if (searchArea) {
        const select = searchArea.querySelector('select');
        const input = searchArea.querySelector('input[type="text"]');

        const searchType = select ? select.value : '';
        const searchTerm = input ? input.value : '';

        console.log('검색 타입:', searchType);
        console.log('검색어:', searchTerm);

        // 실제 검색 로직은 여기에 구현
        alert(`검색: ${searchType} - ${searchTerm}`);
    }
}

// 날짜 범위 검색 함수
function searchByDateRange() {
    const dateInputs = document.querySelectorAll('.date-range input[type="date"]');
    if (dateInputs.length === 2) {
        const startDate = dateInputs[0].value;
        const endDate = dateInputs[1].value;

        console.log('검색 기간:', startDate, '~', endDate);

        // 실제 검색 로직은 여기에 구현
        alert(`기간 검색: ${startDate} ~ ${endDate}`);
    }
}

// 숫자 포맷팅 함수
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 전화번호 포맷팅 함수
function formatPhoneNumber(phone) {
    phone = phone.replace(/[^0-9]/g, '');
    if (phone.length === 11) {
        return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (phone.length === 10) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return phone;
}
