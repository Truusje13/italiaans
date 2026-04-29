// Vocabulary Module - Flashcards and exercises

// Map numeric level (1-5) to CEFR
const LEVEL_MAP = { 1: 'A1', 2: 'A1', 3: 'A2', 4: 'B1', 5: 'B2', 6: 'C1', 7: 'C2' };

// Grammar topics related to each vocabulary category
const VOCAB_GRAMMAR_LINKS = {
    greetings:  ['pronouns-subject'],
    food:       ['articles-definite', 'articles-indefinite'],
    family:     ['possessives', 'adjectives'],
    colors:     ['adjectives'],
    travel:     ['prepositions'],
    days:       [],
    common:     ['questions', 'negation'],
    body:       ['articles-definite', 'possessives'],
    house:      ['prepositions', 'articles-definite'],
    weather:    ['adjectives'],
    work:       ['articles-definite'],
    sport:      ['reflexive'],
    nature:     ['articles-definite'],
    health:     ['reflexive'],
    shopping:   ['questions', 'comparatives'],
    emotions:   ['reflexive', 'adjectives']
};

const Vocabulary = {
    currentCategory: null,
    currentWords: [],
    currentIndex: 0,
    hardMode: false,
    shuffledChoices: [],
    sessionCorrect: 0,   // correct in huidige sessie

    // Initialize the vocabulary module
    init() {
        this.renderCategories();
        // Sla de originele oefening-HTML op zodat we hem kunnen herstellen
        // na showSessionComplete() (die innerHTML vervangt)
        const exerciseEl = document.getElementById('vocab-exercise');
        if (exerciseEl) this._origExerciseHTML = exerciseEl.innerHTML;
        this.setupEventListeners();
    },

    // Herverbind alleen de listeners die BINNEN #vocab-exercise zitten
    _rebindExerciseListeners() {
        document.getElementById('vocab-speak-btn')?.addEventListener('click', () => {
            this.speakCurrentWord();
        });
        document.getElementById('vocab-submit-btn')?.addEventListener('click', () => {
            this.checkTextAnswer();
        });
        document.getElementById('vocab-answer-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkTextAnswer();
        });
        document.getElementById('vocab-feedback')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-primary')) this.nextWord();
        });
    },

    // Render category buttons
    renderCategories() {
        const container = document.getElementById('vocab-categories');
        if (!container) return;

        container.innerHTML = '';

        // Load progress once for all learned-word lookups
        const progressData = Progress.load();
        const learnedSet = new Set(progressData.vocabulary.learned || []);
        const userLevel = Progress.getUserLevel();
        const cefrLabel = LEVEL_MAP[userLevel] || 'A1';

        // Level context header (spans full grid width via CSS)
        const levelHeader = document.createElement('div');
        levelHeader.className = 'cat-level-header';
        levelHeader.innerHTML = `Jouw niveau: <span class="level-badge level-${cefrLabel}">${cefrLabel}</span>`;
        container.appendChild(levelHeader);

        const customCategories = (typeof CustomWords !== 'undefined') ? CustomWords.getAll() : {};
        const allCategories = { ...AppData.vocabulary, ...customCategories };

        for (const [key, category] of Object.entries(allCategories)) {
            const isCustom = !!category.custom;

            // Level range label for this category
            const levels = category.words.map(w => w.level).filter(Boolean);
            const minLvl = levels.length ? LEVEL_MAP[Math.min(...levels)] || '' : '';
            const maxLvl = levels.length ? LEVEL_MAP[Math.max(...levels)] || '' : '';
            const levelLabel = minLvl === maxLvl ? minLvl : `${minLvl}–${maxLvl}`;

            // SRS due count
            const dueCount = !isCustom ? Progress.getCategoryDueCount(key) : 0;

            // Available words at current user level
            const availableCount = !isCustom && userLevel < 7
                ? category.words.filter(w => !w.level || w.level <= userLevel).length
                : category.words.length;

            // Learned words count (unique words seen/answered, filtered to available level)
            const learnedCount = category.words.reduce((count, w, idx) => {
                const isAvailable = isCustom || (!w.level || w.level <= userLevel);
                return count + (isAvailable && learnedSet.has(`${key}_${idx}`) ? 1 : 0);
            }, 0);
            const learnedPct = availableCount > 0 ? Math.round(learnedCount / availableCount * 100) : 0;
            const isComplete = learnedPct >= 100;

            const btn = document.createElement('button');
            btn.className = 'category-btn' + (isCustom ? ' category-btn-custom' : '');
            btn.dataset.category = key;
            btn.innerHTML = `
                <span class="icon">${category.icon}</span>
                <span class="name">${category.name}${isCustom ? ' <span class="custom-badge">Eigen</span>' : ''}</span>
                <div class="cat-progress-bar-wrap">
                    <div class="cat-progress-bar${isComplete ? ' complete' : ''}" style="width:${learnedPct}%"></div>
                </div>
                <span class="cat-learned-count">${learnedCount}/${availableCount} geleerd</span>
                ${levelLabel ? `<span class="level-badge level-${minLvl.replace(/[^A-Z0-9]/g,'')}">${levelLabel}</span>` : ''}
                ${dueCount > 0 ? `<span class="srs-due-badge">🔁 ${dueCount}</span>` : ''}
            `;
            container.appendChild(btn);
        }

        // Add "manage custom words" button at the bottom
        const manageBtn = document.createElement('button');
        manageBtn.id = 'btn-manage-custom-words';
        manageBtn.className = 'btn-manage-custom';
        manageBtn.innerHTML = '➕ Eigen woorden beheren';
        container.appendChild(manageBtn);
    },

    // Setup event listeners
    setupEventListeners() {
        // Category selection
        document.getElementById('vocab-categories')?.addEventListener('click', (e) => {
            const btn = e.target.closest('.category-btn');
            if (btn) {
                this.startCategory(btn.dataset.category);
            }
        });

        // Speak button
        document.getElementById('vocab-speak-btn')?.addEventListener('click', () => {
            this.speakCurrentWord();
        });

        // Hard mode toggle
        document.getElementById('vocab-hard-mode')?.addEventListener('change', (e) => {
            this.hardMode = e.target.checked;
            this.updateAnswerMode();
        });

        // Text input submit
        document.getElementById('vocab-submit-btn')?.addEventListener('click', () => {
            this.checkTextAnswer();
        });

        // Enter key for text input
        document.getElementById('vocab-answer-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkTextAnswer();
            }
        });

        // Next button in feedback
        document.getElementById('vocab-feedback')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-primary')) {
                this.nextWord();
            }
        });
    },

    // Start a category
    startCategory(categoryKey) {
        this.currentCategory = categoryKey;
        const customCategories = (typeof CustomWords !== 'undefined') ? CustomWords.getAll() : {};
        const category = AppData.vocabulary[categoryKey] || customCategories[categoryKey];

        if (!category) return;

        // Reset sessie-teller
        this.sessionCorrect = 0;

        // Herstel de oefening-HTML als showSessionComplete() hem heeft vervangen
        if (!document.getElementById('vocab-italian') && this._origExerciseHTML) {
            const exerciseEl = document.getElementById('vocab-exercise');
            if (exerciseEl) {
                exerciseEl.innerHTML = this._origExerciseHTML;
                this._rebindExerciseListeners();
            }
        }

        // Filter words to current user level
        const userLevel = Progress.getUserLevel();
        const levelWords = userLevel < 7
            ? category.words.filter(w => !w.level || w.level <= userLevel)
            : category.words;

        // Prioritise SRS due words, then fill up to 10 with others
        const { due, other } = Progress.getDueWords(categoryKey, levelWords);
        const shuffledDue = this.shuffleArray(due);
        const shuffledOther = this.shuffleArray(other);
        const combined = [...shuffledDue, ...shuffledOther];
        this.currentWords = combined.slice(0, Math.max(10, shuffledDue.length));
        this.currentIndex = 0;

        // Show exercise area, hide category selector
        document.querySelector('.category-selector').style.display = 'none';
        document.getElementById('vocab-exercise').style.display = 'block';

        // Update progress display
        document.getElementById('vocab-total').textContent = this.currentWords.length;

        this.showCurrentWord();
    },

    // Show the current word
    showCurrentWord() {
        const word = this.currentWords[this.currentIndex];
        if (!word) return;

        // Update progress
        document.getElementById('vocab-current').textContent = this.currentIndex + 1;

        // Show Italian word with level badge
        const italianEl = document.getElementById('vocab-italian');
        const cefr = word.level ? LEVEL_MAP[word.level] : '';
        italianEl.innerHTML = `${word.it}${cefr ? ` <span class="word-level-badge level-${cefr.replace(/[^A-Z0-9]/g,'')}">${cefr}</span>` : ''}`;

        // Hide feedback
        document.getElementById('vocab-feedback').style.display = 'none';

        // Update answer mode
        this.updateAnswerMode();

        // Generate choices if in multiple choice mode
        if (!this.hardMode) {
            this.generateChoices(word);
        } else {
            document.getElementById('vocab-answer-input').value = '';
            document.getElementById('vocab-answer-input').focus();
        }
    },

    // Update answer mode (multiple choice vs text input)
    updateAnswerMode() {
        const multipleChoice = document.getElementById('vocab-choices');
        const textInput = document.getElementById('vocab-text-input');
        const exerciseEl = document.getElementById('vocab-exercise');

        if (this.hardMode) {
            multipleChoice.style.display = 'none';
            textInput.style.display = 'flex';
            exerciseEl?.classList.add('text-mode');
        } else {
            multipleChoice.style.display = 'grid';
            textInput.style.display = 'none';
            exerciseEl?.classList.remove('text-mode');
        }
    },

    // Generate multiple choice options
    generateChoices(correctWord) {
        const container = document.getElementById('vocab-choices');
        if (!container) return;

        // Get wrong answers from other words in this category
        const otherWords = this.currentWords.filter(w => w.it !== correctWord.it);
        const wrongAnswers = this.shuffleArray(otherWords)
            .slice(0, 3)
            .map(w => w.nl);

        // If we don't have enough wrong answers, get from other categories
        if (wrongAnswers.length < 3) {
            const customCategories = (typeof CustomWords !== 'undefined') ? CustomWords.getAll() : {};
            const allCategories = { ...AppData.vocabulary, ...customCategories };
            for (const [key, cat] of Object.entries(allCategories)) {
                if (key !== this.currentCategory && wrongAnswers.length < 3) {
                    const additionalWords = cat.words
                        .filter(w => w.nl !== correctWord.nl && !wrongAnswers.includes(w.nl))
                        .slice(0, 3 - wrongAnswers.length);
                    wrongAnswers.push(...additionalWords.map(w => w.nl));
                }
            }
        }

        // Combine and shuffle all choices
        this.shuffledChoices = this.shuffleArray([correctWord.nl, ...wrongAnswers.slice(0, 3)]);

        // Render buttons
        container.innerHTML = '';
        this.shuffledChoices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice;
            btn.dataset.index = index;
            btn.addEventListener('click', () => this.checkChoice(index));
            container.appendChild(btn);
        });
    },

    // Check multiple choice answer
    checkChoice(selectedIndex) {
        const word = this.currentWords[this.currentIndex];
        const selectedAnswer = this.shuffledChoices[selectedIndex];
        const correct = selectedAnswer === word.nl;

        // Disable all buttons + markeer juist/fout
        const buttons = document.querySelectorAll('#vocab-choices .choice-btn');
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (this.shuffledChoices[i] === word.nl) {
                btn.classList.add('correct');
            } else if (i === selectedIndex) {
                btn.classList.add('incorrect');
            }
        });

        // Animatie: bounce bij goed, shake bij fout
        const selectedBtn = buttons[selectedIndex];
        if (selectedBtn) {
            const animClass = correct ? 'bounce-anim' : 'shake-anim';
            selectedBtn.classList.add(animClass);
            selectedBtn.addEventListener('animationend', () => selectedBtn.classList.remove(animClass), { once: true });
        }

        // Record progress
        const wordId = `${this.currentCategory}_${this.currentIndex}`;
        Progress.recordVocabularyAttempt(wordId, this.currentCategory, correct);
        if (correct) this.sessionCorrect++;

        // Show feedback
        const feedback = Feedback.vocabularyFeedback(word, selectedAnswer, correct);
        this.showFeedback(feedback);
    },

    // Check text input answer
    checkTextAnswer() {
        const word = this.currentWords[this.currentIndex];
        const input = document.getElementById('vocab-answer-input');
        const userAnswer = input.value.trim();

        if (!userAnswer) return;

        // Check if answer is correct: case-insensitive, accept any "/" alternative or full string
        const normalised = userAnswer.toLowerCase().trim();
        const alternatives = word.nl.split('/').map(s => s.trim().toLowerCase());
        const correct = alternatives.includes(normalised) || normalised === word.nl.toLowerCase().trim();

        // Record progress
        const wordId = `${this.currentCategory}_${this.currentIndex}`;
        Progress.recordVocabularyAttempt(wordId, this.currentCategory, correct);
        if (correct) this.sessionCorrect++;

        // Show feedback
        const feedback = Feedback.vocabularyFeedback(word, userAnswer, correct);
        this.showFeedback(feedback);

        // Disable input
        input.disabled = true;
        document.getElementById('vocab-submit-btn').disabled = true;
    },

    // Show feedback panel
    showFeedback(feedback) {
        const container = document.getElementById('vocab-feedback');
        if (!container) return;

        container.style.display = 'block';
        container.className = 'feedback-panel ' + (feedback.isCorrect ? 'success' : 'error');

        const icon = feedback.isCorrect ? '✓' : '✗';
        const title = feedback.isCorrect ? 'Correct!' : 'Helaas, dat is niet juist';

        const word = this.currentWords[this.currentIndex];
        const sentenceHtml = word?.sentence
            ? `<div class="example-sentence">💬 <em>${word.sentence.it}</em> → ${word.sentence.nl}</div>`
            : '';

        container.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">${icon}</span>
                <span class="feedback-title">${title}</span>
            </div>
            <div class="feedback-content">
                <p class="correct-answer">Antwoord: ${feedback.correctAnswer}</p>
                <p class="explanation">${feedback.explanation}</p>
                ${feedback.tip && !feedback.isCorrect ? `<p class="tip">💡 Tip: ${feedback.tip}</p>` : ''}
                ${sentenceHtml}
            </div>
            <button class="btn btn-primary" id="vocab-next-btn">Volgende</button>
        `;

        // Scroll feedback into view so user sees it without scrolling
        setTimeout(() => {
            const rect = container.getBoundingClientRect();
            window.scrollTo({ top: window.scrollY + rect.top - 20 });
        }, 0);
    },

    // Move to next word
    nextWord() {
        this.currentIndex++;

        if (this.currentIndex >= this.currentWords.length) {
            // Session complete
            this.showSessionComplete();
        } else {
            // Reset UI
            const input = document.getElementById('vocab-answer-input');
            if (input) {
                input.disabled = false;
                input.value = '';
            }
            const submitBtn = document.getElementById('vocab-submit-btn');
            if (submitBtn) submitBtn.disabled = false;

            this.showCurrentWord();
        }
    },

    // Show session complete screen
    showSessionComplete() {
        const exerciseArea = document.getElementById('vocab-exercise');
        if (!exerciseArea) return;

        // Bereken sessie-score (alleen deze ronde)
        const sessionTotal = this.currentWords.length;
        const sessionAccuracy = sessionTotal > 0 ? Math.round((this.sessionCorrect / sessionTotal) * 100) : 0;

        // Sla op als beste score als beter dan vorige beste
        Progress.recordBestAccuracy(this.currentCategory, this.sessionCorrect, sessionTotal);

        // Haal opgeslagen stats op (inclusief bijgewerkte bestScore)
        const stats = Progress.getCategoryStats(this.currentCategory);
        const customCats = (typeof CustomWords !== 'undefined') ? CustomWords.getAll() : {};
        const category = AppData.vocabulary[this.currentCategory] || customCats[this.currentCategory];

        const isPerfectSession = sessionAccuracy === 100;
        const isNewBest = sessionAccuracy > 0 && sessionAccuracy === stats.bestAccuracy;

        // Build grammar suggestion HTML
        const links = VOCAB_GRAMMAR_LINKS[this.currentCategory] || [];
        let grammarSuggestHtml = '';
        if (links.length > 0) {
            const topics = links.map(id => {
                const topic = AppData.grammar?.find(t => t.id === id);
                return topic ? `<button class="btn-grammar-suggest" data-topic="${id}">📖 ${topic.title}</button>` : '';
            }).filter(Boolean).join('');
            if (topics) {
                grammarSuggestHtml = `
                    <div class="grammar-suggestion">
                        <p>📚 <strong>Gerelateerde grammatica:</strong></p>
                        <div class="grammar-suggest-btns">${topics}</div>
                    </div>`;
            }
        }

        // Confetti bij perfecte sessie
        if (isPerfectSession && window.launchConfetti) launchConfetti();

        // Automatische wekelijkse backup
        Progress.autoBackupIfNeeded();

        exerciseArea.innerHTML = `
            <div class="session-complete">
                <h3>${isPerfectSession ? '🏆 Perfect!' : isNewBest ? '🌟 Nieuw record!' : '🎉 Categorie voltooid!'}</h3>
                <p>Je hebt alle ${sessionTotal} woorden in "${category.name}" geoefend.</p>
                <div class="session-stats">
                    <div class="stat-item">
                        <span class="stat-value">${sessionAccuracy}%</span>
                        <span class="stat-label">Deze ronde</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${stats.bestAccuracy}%</span>
                        <span class="stat-label">Beste score</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${this.sessionCorrect}/${sessionTotal}</span>
                        <span class="stat-label">Correct</span>
                    </div>
                </div>
                ${grammarSuggestHtml}
                <div class="session-actions">
                    <button class="btn btn-primary" id="vocab-restart">Opnieuw oefenen</button>
                    <button class="btn btn-secondary" id="vocab-back">Andere categorie</button>
                    <button class="btn btn-accent" id="vocab-next-step">🗺️ Volgende stap →</button>
                </div>
            </div>
        `;

        // Add event listeners for buttons
        document.getElementById('vocab-restart')?.addEventListener('click', () => {
            this.startCategory(this.currentCategory);
        });

        document.getElementById('vocab-back')?.addEventListener('click', () => {
            this.backToCategories();
        });

        document.getElementById('vocab-next-step')?.addEventListener('click', () => {
            if (window.App) App.navigateNextStep();
        });

        // Grammar suggestion buttons
        exerciseArea.querySelectorAll('.btn-grammar-suggest').forEach(btn => {
            btn.addEventListener('click', () => {
                const topicId = btn.dataset.topic;
                App.showModule('grammar');
                if (typeof Grammar !== 'undefined') {
                    setTimeout(() => Grammar.openTopicReadOnly(topicId), 100);
                }
            });
        });
    },

    // Go back to category selection
    backToCategories() {
        document.querySelector('.category-selector').style.display = 'block';
        const exerciseArea = document.getElementById('vocab-exercise');
        exerciseArea.style.display = 'none';

        // Reset exercise area HTML
        exerciseArea.innerHTML = `
            <div class="exercise-progress">
                <span id="vocab-current">1</span> / <span id="vocab-total">10</span>
            </div>

            <div class="flashcard" id="flashcard">
                <div class="flashcard-front">
                    <span class="italian-word" id="vocab-italian"></span>
                    <button class="speak-btn" id="vocab-speak-btn" title="Luister">🔊</button>
                </div>
            </div>

            <div class="answer-area">
                <div class="multiple-choice" id="vocab-choices"></div>
                <div class="text-input-mode" id="vocab-text-input" style="display: none;">
                    <input type="text" id="vocab-answer-input" placeholder="Typ de vertaling...">
                    <button class="btn btn-primary" id="vocab-submit-btn">Controleer</button>
                </div>
            </div>

            <div class="feedback-panel" id="vocab-feedback" style="display: none;">
                <div class="feedback-header">
                    <span class="feedback-icon"></span>
                    <span class="feedback-title"></span>
                </div>
                <div class="feedback-content">
                    <p class="correct-answer"></p>
                    <p class="explanation"></p>
                    <p class="tip"></p>
                </div>
                <button class="btn btn-primary" id="vocab-next-btn">Volgende</button>
            </div>
        `;

        // Re-setup event listeners
        this.setupEventListeners();
        this.renderCategories();
    },

    // Speak the current word using text-to-speech
    speakCurrentWord() {
        const word = this.currentWords[this.currentIndex];
        if (!word || !window.speechSynthesis) return;

        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(word.it);
        utterance.lang = 'it-IT';
        utterance.rate = 0.8;

        // Try to find an Italian voice
        const voices = speechSynthesis.getVoices();
        const italianVoice = voices.find(v => v.lang.startsWith('it'));
        if (italianVoice) {
            utterance.voice = italianVoice;
        }

        speechSynthesis.speak(utterance);
    },

    // Shuffle array (Fisher-Yates algorithm)
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
};

// Add CSS for session complete screen
const vocabStyle = document.createElement('style');
vocabStyle.textContent = `
    .session-complete {
        text-align: center;
        padding: 1.25rem 1rem;
    }

    .session-complete h3 {
        font-size: 1.5rem;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }

    .session-complete > p {
        font-size: 0.9rem;
        margin-bottom: 0;
    }

    .session-stats {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin: 1rem 0;
    }

    .stat-item {
        text-align: center;
    }

    .stat-item .stat-value {
        display: block;
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--primary-color);
        line-height: 1.2;
    }

    .stat-item .stat-label {
        font-size: 0.8rem;
        color: var(--text-secondary);
    }

    .session-actions {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .session-actions .btn {
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
    }

    .category-btn .accuracy {
        display: block;
        font-size: 0.75rem;
        color: var(--primary-color);
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(vocabStyle);

// Make Vocabulary globally available
window.Vocabulary = Vocabulary;
