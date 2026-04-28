// Grammar Module - Theory and exercises

const Grammar = {
    currentTopic: null,
    currentExerciseIndex: 0,

    // Topic groups definition
    GRAMMAR_GROUPS: [
        {
            id: 'lidwoorden',
            label: '📚 Lidwoorden & Naamwoorden',
            topics: ['articles-definite', 'articles-indefinite', 'adjectives', 'possessives']
        },
        {
            id: 'voornaamwoorden',
            label: '👤 Voornaamwoorden',
            topics: ['pronouns-subject', 'pronouns-direct', 'reflexive']
        },
        {
            id: 'zinsbouw',
            label: '🔧 Zinsbouw',
            topics: ['prepositions', 'negation', 'questions', 'comparatives']
        },
        {
            id: 'werkwoorden',
            label: '⏰ Werkwoordstijden',
            topics: ['condizionale', 'imperfetto-vs-passato']
        }
    ],

    // CEFR level per topic
    TOPIC_LEVELS: {
        'articles-definite':   'A1',
        'articles-indefinite': 'A1',
        'adjectives':          'A1',
        'negation':            'A1',
        'questions':           'A1',
        'pronouns-subject':    'A1',
        'prepositions':        'A2',
        'pronouns-direct':     'A2',
        'possessives':         'A2',
        'reflexive':           'A2',
        'comparatives':        'B1',
        'condizionale':        'B1',
        'imperfetto-vs-passato': 'B1'
    },

    // Initialize the grammar module
    init() {
        this.renderTopics();
        this.setupEventListeners();
    },

    // Render grouped topic rows
    renderTopics() {
        const container = document.getElementById('grammar-topics');
        if (!container) return;

        container.innerHTML = '';
        const progress = Progress.load();

        this.GRAMMAR_GROUPS.forEach(group => {
            // Gather topics for this group
            const groupTopics = group.topics
                .map(id => AppData.grammar.find(t => t.id === id))
                .filter(Boolean);

            const completedInGroup = groupTopics.filter(t =>
                progress.grammar.completedTopics.includes(t.id)
            ).length;

            // Group header
            const groupEl = document.createElement('div');
            groupEl.className = 'grammar-group';
            groupEl.innerHTML = `
                <div class="grammar-group-header">
                    <span class="grammar-group-label">${group.label}</span>
                    <span class="grammar-group-badge">${completedInGroup}/${groupTopics.length}</span>
                </div>
                <div class="grammar-group-rows"></div>
            `;

            const rowsEl = groupEl.querySelector('.grammar-group-rows');

            groupTopics.forEach(topic => {
                const topicProgress = progress.grammar.topicProgress[topic.id] || { correct: 0, attempts: 0 };
                const isCompleted = progress.grammar.completedTopics.includes(topic.id);
                const progressPercent = topicProgress.attempts > 0
                    ? Math.round((topicProgress.correct / Math.max(topicProgress.attempts, 5)) * 100)
                    : 0;
                const level = this.TOPIC_LEVELS[topic.id] || '';

                const row = document.createElement('div');
                row.className = 'topic-row' + (isCompleted ? ' topic-row--done' : '');
                row.innerHTML = `
                    <span class="topic-status-dot ${isCompleted ? 'dot-done' : (topicProgress.attempts > 0 ? 'dot-progress' : 'dot-new')}"></span>
                    <span class="topic-level-pill pill-${level}">${level}</span>
                    <div class="topic-row-info">
                        <span class="topic-row-name">${topic.topic}</span>
                        <span class="topic-row-summary">${topic.summary}</span>
                        <div class="topic-row-bar-wrap">
                            <div class="topic-row-bar" style="width:${progressPercent}%"></div>
                        </div>
                    </div>
                    <div class="topic-row-actions">
                        <button class="btn-topic-icon btn-topic-read" data-topic-id="${topic.id}" title="Lees uitleg">📖</button>
                        <button class="btn-topic-icon btn-topic-practice" data-topic-id="${topic.id}" title="Oefen">✏️</button>
                    </div>
                `;
                rowsEl.appendChild(row);
            });

            container.appendChild(groupEl);
        });
    },

    // Setup event listeners
    setupEventListeners() {
        // Topic selection — two buttons per card
        document.getElementById('grammar-topics')?.addEventListener('click', (e) => {
            const readBtn = e.target.closest('.btn-topic-read');
            const practiceBtn = e.target.closest('.btn-topic-practice');
            if (readBtn) {
                this.openTopicReadOnly(readBtn.dataset.topicId);
            } else if (practiceBtn) {
                this.openTopic(practiceBtn.dataset.topicId);
            }
        });

        // Back button
        document.getElementById('grammar-back-btn')?.addEventListener('click', () => {
            this.backToTopics();
        });

        // Next exercise button
        document.getElementById('grammar-feedback')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-primary')) {
                this.nextExercise();
            }
        });
    },

    // Open a topic
    openTopic(topicId) {
        const topic = AppData.grammar.find(t => t.id === topicId);
        if (!topic) return;

        this.currentTopic = topic;
        this.currentExerciseIndex = 0;

        // Hide topics list, show lesson
        document.getElementById('grammar-topics').style.display = 'none';
        document.getElementById('grammar-lesson').style.display = 'block';

        // Render content
        this.renderLesson(topic);
        this.renderExercise();
    },

    // Open a topic in read-only mode (theory only, no exercises)
    openTopicReadOnly(topicId) {
        const topic = AppData.grammar.find(t => t.id === topicId);
        if (!topic) return;

        this.currentTopic = topic;

        document.getElementById('grammar-topics').style.display = 'none';
        document.getElementById('grammar-lesson').style.display = 'block';

        this.renderLesson(topic);

        // Replace exercise area with a prompt to start exercises
        const exerciseContainer = document.getElementById('grammar-exercise');
        exerciseContainer.innerHTML = `
            <div class="read-only-actions">
                <p class="read-only-hint">Klaar om te oefenen met deze stof?</p>
                <button class="btn btn-primary" id="start-exercises-btn">✏️ Start oefeningen →</button>
            </div>
        `;

        document.getElementById('start-exercises-btn').addEventListener('click', () => {
            this.currentExerciseIndex = 0;
            this.restoreExerciseArea();
            this.renderExercise();
        });
    },

    // Render lesson content
    renderLesson(topic) {
        document.getElementById('grammar-title').textContent = topic.topic;
        document.getElementById('grammar-theory').innerHTML = topic.explanation;

        // Render examples
        const examplesList = document.getElementById('grammar-examples');
        examplesList.innerHTML = '';
        topic.examples.forEach(example => {
            const li = document.createElement('li');
            li.textContent = example;
            examplesList.appendChild(li);
        });
    },

    // Render current exercise
    renderExercise() {
        if (!this.currentTopic || !this.currentTopic.exercises) return;

        const exercise = this.currentTopic.exercises[this.currentExerciseIndex];
        if (!exercise) {
            this.showTopicComplete();
            return;
        }

        // Update question
        document.getElementById('grammar-question').textContent = exercise.question;

        // Render options
        const optionsContainer = document.getElementById('grammar-options');
        optionsContainer.innerHTML = '';

        exercise.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.dataset.index = index;
            btn.addEventListener('click', () => this.checkAnswer(index));
            optionsContainer.appendChild(btn);
        });

        // Hide feedback
        document.getElementById('grammar-feedback').style.display = 'none';
    },

    // Check answer
    checkAnswer(selectedIndex) {
        const exercise = this.currentTopic.exercises[this.currentExerciseIndex];
        const correct = selectedIndex === exercise.correct;

        // Disable all buttons and show correct/incorrect
        const buttons = document.querySelectorAll('#grammar-options .option-btn');
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === exercise.correct) {
                btn.classList.add('correct');
            } else if (i === selectedIndex) {
                btn.classList.add('incorrect');
            }
        });

        // Record progress
        Progress.recordGrammarAttempt(this.currentTopic.id, correct);

        // Show feedback
        const feedback = Feedback.grammarFeedback(exercise, selectedIndex, correct);
        this.showFeedback(feedback);
    },

    // Show feedback panel
    showFeedback(feedback) {
        const container = document.getElementById('grammar-feedback');
        if (!container) return;

        container.style.display = 'block';
        container.className = 'feedback-panel ' + (feedback.isCorrect ? 'success' : 'error');

        const icon = feedback.isCorrect ? '✓' : '✗';
        const title = feedback.isCorrect ? 'Correct!' : 'Helaas, dat is niet juist';

        container.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">${icon}</span>
                <span class="feedback-title">${title}</span>
            </div>
            <div class="feedback-content">
                <p class="correct-answer">Antwoord: ${feedback.correctAnswer}</p>
                <p class="explanation">${feedback.explanation}</p>
            </div>
            <button class="btn btn-primary" id="grammar-next-btn">Volgende oefening</button>
        `;
    },

    // Move to next exercise
    nextExercise() {
        this.currentExerciseIndex++;

        if (this.currentExerciseIndex >= this.currentTopic.exercises.length) {
            this.showTopicComplete();
        } else {
            this.renderExercise();
        }
    },

    // Show topic complete screen
    showTopicComplete() {
        const exerciseContainer = document.getElementById('grammar-exercise');
        if (!exerciseContainer) return;

        const progress = Progress.load();
        const topicProgress = progress.grammar.topicProgress[this.currentTopic.id] || { correct: 0, attempts: 0 };
        const accuracy = topicProgress.attempts > 0 ?
            Math.round((topicProgress.correct / topicProgress.attempts) * 100) : 0;
        const isCompleted = progress.grammar.completedTopics.includes(this.currentTopic.id);

        exerciseContainer.innerHTML = `
            <div class="session-complete">
                <h3>${isCompleted ? '🏆' : '🎉'} ${isCompleted ? 'Onderwerp beheerst!' : 'Oefeningen voltooid!'}</h3>
                <p>Je hebt alle oefeningen over "${this.currentTopic.topic}" afgerond.</p>
                ${isCompleted ? '<p class="completion-badge">Dit onderwerp is nu als voltooid gemarkeerd!</p>' :
                    '<p class="hint">Blijf oefenen om dit onderwerp te voltooien (5 correcte antwoorden nodig).</p>'}
                <div class="session-stats">
                    <div class="stat-item">
                        <span class="stat-value">${accuracy}%</span>
                        <span class="stat-label">Nauwkeurigheid</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${topicProgress.correct}/${topicProgress.attempts}</span>
                        <span class="stat-label">Correct</span>
                    </div>
                </div>
                <div class="session-actions">
                    <button class="btn btn-primary" id="grammar-restart">Opnieuw oefenen</button>
                    <button class="btn btn-secondary" id="grammar-topics-btn">Andere onderwerpen</button>
                </div>
            </div>
        `;

        document.getElementById('grammar-restart')?.addEventListener('click', () => {
            this.currentExerciseIndex = 0;
            this.restoreExerciseArea();
            this.renderExercise();
        });

        document.getElementById('grammar-topics-btn')?.addEventListener('click', () => {
            this.backToTopics();
        });
    },

    // Restore exercise area HTML
    restoreExerciseArea() {
        const exerciseContainer = document.getElementById('grammar-exercise');
        exerciseContainer.innerHTML = `
            <h4>Oefening:</h4>
            <div class="exercise-question" id="grammar-question"></div>
            <div class="exercise-options" id="grammar-options"></div>
            <div class="feedback-panel" id="grammar-feedback" style="display: none;">
                <div class="feedback-header">
                    <span class="feedback-icon"></span>
                    <span class="feedback-title"></span>
                </div>
                <div class="feedback-content">
                    <p class="correct-answer"></p>
                    <p class="explanation"></p>
                </div>
                <button class="btn btn-primary" id="grammar-next-btn">Volgende oefening</button>
            </div>
        `;
    },

    // Go back to topics
    backToTopics() {
        document.getElementById('grammar-topics').style.display = 'block';
        document.getElementById('grammar-lesson').style.display = 'none';

        // Restore exercise area
        this.restoreExerciseArea();

        // Re-render topics with updated progress
        this.renderTopics();

        // Re-setup event listeners
        this.setupEventListeners();
    }
};

// Add CSS for grammar module
const grammarStyle = document.createElement('style');
grammarStyle.textContent = `
    /* Grammar groups */
    .grammar-group {
        margin-bottom: 1.25rem;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e0e0e0;
    }

    .grammar-group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.6rem 1rem;
        background: var(--primary-color);
        color: white;
    }

    .grammar-group-label {
        font-weight: 700;
        font-size: 0.9rem;
        letter-spacing: 0.01em;
    }

    .grammar-group-badge {
        font-size: 0.78rem;
        background: rgba(255,255,255,0.25);
        border-radius: 20px;
        padding: 0.15rem 0.55rem;
        font-weight: 600;
    }

    /* Topic rows */
    .topic-row {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        padding: 0.65rem 1rem;
        background: var(--card-background);
        border-top: 1px solid #f0f0f0;
        transition: background 0.15s;
    }

    .topic-row:hover {
        background: rgba(0,0,0,0.02);
    }

    .topic-row--done {
        background: rgba(76,175,80,0.04);
    }

    /* Status dot */
    .topic-status-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
    }
    .dot-new      { background: #ccc; }
    .dot-progress { background: #ff9800; }
    .dot-done     { background: #4caf50; }

    /* Level pill */
    .topic-level-pill {
        font-size: 0.68rem;
        font-weight: 700;
        border-radius: 4px;
        padding: 0.1rem 0.35rem;
        flex-shrink: 0;
        letter-spacing: 0.03em;
    }
    .pill-A1 { background: #e8f5e9; color: #2e7d32; }
    .pill-A2 { background: #e3f2fd; color: #1565c0; }
    .pill-B1 { background: #fff3e0; color: #e65100; }
    .pill-B2 { background: #fce4ec; color: #880e4f; }

    /* Row info */
    .topic-row-info {
        flex: 1;
        min-width: 0;
    }

    .topic-row-name {
        display: block;
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .topic-row--done .topic-row-name {
        color: var(--success-color, #4caf50);
    }

    .topic-row-summary {
        display: block;
        font-size: 0.75rem;
        color: var(--text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .topic-row-bar-wrap {
        height: 3px;
        background: #e0e0e0;
        border-radius: 2px;
        margin-top: 0.3rem;
    }

    .topic-row-bar {
        height: 100%;
        background: var(--primary-color);
        border-radius: 2px;
        transition: width 0.4s ease;
    }

    /* Action icon buttons */
    .topic-row-actions {
        display: flex;
        gap: 0.3rem;
        flex-shrink: 0;
    }

    .btn-topic-icon {
        width: 34px;
        height: 34px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.1s, background 0.15s;
        font-family: inherit;
    }

    .btn-topic-read {
        background: transparent;
        border: 1.5px solid var(--primary-color);
        color: var(--primary-color);
    }
    .btn-topic-read:hover {
        background: var(--primary-color);
    }

    .btn-topic-practice {
        background: var(--primary-color);
        color: white;
    }
    .btn-topic-practice:hover {
        background: var(--primary-dark);
    }

    .btn-topic-icon:active {
        transform: scale(0.9);
    }

    /* Grammar lesson */
    .completion-badge {
        color: var(--success-color);
        font-weight: 600;
        margin: 1rem 0;
    }

    .hint {
        color: var(--text-secondary);
        font-style: italic;
    }

    #grammar-theory {
        white-space: pre-line;
    }

    #grammar-theory strong {
        color: var(--primary-color);
    }

    .read-only-actions {
        text-align: center;
        padding: 1.5rem;
        background: #f9f9f9;
        border-radius: 12px;
        margin-top: 1rem;
    }

    .read-only-hint {
        color: var(--text-secondary);
        margin-bottom: 1rem;
        font-size: 0.95rem;
    }

    /* Dark mode */
    body.dark-mode .grammar-group {
        border-color: #333;
    }
    body.dark-mode .topic-row {
        border-top-color: #2a2a2a;
    }
    body.dark-mode .topic-row:hover {
        background: rgba(255,255,255,0.03);
    }
    body.dark-mode .topic-row-bar-wrap {
        background: #333;
    }
    body.dark-mode .dot-new { background: #555; }
    body.dark-mode .pill-A1 { background: #1b3a1e; color: #81c784; }
    body.dark-mode .pill-A2 { background: #0d2137; color: #64b5f6; }
    body.dark-mode .pill-B1 { background: #2d1b00; color: #ffb74d; }
    body.dark-mode .btn-topic-read {
        background: transparent;
    }
    body.dark-mode .read-only-actions {
        background: #1e1e1e;
    }
`;
document.head.appendChild(grammarStyle);

// Make Grammar globally available
window.Grammar = Grammar;
