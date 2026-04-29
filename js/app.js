// Main Application - Navigation and initialization

// =============================================
// Confetti — Italiaanse vlagkleuren
// =============================================
function launchConfetti() {
    const colors = ['#009246', '#FFFFFF', '#CE2B37', '#FFC800', '#4DB878', '#E05060'];
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 90 }, () => ({
        x:         Math.random() * canvas.width,
        y:        -20 - Math.random() * 100,
        r:          3 + Math.random() * 5,
        speed:      2.5 + Math.random() * 3,
        color:      colors[Math.floor(Math.random() * colors.length)],
        angle:      Math.random() * Math.PI * 2,
        spin:       (Math.random() - 0.5) * 0.18,
        drift:      (Math.random() - 0.5) * 1.5,
        shape:      Math.random() < 0.5 ? 'circle' : 'rect'
    }));

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            p.angle += p.spin;
            p.y     += p.speed;
            p.x     += p.drift + Math.sin(p.angle) * 0.8;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            if (p.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, p.r, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r);
            }
            ctx.restore();
        });
        frame++;
        if (frame < 140) requestAnimationFrame(draw);
        else canvas.remove();
    }
    requestAnimationFrame(draw);
}
window.launchConfetti = launchConfetti;

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
        if (meta) meta.setAttribute('content', enabled ? '#1a1a1a' : '#009246');
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

        // Voortgang exporteren / delen / importeren
        document.getElementById('btn-export-progress')?.addEventListener('click', () => {
            Progress.exportProgress();
        });
        document.getElementById('btn-share-progress')?.addEventListener('click', () => {
            Progress.shareProgress();
        });
        document.getElementById('btn-import-progress')?.addEventListener('click', () => {
            Progress.importProgress();
        });

        // App vernieuwen knop: wist cache en herlaadt
        document.getElementById('refresh-app-btn')?.addEventListener('click', async () => {
            const btn = document.getElementById('refresh-app-btn');
            if (btn) { btn.textContent = '⏳'; btn.disabled = true; }
            try {
                if ('serviceWorker' in navigator) {
                    const regs = await navigator.serviceWorker.getRegistrations();
                    for (const reg of regs) await reg.unregister();
                }
                const keys = await caches.keys();
                for (const key of keys) {
                    // Bewaar de gebruikersdata-cache — wis alleen app-bestanden
                    if (key !== Progress.USERDATA_CACHE) await caches.delete(key);
                }
            } catch(e) { /* ignore */ }
            window.location.reload(true);
        });

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
        this.renderLearningPath();
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

        // Refresh learning path when navigating to home
        if (moduleName === 'home') {
            this.renderLearningPath();
        }
    },

    // Determine the recommended next learning step
    getNextStep() {
        const userLevel = Progress.getUserLevel();
        const { pct: vocabPct } = Progress.getLevelProgress(userLevel);
        const grammarPct = Progress.getGrammarPct(userLevel);
        const CEFR = { 2: 'A1', 3: 'A2', 4: 'B1', 5: 'B2', 6: 'C1', 7: 'C2' };

        if (vocabPct >= 80 && userLevel < 7) {
            const nextLvl = userLevel + 1;
            return {
                type: 'levelup', icon: '🏆',
                label: `Je beheerst ${vocabPct}% van ${CEFR[userLevel]}! Klaar voor het volgende niveau?`,
                btn: `Ga naar ${CEFR[nextLvl]}`,
                action: () => {
                    Progress.setUserLevel(nextLvl);
                    this.renderLevelSelector();
                    this.renderLearningPath();
                    if (window.Vocabulary) Vocabulary.renderCategories();
                    if (window.Listening) Listening.renderCategories();
                }
            };
        }
        if (vocabPct < 60) {
            const cat = Progress.getWeakestVocabCategory(userLevel);
            const catName = cat ? (AppData.vocabulary[cat]?.name || 'woordenschat') : 'woordenschat';
            return {
                type: 'vocabulary', icon: '📚',
                label: `Oefen woordenschat: ${catName}`,
                btn: 'Oefenen →',
                action: () => {
                    this.showModule('vocabulary');
                    if (cat && window.Vocabulary)
                        setTimeout(() => Vocabulary.startCategory(cat), 150);
                }
            };
        }
        if (grammarPct < 60 && vocabPct >= 30) {
            const p = Progress.load();
            const done = p.grammar.completedTopics;
            const next = (AppData.grammar || []).find(t => !done.includes(t.id));
            return {
                type: 'grammar', icon: '📖',
                label: `Leer grammatica: ${next?.title || 'volgende les'}`,
                btn: 'Lees meer →',
                action: () => {
                    this.showModule('grammar');
                    if (next && window.Grammar)
                        setTimeout(() => Grammar.openTopicReadOnly(next.id), 150);
                }
            };
        }
        if (vocabPct >= 40) {
            return {
                type: 'conjugation', icon: '🔄',
                label: 'Oefen werkwoordvervoegingen',
                btn: 'Oefenen →',
                action: () => this.showModule('conjugation')
            };
        }
        if (vocabPct >= 50) {
            return {
                type: 'listening', icon: '👂',
                label: 'Oefen je luistervaardigheid',
                btn: 'Oefenen →',
                action: () => this.showModule('listening')
            };
        }
        return {
            type: 'vocabulary', icon: '📚',
            label: 'Begin met woordenschat oefenen',
            btn: 'Start →',
            action: () => this.showModule('vocabulary')
        };
    },

    // Render the learning path widget on the home screen
    renderLearningPath() {
        const container = document.getElementById('learning-path-content');
        if (!container) return;
        const step = this.getNextStep();
        const userLevel = Progress.getUserLevel();
        const { pct } = Progress.getLevelProgress(userLevel);
        const CEFR = { 2: 'A1', 3: 'A2', 4: 'B1', 5: 'B2', 6: 'C1', 7: 'C2' };
        const isLevelUp = step.type === 'levelup';

        container.innerHTML = `
            <div class="leerpad-step${isLevelUp ? ' leerpad-levelup' : ''}">
                <div class="leerpad-level-badge">
                    Huidig niveau: <span class="level-badge level-${CEFR[userLevel]}">${CEFR[userLevel]}</span>
                    <span class="leerpad-pct">${pct}% beheerst</span>
                </div>
                <div class="leerpad-bar-wrap">
                    <div class="leerpad-bar" style="width:${pct}%"></div>
                </div>
                <div class="leerpad-next">
                    <span class="leerpad-icon">${step.icon}</span>
                    <span class="leerpad-label">${step.label}</span>
                    <button class="btn btn-primary btn-small leerpad-action-btn">${step.btn}</button>
                </div>
            </div>`;

        container.querySelector('.leerpad-action-btn')
            ?.addEventListener('click', () => step.action());
    },

    // Navigate to the recommended next step (called from session-complete screens)
    navigateNextStep() {
        this.getNextStep().action();
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
        const CEFR = { 2: 'A1', 3: 'A2', 4: 'B1', 5: 'B2', 6: 'C1', 7: 'C2 / Alles' };
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
        const nextLevel = userLevel < 7 ? userLevel + 1 : null;
        const CEFR_NEXT = { 3: 'A2', 4: 'B1', 5: 'B2', 6: 'C1', 7: 'C2 / Alles' };
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
        } else if ((pct < 80 || userLevel >= 7) && existingAlert) {
            existingAlert.remove();
        }
    }
};

// Initialize when DOM is ready
// Herstel eerst voortgang uit cache-backup als localStorage leeg is
document.addEventListener('DOMContentLoaded', async () => {
    await Progress._restoreFromCacheIfNeeded();   // herstel uit IDB/Cache als localStorage leeg
    Progress.requestPersistentStorage();           // vraag persistente opslag aan (Chrome/Android)
    Progress.initInstallPrompt();                 // luister naar Android install-event (beforeinstallprompt)
    App.init();
    Progress.showInstallPromptIfNeeded();          // toon iOS-installatietip indien nodig
});

// Make App globally available
window.App = App;
