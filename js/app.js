// Main Application - Navigation and initialization

const App = {
    currentModule: 'home',

    // Initialize the application
    init() {
        // Initialize progress first
        Progress.init();

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
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Make App globally available
window.App = App;
