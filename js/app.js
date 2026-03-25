// Main Application - Navigation and initialization

// Dark Mode
const DarkMode = {
    STORAGE_KEY: 'darkMode',

    init() {
        const enabled = localStorage.getItem(this.STORAGE_KEY) === 'true';
        this.apply(enabled);
        document.getElementById('dark-mode-toggle')
            ?.addEventListener('click', () => this.toggle());
    },

    toggle() {
        const next = !document.body.classList.contains('dark-mode');
        localStorage.setItem(this.STORAGE_KEY, next);
        this.apply(next);
    },

    apply(enabled) {
        document.body.classList.toggle('dark-mode', enabled);
        const btn = document.getElementById('dark-mode-toggle');
        if (btn) btn.textContent = enabled ? '☀️' : '🌙';
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', enabled ? '#1a1a1a' : '#2e7d32');
    }
};

// Daily Reminder
const DailyReminder = {
    PREF_KEY: 'notificationsEnabled',

    init() {
        this.updateButtonState();
        document.getElementById('notification-toggle')
            ?.addEventListener('click', () => this.handleToggle());
        this.checkAndNotify();
    },

    isEnabled() {
        return localStorage.getItem(this.PREF_KEY) === 'true';
    },

    updateButtonState() {
        const btn = document.getElementById('notification-toggle');
        if (!btn) return;
        const enabled = this.isEnabled();
        btn.textContent = enabled ? '🔕' : '🔔';
        btn.title = enabled ? 'Herinnering uitschakelen' : 'Dagelijkse herinnering instellen';
    },

    async handleToggle() {
        if (this.isEnabled()) {
            localStorage.setItem(this.PREF_KEY, 'false');
            this.updateButtonState();
            return;
        }
        if (!('Notification' in window)) {
            alert('Je browser ondersteunt geen meldingen.');
            return;
        }
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            localStorage.setItem(this.PREF_KEY, 'true');
            this.updateButtonState();
            new Notification('Impara l\'Italiano 🇮🇹', {
                body: 'Herinneringen zijn ingeschakeld! Tot vanavond.',
                icon: 'icons/icon.svg'
            });
        } else {
            alert('Meldingen zijn geblokkeerd. Pas dit aan in je browserinstellingen.');
        }
    },

    checkAndNotify() {
        if (!this.isEnabled()) return;
        if (!('Notification' in window) || Notification.permission !== 'granted') return;

        const hour = new Date().getHours();
        if (hour < 18) return;

        const todayStr = new Date().toISOString().slice(0, 10);
        const lastNotified = localStorage.getItem('lastReminderDate');
        if (lastNotified === todayStr) return;

        const progress = Progress.load();
        const todayEntry = progress.dailyHistory
            ? progress.dailyHistory.find(d => d.date === todayStr)
            : null;
        if (todayEntry && todayEntry.xp > 0) return;

        localStorage.setItem('lastReminderDate', todayStr);
        new Notification('Impara l\'Italiano 🇮🇹', {
            body: 'Je hebt vandaag nog niet geoefend. Doe nog even een paar minuten Italiaans!',
            icon: 'icons/icon.svg'
        });
    }
};

const App = {
    currentModule: 'home',

    // Initialize the application
    init() {
        // Apply dark mode before anything renders
        DarkMode.init();

        // Initialize progress first
        Progress.init();

        // Initialize daily reminder (needs progress data)
        DailyReminder.init();

        // Setup navigation
        this.setupNavigation();

        // Initialize all modules
        CustomWords.init();
        Vocabulary.init();
        Grammar.init();
        Conjugation.init();
        Speaking.init();
        GameModule.init();
        Listening.init();
        Pronunciation.init();
        this.initDashboard();
        this.initLevelSelector();

        // Setup responsive menu
        this.setupResponsiveMenu();

        // Update home game highscore
        const homeGameHigh = document.getElementById('home-game-highscore');
        if (homeGameHigh) {
            homeGameHigh.textContent = localStorage.getItem('quizHighScore') || '0';
        }

        // Show home module
        this.showModule('home');

        console.log('Impara l\'Italiano initialized!');
    },

    // Setup navigation
    setupNavigation() {
        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const module = item.dataset.module;
                this.showModule(module);
            });
        });

        // Home cards navigation
        document.querySelectorAll('.home-card').forEach(card => {
            card.addEventListener('click', () => {
                const module = card.dataset.module;
                this.showModule(module);
            });
        });

        // Back to home buttons
        document.querySelectorAll('.back-to-home-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target || 'home';
                this.showModule(target);
            });
        });
    },

    // Show a specific module
    showModule(moduleName) {
        // Update current module
        this.currentModule = moduleName;

        // Update active state in sidebar
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.module === moduleName);
        });

        // Show/hide modules
        document.querySelectorAll('.module').forEach(module => {
            module.classList.remove('active');
        });

        const moduleElement = document.getElementById(`${moduleName}-module`);
        if (moduleElement) {
            moduleElement.classList.add('active');
        }

        // Close mobile menu if open
        document.querySelector('.sidebar')?.classList.remove('open');

        // Scroll to top
        window.scrollTo(0, 0);
    },

    // Initialize progress dashboard
    initDashboard() {
        const toggle = document.getElementById('dashboard-toggle');
        const body = document.getElementById('dashboard-body');
        if (!toggle || !body) return;

        toggle.addEventListener('click', () => {
            const isOpen = body.style.display !== 'none';
            body.style.display = isOpen ? 'none' : 'block';
            toggle.querySelector('.dashboard-chevron').textContent = isOpen ? '▼' : '▲';
            if (!isOpen) this.renderDashboard();
        });
    },

    renderDashboard() {
        const progress = Progress.load();

        // Streak dots (last 30 days)
        const dotsEl = document.getElementById('streak-dots');
        if (dotsEl) {
            const days = Progress.getLast30Days();
            dotsEl.innerHTML = days.map(d => {
                const cls = d.active ? (d.xp >= 50 ? 'dot-goal' : 'dot-active') : 'dot-empty';
                return `<span class="streak-dot ${cls}" title="${d.date}: ${d.xp} XP"></span>`;
            }).join('');
        }

        // Stats
        const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        setEl('dash-words-learned', progress.vocabulary.learned.length);
        setEl('dash-grammar-done', progress.grammar.completedTopics.length);
        setEl('dash-verbs-mastered', progress.conjugation.masteredVerbs.length);
        setEl('dash-streak', progress.streak);

        // Category bars
        const barsEl = document.getElementById('dashboard-category-bars');
        if (barsEl) {
            const entries = Object.entries(AppData.vocabulary).map(([key, cat]) => {
                const total = cat.words.length;
                const learned = cat.words.filter((w, i) =>
                    progress.vocabulary.learned.includes(`${key}_${i}`)
                ).length;
                const pct = total > 0 ? Math.round((learned / total) * 100) : 0;
                return { name: cat.name, icon: cat.icon, learned, total, pct };
            }).sort((a, b) => b.pct - a.pct);

            barsEl.innerHTML = entries.map(e => `
                <div class="cat-bar-row">
                    <span class="cat-bar-label">${e.icon} ${e.name}</span>
                    <div class="cat-bar-track">
                        <div class="cat-bar-fill" style="width:${e.pct}%"></div>
                    </div>
                    <span class="cat-bar-pct">${e.learned}/${e.total}</span>
                </div>
            `).join('');
        }
    },

    // Setup responsive menu for mobile
    setupResponsiveMenu() {
        // Create menu toggle button
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Menu');
        document.body.appendChild(menuToggle);

        menuToggle.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.sidebar');
            const toggle = document.querySelector('.menu-toggle');

            if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    },

    // Initialize the level selector on the home page
    initLevelSelector() {
        this.renderLevelSelector();
        document.getElementById('level-selector-btns')
            ?.addEventListener('click', (e) => {
                const btn = e.target.closest('.level-sel-btn');
                if (!btn) return;
                Progress.setUserLevel(parseInt(btn.dataset.level));
                this.renderLevelSelector();
                if (window.Vocabulary) Vocabulary.renderCategories();
                if (window.Listening) Listening.renderCategories();
            });
    },

    // Render the level selector UI and progress bar
    renderLevelSelector() {
        const CEFR = { 2: 'A1', 3: 'A2', 4: 'B1', 5: 'B2 / Alles' };
        const userLevel = Progress.getUserLevel();

        // Mark active button
        document.querySelectorAll('.level-sel-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.level) === userLevel);
        });

        // Progress bar and text
        const { learned, total, pct } = Progress.getLevelProgress(userLevel);
        const bar = document.getElementById('level-progress-bar');
        const txt = document.getElementById('level-progress-text');
        if (bar) bar.style.width = pct + '%';
        if (txt) txt.textContent = `${learned} van ${total} ${CEFR[userLevel]}-woorden geleerd (${pct}%)`;

        // Level-up suggestion when 80%+ mastered
        const nextLevel = userLevel < 5 ? userLevel + 1 : null;
        const CEFR_NEXT = { 3: 'A2', 4: 'B1', 5: 'B2 / Alles' };
        const existingAlert = document.getElementById('level-up-alert');
        if (pct >= 80 && nextLevel && !existingAlert) {
            const alertEl = document.createElement('div');
            alertEl.id = 'level-up-alert';
            alertEl.className = 'level-up-alert';
            alertEl.innerHTML = `🎉 Goed gedaan! Je beheerst ${pct}% van alle ${CEFR[userLevel]}-woorden. Klaar voor <strong>${CEFR_NEXT[nextLevel]}</strong>?
                <button class="btn btn-small btn-primary btn-level-up">Ga naar ${CEFR_NEXT[nextLevel]}</button>`;
            txt?.after(alertEl);
            alertEl.querySelector('.btn-level-up').addEventListener('click', () => {
                Progress.setUserLevel(nextLevel);
                alertEl.remove();
                this.renderLevelSelector();
                if (window.Vocabulary) Vocabulary.renderCategories();
                if (window.Listening) Listening.renderCategories();
            });
        } else if ((pct < 80 || !nextLevel) && existingAlert) {
            existingAlert.remove();
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Make App globally available
window.App = App;
