// Listening Module - Hear Italian, identify the meaning

const Listening = {
    currentCategory: null,
    currentWords: [],
    currentIndex: 0,
    score: 0,
    hardMode: false,
    shuffledOptions: [],
    sessionSize: 10,

    // Initialize the listening module
    init() {
        this.renderCategories();
        this.setupEventListeners();
    },

    // Render category buttons
    renderCategories() {
        const container = document.getElementById('listening-categories-grid');
        if (!container) return;

        container.innerHTML = '';

        const customCategories = (typeof CustomWords !== 'undefined') ? CustomWords.getAll() : {};
        const allCategories = { ...AppData.vocabulary, ...customCategories };

        for (const [key, category] of Object.entries(allCategories)) {
            if (!category.words || category.words.length === 0) continue;
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.dataset.category = key;
            btn.innerHTML = `
                <span class="icon">${category.icon}</span>
                <span class="name">${category.name}</span>
                <span class="count">${category.words.length} woord${category.words.length !== 1 ? 'en' : ''}</span>
            `;
            container.appendChild(btn);
        }
    },

    // Setup event listeners
    setupEventListeners() {
        // Category selection
        document.getElementById('listening-categories-grid')?.addEventListener('click', (e) => {
            const btn = e.target.closest('.category-btn');
            if (btn) this.startCategory(btn.dataset.category);
        });

        // Replay button
        document.getElementById('listening-replay-btn')?.addEventListener('click', () => {
            this.speakCurrentWord();
        });

        // Hard mode toggle
        document.getElementById('listening-hard-mode')?.addEventListener('change', (e) => {
            this.hardMode = e.target.checked;
        });

        // Text input submit
        document.getElementById('listening-submit-btn')?.addEventListener('click', () => {
            this.checkTextAnswer();
        });

        // Enter key for text input
        document.getElementById('listening-answer-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkTextAnswer();
        });

        // Next button in feedback
        document.getElementById('listening-feedback')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-next')) this.nextItem();
        });

        // Back button in exercise
        document.getElementById('listening-back-btn')?.addEventListener('click', () => {
            this.backToCategories();
        });

        // End screen buttons
        document.getElementById('listening-retry-btn')?.addEventListener('click', () => {
            this.startCategory(this.currentCategory);
        });

        document.getElementById('listening-end-back-btn')?.addEventListener('click', () => {
            this.backToCategories();
        });
    },

    // Start a category session
    startCategory(categoryKey) {
        this.currentCategory = categoryKey;
        const customCategories = (typeof CustomWords !== 'undefined') ? CustomWords.getAll() : {};
        const category = AppData.vocabulary[categoryKey] || customCategories[categoryKey];
        if (!category) return;

        // Pick up to sessionSize words, shuffled
        const shuffled = this.shuffleArray([...category.words]);
        this.currentWords = shuffled.slice(0, this.sessionSize);
        this.currentIndex = 0;
        this.score = 0;

        // Show exercise, hide categories
        document.getElementById('listening-category-screen').style.display = 'none';
        document.getElementById('listening-exercise-screen').style.display = 'block';
        document.getElementById('listening-end-screen').style.display = 'none';

        // Update header
        document.getElementById('listening-category-name').textContent =
            category.icon + ' ' + category.name;
        document.getElementById('listening-total').textContent = this.currentWords.length;

        this.showCurrentItem();
    },

    // Show the current item
    showCurrentItem() {
        const word = this.currentWords[this.currentIndex];
        if (!word) return;

        // Update progress counter
        document.getElementById('listening-current').textContent = this.currentIndex + 1;

        // Show level badge on play button area
        const cefr = word.level ? ({ 1:'A1',2:'A1',3:'A2',4:'B1',5:'B2' })[word.level] : '';
        const instrEl = document.querySelector('.listening-instruction');
        if (instrEl && cefr) instrEl.innerHTML = `Luister en kies de juiste vertaling <span class="word-level-badge level-${cefr}">${cefr}</span>`;

        // Hide feedback
        const feedback = document.getElementById('listening-feedback');
        feedback.style.display = 'none';
        feedback.className = 'feedback-panel';

        // Show correct answer mode
        if (this.hardMode) {
            document.getElementById('listening-options-area').style.display = 'none';
            document.getElementById('listening-input-area').style.display = 'flex';
            const input = document.getElementById('listening-answer-input');
            input.value = '';
            input.disabled = false;
            document.getElementById('listening-submit-btn').disabled = false;
            input.focus();
        } else {
            document.getElementById('listening-options-area').style.display = 'grid';
            document.getElementById('listening-input-area').style.display = 'none';
            this.generateOptions(word);
        }

        // Auto-play after a short delay (let UI settle)
        setTimeout(() => this.speakCurrentWord(), 400);
    },

    // Speak the current Italian word
    speakCurrentWord() {
        const word = this.currentWords[this.currentIndex];
        if (!word || !window.speechSynthesis) return;

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(word.it);
        utterance.lang = 'it-IT';
        utterance.rate = 0.8;

        const voices = speechSynthesis.getVoices();
        const italianVoice = voices.find(v => v.lang.startsWith('it'));
        if (italianVoice) utterance.voice = italianVoice;

        const replayBtn = document.getElementById('listening-replay-btn');
        if (replayBtn) {
            replayBtn.classList.add('playing');
            replayBtn.textContent = '🔊 Spreekt...';
        }

        utterance.onend = () => {
            if (replayBtn) {
                replayBtn.classList.remove('playing');
                replayBtn.textContent = '🔊 Herspeel';
            }
        };

        speechSynthesis.speak(utterance);
    },

    // Generate multiple choice options (4 Dutch translations)
    generateOptions(correctWord) {
        const container = document.getElementById('listening-options');
        if (!container) return;

        // Gather wrong answers from other words
        const otherWords = this.currentWords.filter(w => w.it !== correctWord.it);
        let wrongAnswers = this.shuffleArray(otherWords).slice(0, 3).map(w => w.nl);

        // If not enough, pull from other categories
        if (wrongAnswers.length < 3) {
            const customCategories = (typeof CustomWords !== 'undefined') ? CustomWords.getAll() : {};
            const allCats = { ...AppData.vocabulary, ...customCategories };
            for (const [key, cat] of Object.entries(allCats)) {
                if (key !== this.currentCategory && wrongAnswers.length < 3) {
                    const extra = cat.words
                        .filter(w => w.nl !== correctWord.nl && !wrongAnswers.includes(w.nl))
                        .slice(0, 3 - wrongAnswers.length);
                    wrongAnswers.push(...extra.map(w => w.nl));
                }
            }
        }

        this.shuffledOptions = this.shuffleArray([correctWord.nl, ...wrongAnswers.slice(0, 3)]);

        container.innerHTML = '';
        this.shuffledOptions.forEach((option, i) => {
            const btn = document.createElement('button');
            btn.className = 'listening-option';
            btn.dataset.index = i;
            btn.textContent = option;
            btn.addEventListener('click', () => this.checkChoice(i));
            container.appendChild(btn);
        });
    },

    // Check a multiple-choice answer
    checkChoice(selectedIndex) {
        const word = this.currentWords[this.currentIndex];
        const selected = this.shuffledOptions[selectedIndex];

        // Normalise for comparison (accept any "/" alternative)
        const normalise = s => s.toLowerCase().trim();
        const alternatives = word.nl.split('/').map(s => normalise(s));
        const correct = alternatives.includes(normalise(selected));

        // Disable all options, highlight correct/wrong
        const options = document.querySelectorAll('.listening-option');
        options.forEach(btn => {
            btn.disabled = true;
            const btnText = btn.textContent;
            const btnAlts = word.nl.split('/').map(s => normalise(s));
            if (btnAlts.includes(normalise(btnText))) {
                btn.classList.add('correct');
            } else if (parseInt(btn.dataset.index) === selectedIndex && !correct) {
                btn.classList.add('wrong');
            }
        });

        this.showFeedback(correct, word);
        if (correct) this.score++;
    },

    // Check a typed answer (dictee mode - user types Dutch translation)
    checkTextAnswer() {
        const word = this.currentWords[this.currentIndex];
        const input = document.getElementById('listening-answer-input');
        const userAnswer = input.value.trim();
        if (!userAnswer) return;

        const normalised = userAnswer.toLowerCase().trim();
        const alternatives = word.nl.split('/').map(s => s.trim().toLowerCase());
        const correct = alternatives.includes(normalised) || normalised === word.nl.toLowerCase().trim();

        input.disabled = true;
        document.getElementById('listening-submit-btn').disabled = true;

        this.showFeedback(correct, word);
        if (correct) this.score++;
    },

    // Show feedback panel
    showFeedback(correct, word) {
        const panel = document.getElementById('listening-feedback');
        panel.className = 'feedback-panel ' + (correct ? 'success' : 'error');

        const icon = correct ? '✅' : '❌';
        const title = correct ? 'Goed!' : 'Helaas';
        const noteHtml = word.note ? `<p class="feedback-note">💡 ${word.note}</p>` : '';
        const sentenceHtml = word.sentence
            ? `<div class="example-sentence">💬 <em>${word.sentence.it}</em> → ${word.sentence.nl}</div>`
            : '';
        const cefr = word.level ? ({ 1:'A1',2:'A1',3:'A2',4:'B1',5:'B2' })[word.level] : '';
        const levelHtml = cefr ? `<span class="word-level-badge level-${cefr}">${cefr}</span>` : '';

        panel.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">${icon}</span>
                <span class="feedback-title">${title}</span>
                ${levelHtml}
            </div>
            <div class="feedback-content">
                <p><strong>${word.it}</strong> = ${word.nl}</p>
                ${noteHtml}
                ${sentenceHtml}
            </div>
            <button class="btn btn-primary btn-next">
                ${this.currentIndex + 1 < this.currentWords.length ? 'Volgende →' : 'Resultaat bekijken'}
            </button>
        `;
        panel.style.display = 'block';
    },

    // Move to the next item or end screen
    nextItem() {
        speechSynthesis.cancel();
        this.currentIndex++;
        if (this.currentIndex < this.currentWords.length) {
            this.showCurrentItem();
        } else {
            this.showSessionComplete();
        }
    },

    // Show session complete screen
    showSessionComplete() {
        document.getElementById('listening-exercise-screen').style.display = 'none';
        document.getElementById('listening-end-screen').style.display = 'block';

        const total = this.currentWords.length;
        const pct = Math.round((this.score / total) * 100);

        document.getElementById('listening-end-score').textContent = `${this.score} / ${total}`;
        document.getElementById('listening-end-pct').textContent = `${pct}%`;

        // XP reward
        const xp = this.score * 5;
        Progress.addXP(xp);
        document.getElementById('listening-end-xp').textContent = `+${xp} XP`;

        // Message based on score
        let message = '';
        if (pct === 100) message = '🏆 Perfect! Uitstekend luistervermogen!';
        else if (pct >= 80) message = '🌟 Geweldig gedaan!';
        else if (pct >= 60) message = '👍 Goed bezig, blijf oefenen!';
        else message = '💪 Blijf oefenen, je wordt beter!';
        document.getElementById('listening-end-message').textContent = message;
    },

    // Go back to category overview
    backToCategories() {
        speechSynthesis.cancel();
        this.currentCategory = null;
        this.currentWords = [];
        this.currentIndex = 0;
        this.score = 0;

        document.getElementById('listening-category-screen').style.display = 'block';
        document.getElementById('listening-exercise-screen').style.display = 'none';
        document.getElementById('listening-end-screen').style.display = 'none';
    },

    // Shuffle array (Fisher-Yates)
    shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
};

window.Listening = Listening;
