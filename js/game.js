// Game Module - Quiz, Memory, and Daily Challenge
// Uses AppData from data.js

const GameModule = {

    // ===== QUESTION GENERATION =====

    _allVocabWords: null,

    getAllVocabWords() {
        if (!this._allVocabWords) {
            this._allVocabWords = [];
            Object.values(AppData.vocabulary).forEach(cat => {
                cat.words.forEach(w => this._allVocabWords.push(w));
            });
        }
        return this._allVocabWords;
    },

    shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    generateVocabQuestion() {
        const words = this.getAllVocabWords();
        const word = words[Math.floor(Math.random() * words.length)];
        const itToNl = Math.random() > 0.5;

        const otherWords = words.filter(w => w !== word);
        const wrongWords = this.shuffleArray(otherWords).slice(0, 3);

        if (itToNl) {
            const options = this.shuffleArray([word.nl, ...wrongWords.map(w => w.nl)]);
            return {
                type: 'vocab',
                question: `Wat betekent "${word.it}"?`,
                options,
                correct: options.indexOf(word.nl),
                explanation: word.note ? `${word.it} = ${word.nl}. ${word.note}` : `${word.it} = ${word.nl}`
            };
        } else {
            const options = this.shuffleArray([word.it, ...wrongWords.map(w => w.it)]);
            return {
                type: 'vocab',
                question: `Hoe zeg je "${word.nl}" in het Italiaans?`,
                options,
                correct: options.indexOf(word.it),
                explanation: word.note ? `${word.nl} = ${word.it}. ${word.note}` : `${word.nl} = ${word.it}`
            };
        }
    },

    generateGrammarQuestion() {
        const topics = AppData.grammar;
        const topic = topics[Math.floor(Math.random() * topics.length)];
        const exercise = topic.exercises[Math.floor(Math.random() * topic.exercises.length)];
        return {
            type: 'grammar',
            question: exercise.question,
            options: exercise.options,
            correct: exercise.correct,
            explanation: exercise.explanation
        };
    },

    generateConjugationQuestion() {
        const irregular = AppData.verbs.irregular;
        const withPresente = irregular.filter(v => v.presente);
        const verb = withPresente[Math.floor(Math.random() * withPresente.length)];

        const persons = ['io', 'tu', 'lui', 'noi', 'voi', 'loro'];
        const person = persons[Math.floor(Math.random() * persons.length)];
        const correctForm = verb.presente[person];

        // Collect wrong options: other persons of this verb + same person of another verb
        const otherForms = persons
            .filter(p => p !== person)
            .map(p => verb.presente[p])
            .filter(f => f !== correctForm);

        const otherVerb = withPresente.find(v => v !== verb && v.presente);
        if (otherVerb) {
            otherForms.push(otherVerb.presente[person]);
        }

        const wrongAnswers = this.shuffleArray(otherForms).slice(0, 3);
        // Fill if not enough wrong answers
        const fillers = ['parla', 'sono', 'ha', 'fai', 'andiamo', 'vengo'];
        let wi = 0;
        while (wrongAnswers.length < 3) {
            const f = fillers[wi++];
            if (f !== correctForm && !wrongAnswers.includes(f)) wrongAnswers.push(f);
        }

        const options = this.shuffleArray([correctForm, ...wrongAnswers]);
        return {
            type: 'conjugation',
            question: `Vervoeg "${verb.infinitive}" (${verb.meaning}) voor "${person}":`,
            options,
            correct: options.indexOf(correctForm),
            explanation: `${person} ${verb.infinitive} → ${correctForm}`
        };
    },

    getRandomQuestion() {
        const roll = Math.random();
        if (roll < 0.50) return this.generateVocabQuestion();
        if (roll < 0.75) return this.generateGrammarQuestion();
        return this.generateConjugationQuestion();
    },

    // ===== LEVEL SYSTEM =====

    levels: [
        { level: 1, title: 'Beginner',   xp: 0 },
        { level: 2, title: 'Leerling',   xp: 500 },
        { level: 3, title: 'Gevorderd',  xp: 1500 },
        { level: 4, title: 'Expert',     xp: 3000 },
        { level: 5, title: 'Maestro',    xp: 6000 }
    ],

    getLevel(totalXP) {
        let current = this.levels[0];
        let next = this.levels[1];
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (totalXP >= this.levels[i].xp) {
                current = this.levels[i];
                next = this.levels[i + 1] || { xp: current.xp + 1000, level: current.level + 1, title: 'Grandmaster' };
                break;
            }
        }
        const range = next.xp - current.xp;
        const progress = Math.min(100, Math.round(((totalXP - current.xp) / range) * 100));
        return { level: current.level, title: current.title, progress, nextXP: next.xp };
    },

    // ===== UI HELPERS =====

    showGameSection(sectionId) {
        document.querySelectorAll('#game-module .game-section').forEach(s => {
            s.style.display = 'none';
        });
        const section = document.getElementById(sectionId);
        if (section) section.style.display = 'block';
    },

    showMenu() {
        this.showGameSection('game-menu');
        this.updateMenuInfo();
    },

    updateMenuInfo() {
        const highScore = localStorage.getItem('quizHighScore') || '0';
        const el = document.getElementById('game-quiz-highscore');
        if (el) el.textContent = `Highscore: ${highScore} pts`;

        const dailyStatus = document.getElementById('game-daily-status');
        if (dailyStatus) {
            if (this.daily.isCompletedToday()) {
                dailyStatus.innerHTML = '<span class="status-badge completed">✅ Vandaag voltooid</span>';
            } else {
                dailyStatus.innerHTML = '<span class="status-badge pending">⏳ Nog te doen vandaag</span>';
            }
        }

        const streak = localStorage.getItem('dailyStreak') || '0';
        const streakEl = document.getElementById('game-daily-streak');
        if (streakEl) streakEl.textContent = `🔥 ${streak} dagen streak`;

        const totalXP = parseInt(localStorage.getItem('quizTotalXP') || '0');
        const levelInfo = this.getLevel(totalXP);
        const levelEl = document.getElementById('game-level-display');
        if (levelEl) levelEl.textContent = `Level ${levelInfo.level}: ${levelInfo.title} — ${totalXP} XP`;
    },

    // ===== QUIZ GAME =====

    quiz: {
        totalQuestions: 10,
        timePerQuestion: 15,
        questions: [],
        currentIndex: 0,
        score: 0,
        streak: 0,
        maxStreak: 0,
        timerInterval: null,
        timeLeft: 0,

        start() {
            this.questions = [];
            this.currentIndex = 0;
            this.score = 0;
            this.streak = 0;
            this.maxStreak = 0;

            for (let i = 0; i < this.totalQuestions; i++) {
                this.questions.push(GameModule.getRandomQuestion());
            }

            GameModule.showGameSection('quiz-game');
            this.loadQuestion();
        },

        loadQuestion() {
            if (this.currentIndex >= this.totalQuestions) {
                this.end();
                return;
            }

            const q = this.questions[this.currentIndex];

            document.getElementById('quiz-progress-text').textContent =
                `Vraag ${this.currentIndex + 1} van ${this.totalQuestions}`;
            document.getElementById('quiz-score-display').textContent = `${this.score} pts`;

            const streakEl = document.getElementById('quiz-streak-display');
            if (this.streak >= 2) {
                streakEl.textContent = `🔥 ${this.streak}`;
                streakEl.style.display = 'inline-block';
            } else {
                streakEl.style.display = 'none';
            }

            document.getElementById('quiz-question-text').textContent = q.question;

            const optionsEl = document.getElementById('quiz-options');
            optionsEl.innerHTML = '';
            q.options.forEach((option, i) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option-btn';
                btn.textContent = option;
                btn.addEventListener('click', () => this.checkAnswer(i, btn));
                optionsEl.appendChild(btn);
            });

            document.getElementById('quiz-feedback').style.display = 'none';
            this.startTimer();
        },

        startTimer() {
            clearInterval(this.timerInterval);
            this.timeLeft = this.timePerQuestion;

            const fill = document.getElementById('quiz-timer-fill');
            const text = document.getElementById('quiz-timer-text');

            fill.style.transition = 'none';
            fill.style.width = '100%';
            fill.className = 'timer-fill';
            fill.offsetHeight; // force reflow

            const tick = () => {
                const pct = (this.timeLeft / this.timePerQuestion) * 100;
                fill.style.transition = 'width 1s linear';
                fill.style.width = `${pct}%`;
                text.textContent = this.timeLeft;

                if (this.timeLeft <= 5) fill.classList.add('urgent');

                if (this.timeLeft <= 0) {
                    clearInterval(this.timerInterval);
                    this.timeOut();
                    return;
                }
                this.timeLeft--;
            };

            tick();
            this.timerInterval = setInterval(tick, 1000);
        },

        timeOut() {
            const q = this.questions[this.currentIndex];
            this.streak = 0;

            document.querySelectorAll('.quiz-option-btn').forEach((btn, i) => {
                btn.disabled = true;
                if (i === q.correct) btn.classList.add('correct');
            });

            this.showFeedback(false, `Tijd is op! Het juiste antwoord was: ${q.options[q.correct]}. ${q.explanation || ''}`, 0);
        },

        checkAnswer(selectedIndex, btn) {
            clearInterval(this.timerInterval);

            const q = this.questions[this.currentIndex];
            const isCorrect = selectedIndex === q.correct;

            document.querySelectorAll('.quiz-option-btn').forEach((b, i) => {
                b.disabled = true;
                if (i === q.correct) b.classList.add('correct');
            });

            if (isCorrect) {
                this.streak++;
                this.maxStreak = Math.max(this.maxStreak, this.streak);

                let points = 100;
                if (this.timeLeft >= 10) points += 50;
                else if (this.timeLeft >= 5) points += 30;

                let multiplier = 1;
                if (this.streak >= 5) multiplier = 2;
                else if (this.streak >= 3) multiplier = 1.5;

                const earned = Math.round(points * multiplier);
                this.score += earned;

                let bonusMsg = '';
                if (this.streak >= 3) bonusMsg = ` (${multiplier}× streak bonus!)`;

                this.showFeedback(true, q.explanation, earned, bonusMsg);
            } else {
                btn.classList.add('wrong');
                this.streak = 0;
                this.showFeedback(false, q.explanation, 0);
            }
        },

        showFeedback(correct, explanation, pointsEarned, bonusMsg = '') {
            const feedbackEl = document.getElementById('quiz-feedback');
            feedbackEl.style.display = 'block';
            feedbackEl.className = `quiz-feedback ${correct ? 'correct' : 'wrong'}`;

            let html = `<div class="feedback-inner">`;
            html += `<span class="feedback-icon-lg">${correct ? '✅' : '❌'}</span>`;
            if (correct) {
                html += `<strong class="points-earned">+${pointsEarned} punten${bonusMsg}</strong>`;
            } else {
                html += `<strong>Helaas!</strong>`;
            }
            if (explanation) {
                html += `<p class="feedback-explanation">${explanation}</p>`;
            }
            html += `<button class="btn btn-primary feedback-next-btn">Volgende →</button>`;
            html += `</div>`;

            feedbackEl.innerHTML = html;

            feedbackEl.querySelector('.feedback-next-btn').addEventListener('click', () => {
                this.currentIndex++;
                this.loadQuestion();
            });
        },

        end() {
            clearInterval(this.timerInterval);

            const prevHigh = parseInt(localStorage.getItem('quizHighScore') || '0');
            const isNewHigh = this.score > prevHigh;
            if (isNewHigh) localStorage.setItem('quizHighScore', this.score);

            const totalXP = parseInt(localStorage.getItem('quizTotalXP') || '0') + this.score;
            localStorage.setItem('quizTotalXP', totalXP);

            const levelInfo = GameModule.getLevel(totalXP);

            GameModule.showGameSection('quiz-end');
            document.getElementById('quiz-end').innerHTML = `
                <div class="game-end-content">
                    <h2>Ronde afgerond! 🎊</h2>
                    ${isNewHigh && this.score > 0 ? '<p class="new-highscore">🏆 Nieuw persoonlijk record!</p>' : ''}
                    <div class="end-score">${this.score}</div>
                    <p class="end-score-label">punten</p>
                    <div class="end-stats">
                        <div class="end-stat">
                            <span class="end-stat-value">🔥 ${this.maxStreak}</span>
                            <span class="end-stat-label">Beste streak</span>
                        </div>
                        <div class="end-stat">
                            <span class="end-stat-value">${isNewHigh ? '🆕 ' + this.score : prevHigh}</span>
                            <span class="end-stat-label">Highscore</span>
                        </div>
                    </div>
                    <div class="level-section">
                        <p class="level-title">Level ${levelInfo.level}: ${levelInfo.title}</p>
                        <div class="level-bar-wrap">
                            <div class="level-bar">
                                <div class="level-fill" style="width: ${levelInfo.progress}%"></div>
                            </div>
                            <span class="level-bar-label">${totalXP} / ${levelInfo.nextXP} XP</span>
                        </div>
                    </div>
                    <div class="end-buttons">
                        <button class="btn btn-primary" id="quiz-restart-btn">Opnieuw spelen</button>
                        <button class="btn btn-secondary" id="quiz-to-menu-btn">Terug naar menu</button>
                    </div>
                </div>
            `;

            document.getElementById('quiz-restart-btn').addEventListener('click', () => {
                GameModule.quiz.start();
            });
            document.getElementById('quiz-to-menu-btn').addEventListener('click', () => {
                GameModule.showMenu();
            });
        }
    },

    // ===== MEMORY GAME =====

    memory: {
        pairs: [],
        selectedCard: null,
        mistakes: 0,
        startTime: null,
        matchedCount: 0,
        isChecking: false,
        _currentCategory: null,

        start(categoryKey) {
            const cat = AppData.vocabulary[categoryKey];
            const words = GameModule.shuffleArray([...cat.words]).slice(0, 8);
            this.pairs = words;
            this.selectedCard = null;
            this.mistakes = 0;
            this.matchedCount = 0;
            this.isChecking = false;
            this.startTime = Date.now();
            this._currentCategory = categoryKey;

            GameModule.showGameSection('memory-game');
            this.render();
        },

        render() {
            const itCards = GameModule.shuffleArray(
                this.pairs.map((w, i) => ({ word: w.it, pairIndex: i, lang: 'it' }))
            );
            const nlCards = GameModule.shuffleArray(
                this.pairs.map((w, i) => ({ word: w.nl, pairIndex: i, lang: 'nl' }))
            );

            const grid = document.getElementById('memory-grid');
            grid.innerHTML = '';

            const itCol = document.createElement('div');
            itCol.className = 'memory-column';
            const nlCol = document.createElement('div');
            nlCol.className = 'memory-column';

            itCards.forEach(card => {
                const el = this.createCard(card);
                itCol.appendChild(el);
            });

            nlCards.forEach(card => {
                const el = this.createCard(card);
                nlCol.appendChild(el);
            });

            grid.appendChild(itCol);
            grid.appendChild(nlCol);

            this.updateStats();
        },

        createCard(card) {
            const el = document.createElement('button');
            el.className = 'memory-card';
            el.textContent = card.word;
            el.dataset.pairIndex = card.pairIndex;
            el.dataset.lang = card.lang;
            el.addEventListener('click', () => this.handleClick(el));
            return el;
        },

        updateStats() {
            document.getElementById('memory-mistakes').textContent = this.mistakes;
            document.getElementById('memory-pairs').textContent =
                `${this.matchedCount}/${this.pairs.length}`;
        },

        handleClick(el) {
            if (this.isChecking) return;
            if (el.classList.contains('matched')) return;
            if (el.classList.contains('selected')) {
                el.classList.remove('selected');
                this.selectedCard = null;
                return;
            }

            el.classList.add('selected');

            if (!this.selectedCard) {
                this.selectedCard = el;
                return;
            }

            const first = this.selectedCard;
            const second = el;

            // Must be different languages to form a pair
            if (first.dataset.lang === second.dataset.lang) {
                first.classList.remove('selected');
                this.selectedCard = second;
                return;
            }

            this.isChecking = true;

            if (first.dataset.pairIndex === second.dataset.pairIndex) {
                // Correct match
                first.classList.remove('selected');
                first.classList.add('matched');
                second.classList.add('matched');
                this.selectedCard = null;
                this.matchedCount++;
                this.isChecking = false;
                this.updateStats();

                if (this.matchedCount === this.pairs.length) {
                    setTimeout(() => this.end(), 600);
                }
            } else {
                // Wrong match
                this.mistakes++;
                first.classList.add('wrong');
                second.classList.add('wrong');

                setTimeout(() => {
                    first.classList.remove('selected', 'wrong');
                    second.classList.remove('selected', 'wrong');
                    this.selectedCard = null;
                    this.isChecking = false;
                    this.updateStats();
                }, 800);
            }
        },

        end() {
            const elapsed = Math.round((Date.now() - this.startTime) / 1000);
            const score = Math.max(0, 1000 - (this.mistakes * 50) - (elapsed * 2));

            const key = `memoryHigh_${this._currentCategory}`;
            const prevHigh = parseInt(localStorage.getItem(key) || '0');
            const isNewHigh = score > prevHigh;
            if (isNewHigh) localStorage.setItem(key, score);

            const catName = AppData.vocabulary[this._currentCategory]?.name || '';

            GameModule.showGameSection('memory-end');
            document.getElementById('memory-end').innerHTML = `
                <div class="game-end-content">
                    <h2>Alle paren gevonden! 🎉</h2>
                    <p class="end-subtitle">Categorie: ${catName}</p>
                    <div class="end-score">${score}</div>
                    <p class="end-score-label">punten</p>
                    ${isNewHigh ? '<p class="new-highscore">🏆 Nieuw record voor deze categorie!</p>' : `<p class="prev-high">Vorig record: ${prevHigh} pts</p>`}
                    <div class="end-stats">
                        <div class="end-stat">
                            <span class="end-stat-value">${elapsed}s</span>
                            <span class="end-stat-label">Tijd</span>
                        </div>
                        <div class="end-stat">
                            <span class="end-stat-value">${this.mistakes}</span>
                            <span class="end-stat-label">Fouten</span>
                        </div>
                    </div>
                    <div class="end-buttons">
                        <button class="btn btn-primary" id="memory-restart-btn">Opnieuw</button>
                        <button class="btn btn-secondary" id="memory-to-cats-btn">Andere categorie</button>
                        <button class="btn btn-secondary" id="memory-to-menu-btn">Naar menu</button>
                    </div>
                </div>
            `;

            document.getElementById('memory-restart-btn').addEventListener('click', () => {
                GameModule.memory.start(GameModule.memory._currentCategory);
            });
            document.getElementById('memory-to-cats-btn').addEventListener('click', () => {
                GameModule.showGameSection('memory-category');
            });
            document.getElementById('memory-to-menu-btn').addEventListener('click', () => {
                GameModule.showMenu();
            });
        }
    },

    // ===== DAILY CHALLENGE =====

    daily: {
        questions: [],
        currentIndex: 0,
        correctCount: 0,

        getDateString() {
            const d = new Date();
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        },

        isCompletedToday() {
            return localStorage.getItem('dailyCompletedDate') === this.getDateString();
        },

        seededRandom(seed) {
            let s = seed >>> 0;
            return function () {
                s = Math.imul(1664525, s) + 1013904223 | 0;
                return (s >>> 0) / 4294967296;
            };
        },

        getQuestionsForToday() {
            const dateStr = this.getDateString();
            let seed = 0;
            for (let i = 0; i < dateStr.length; i++) {
                seed = (Math.imul(31, seed) + dateStr.charCodeAt(i)) | 0;
            }

            const origRandom = Math.random;
            const rng = this.seededRandom(seed);
            Math.random = rng;

            const questions = [];
            for (let i = 0; i < 5; i++) questions.push(GameModule.generateVocabQuestion());
            for (let i = 0; i < 3; i++) questions.push(GameModule.generateGrammarQuestion());
            for (let i = 0; i < 2; i++) questions.push(GameModule.generateConjugationQuestion());

            // Shuffle deterministically
            const rng2 = this.seededRandom(seed + 999);
            Math.random = rng2;
            const shuffled = GameModule.shuffleArray(questions);

            Math.random = origRandom;
            return shuffled;
        },

        start() {
            this.questions = this.getQuestionsForToday();
            this.currentIndex = 0;
            this.correctCount = 0;

            GameModule.showGameSection('daily-game');
            this.loadQuestion();
        },

        loadQuestion() {
            if (this.currentIndex >= this.questions.length) {
                this.end();
                return;
            }

            const q = this.questions[this.currentIndex];
            const total = this.questions.length;

            document.getElementById('daily-progress-text').textContent =
                `Vraag ${this.currentIndex + 1} van ${total}`;
            document.getElementById('daily-question-text').textContent = q.question;

            // Update progress dots
            const dotsEl = document.getElementById('daily-dots');
            dotsEl.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('span');
                dot.className = 'daily-dot';
                if (i < this.currentIndex) dot.classList.add('done');
                else if (i === this.currentIndex) dot.classList.add('active');
                dotsEl.appendChild(dot);
            }

            const optionsEl = document.getElementById('daily-options');
            optionsEl.innerHTML = '';
            q.options.forEach((option, i) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option-btn';
                btn.textContent = option;
                btn.addEventListener('click', () => this.checkAnswer(i, btn));
                optionsEl.appendChild(btn);
            });

            document.getElementById('daily-feedback').style.display = 'none';
        },

        checkAnswer(selectedIndex, btn) {
            const q = this.questions[this.currentIndex];
            const isCorrect = selectedIndex === q.correct;

            document.querySelectorAll('#daily-options .quiz-option-btn').forEach((b, i) => {
                b.disabled = true;
                if (i === q.correct) b.classList.add('correct');
            });

            if (isCorrect) {
                this.correctCount++;
            } else {
                btn.classList.add('wrong');
            }

            const isLast = this.currentIndex + 1 >= this.questions.length;
            const feedbackEl = document.getElementById('daily-feedback');
            feedbackEl.style.display = 'block';
            feedbackEl.className = `quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
            feedbackEl.innerHTML = `
                <div class="feedback-inner">
                    <span class="feedback-icon-lg">${isCorrect ? '✅' : '❌'}</span>
                    ${q.explanation ? `<p class="feedback-explanation">${q.explanation}</p>` : ''}
                    <button class="btn btn-primary feedback-next-btn">${isLast ? 'Bekijk resultaat' : 'Volgende →'}</button>
                </div>
            `;

            feedbackEl.querySelector('.feedback-next-btn').addEventListener('click', () => {
                this.currentIndex++;
                this.loadQuestion();
            });
        },

        updateStreak() {
            const today = this.getDateString();
            const d = new Date();
            d.setDate(d.getDate() - 1);
            const yesterday = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

            const lastCompleted = localStorage.getItem('dailyLastCompleted');
            let streak = parseInt(localStorage.getItem('dailyStreak') || '0');
            let bestStreak = parseInt(localStorage.getItem('dailyBestStreak') || '0');

            if (lastCompleted === yesterday) {
                streak++;
            } else if (lastCompleted !== today) {
                streak = 1;
            }

            bestStreak = Math.max(bestStreak, streak);
            localStorage.setItem('dailyCompletedDate', today);
            localStorage.setItem('dailyLastCompleted', today);
            localStorage.setItem('dailyStreak', streak);
            localStorage.setItem('dailyBestStreak', bestStreak);

            return { streak, bestStreak };
        },

        end() {
            const { streak, bestStreak } = this.updateStreak();
            const pct = Math.round((this.correctCount / this.questions.length) * 100);

            let message;
            if (pct === 100) message = '🎉 Perfetto! Alles goed!';
            else if (pct >= 80) message = '⭐ Ottimo! Goed gedaan!';
            else if (pct >= 60) message = '👍 Bene! Blijf oefenen!';
            else message = '💪 Bravo! Morgen beter!';

            GameModule.showGameSection('daily-end');
            document.getElementById('daily-end').innerHTML = `
                <div class="game-end-content">
                    <h2>Uitdaging voltooid!</h2>
                    <p class="daily-message">${message}</p>
                    <div class="end-score">${this.correctCount}/${this.questions.length}</div>
                    <p class="end-score-label">correct</p>
                    <div class="end-stats">
                        <div class="end-stat">
                            <span class="end-stat-value">🔥 ${streak}</span>
                            <span class="end-stat-label">Dagen streak</span>
                        </div>
                        <div class="end-stat">
                            <span class="end-stat-value">${bestStreak}</span>
                            <span class="end-stat-label">Beste streak</span>
                        </div>
                    </div>
                    <button class="btn btn-secondary" id="daily-to-menu-btn">Terug naar menu</button>
                </div>
            `;

            document.getElementById('daily-to-menu-btn').addEventListener('click', () => {
                GameModule.showMenu();
            });
        }
    },

    // ===== INITIALIZATION =====

    init() {
        // Quiz
        document.getElementById('start-quiz-btn')?.addEventListener('click', () => {
            this.quiz.start();
        });

        // Daily challenge
        document.getElementById('start-daily-btn')?.addEventListener('click', () => {
            if (this.daily.isCompletedToday()) {
                const btn = document.getElementById('start-daily-btn');
                const orig = btn.textContent;
                btn.textContent = '✅ Kom morgen terug!';
                setTimeout(() => { btn.textContent = orig; }, 2000);
                return;
            }
            this.daily.start();
        });

        // Memory - show category selector
        document.getElementById('start-memory-btn')?.addEventListener('click', () => {
            this.buildMemoryCategories();
            this.showGameSection('memory-category');
        });

        // Memory category selection
        document.getElementById('memory-category-list')?.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-category]');
            if (btn) {
                this.memory.start(btn.dataset.category);
            }
        });

        // Back buttons to game menu
        document.querySelectorAll('.game-back-btn').forEach(btn => {
            btn.addEventListener('click', () => this.showMenu());
        });

        // Show game menu
        this.showMenu();
    },

    buildMemoryCategories() {
        const listEl = document.getElementById('memory-category-list');
        if (!listEl || listEl.children.length > 0) return; // already built

        Object.entries(AppData.vocabulary).forEach(([key, cat]) => {
            const btn = document.createElement('button');
            btn.className = 'category-btn memory-cat-btn';
            btn.dataset.category = key;
            btn.innerHTML = `
                <span class="cat-icon">${cat.icon}</span>
                <span class="cat-name">${cat.name}</span>
                <span class="cat-count">${Math.min(cat.words.length, 8)} paren</span>
            `;
            listEl.appendChild(btn);
        });
    }
};
