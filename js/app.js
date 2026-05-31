(function () {
    const screens = document.querySelectorAll('.screen');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    const planList = document.getElementById('plan-list');
    const letterClosed = document.getElementById('letter-closed');
    const letterOpen = document.getElementById('letter-open');
    const btnOpenLetter = document.getElementById('btn-open-letter');

    let currentScreen = 0;
    let noClickCount = 0;

    function renderContent() {
        document.getElementById('plan-title').textContent = CONFIG.planTitle;
        document.getElementById('plan-subtitle').textContent = CONFIG.planSubtitle;
        document.getElementById('letter-hint').textContent = CONFIG.letter.hint;
        document.getElementById('letter-text').textContent = CONFIG.letter.text;

        const photo = document.getElementById('letter-photo');
        photo.src = CONFIG.letter.photo;
        photo.onerror = () => {
            photo.style.display = 'none';
            photo.parentElement.classList.add('love-card__photo-wrap--empty');
        };
        document.getElementById('final-title').textContent = CONFIG.final.title;
        document.getElementById('final-text').textContent = CONFIG.final.text;
        toastText.textContent = CONFIG.toastYes;

        planList.innerHTML = CONFIG.plan
            .map(
                (item) =>
                    `<li class="${item.special ? 'plan-list__item--special' : ''}"><span class="icon">${item.icon}</span><span class="text">${item.text}</span></li>`
            )
            .join('');
    }

    function goToScreen(index) {
        if (index < 0 || index >= screens.length) return;

        const current = screens[currentScreen];
        const next = screens[index];

        current.classList.add('screen--exit');
        current.classList.remove('screen--active');

        setTimeout(() => {
            current.classList.remove('screen--exit');
            next.classList.add('screen--active');
            currentScreen = index;
        }, 400);
    }

    function showToast(text, duration = 2500) {
        toastText.textContent = text;
        toast.classList.add('toast--show');
        setTimeout(() => toast.classList.remove('toast--show'), duration);
    }

    function openLetter() {
        const envelope = letterClosed.querySelector('.envelope');
        envelope.classList.add('envelope--open');
        btnOpenLetter.disabled = true;

        setTimeout(() => {
            letterClosed.classList.add('letter-stage--hidden');
            letterOpen.classList.remove('letter-stage--hidden');
        }, 900);
    }

    function moveNoButton() {
        noClickCount++;

        const btn = btnNo;
        const padding = 16;
        const btnRect = btn.getBoundingClientRect();
        const maxX = window.innerWidth - btnRect.width - padding;
        const maxY = window.innerHeight - btnRect.height - padding;

        let newX = Math.random() * maxX + padding;
        let newY = Math.random() * maxY + padding;

        const yesRect = btnYes.getBoundingClientRect();
        const dist = Math.hypot(newX - yesRect.left, newY - yesRect.top);
        if (dist < 120) {
            newX = Math.min(maxX, newX + 100);
            newY = Math.max(padding, newY - 80);
        }

        btn.classList.add('btn--running');
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';
        btn.style.bottom = 'auto';

        const messages = [
            'Точно нет? 🥺',
            'Подумай ещё...',
            'Кнопка «Да» тут 👆',
            'Не получится убежать 😄',
        ];
        if (noClickCount <= messages.length) {
            showToast(messages[noClickCount - 1]);
        }
    }

    btnYes.addEventListener('click', () => {
        showToast(CONFIG.toastYes);
        setTimeout(() => goToScreen(1), 1200);
    });

    btnNo.addEventListener('click', moveNoButton);
    btnNo.addEventListener(
        'touchstart',
        (e) => {
            e.preventDefault();
            moveNoButton();
        },
        { passive: false }
    );

    document.querySelectorAll('[data-next]').forEach((btn) => {
        btn.addEventListener('click', () => goToScreen(currentScreen + 1));
    });

    btnOpenLetter.addEventListener('click', openLetter);

    renderContent();
})();
