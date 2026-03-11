// Grammar Module - Theory and exercises

const Grammar = {
    currentTopic: null,
    currentExerciseIndex: 0,

    // Initialize the grammar module
    init() {
        this.renderTopics();
        this.setupEventListeners();
    },

    // Render topic cards
    renderTopics() {
        const container = document.getElementById('grammar-topics');
        if (!container) return;

        container.innerHTML = '';
        const progress = Progress.load();

        AppData.grammar.forEach(topic => {
            const topicProgress = progress.grammar.topicProgress[topic.id] || { correct: 0, attempts: 0 };
            const isCompleted = progress.grammar.completedTopics.includes(topic.id);
            const progressPercent = topicProgress.attempts > 0 ?
                Math.round((topicProgress.correct / Math.max(topicProgress.attempts, 5)) * 100) : 0;

            const card = document.createElement('div');
            card.className = 'topic-card' + (isCompleted ? ' completed' : '');
            card.dataset.topicId = topic.id;
            card.innerHTML = `
                <h4>${isCompleted ? '✓ ' : ''}${topic.topic}</h4>
                <p>${topic.summary}</p>
                <div class="topic-progress">
                    <div class="topic-progress-bar">
                        <div class="topic-progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <span>${progressPercent}%</span>
                </div>
                <div class="topic-card-actions">
                    <button class="btn-topic-read" data-topic-id="${topic.id}">📖 Lees uitleg</button>
                    <button class="btn-topic-practice" data-topic-id="${topic.id}">✏️ Oefen</button>
                </div>
            `;
            container.appendChild(card);
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
        document.getElementById('grammar-topics').style.display = 'grid';
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
    .topic-card.completed {
        border-left-color: var(--success-color);
        background: rgba(76, 175, 80, 0.05);
    }

    .topic-card.completed h4 {
        color: var(--success-color);
    }

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

    .topic-card-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.75rem;
    }

    .btn-topic-read,
    .btn-topic-practice {
        flex: 1;
        padding: 0.4rem 0.5rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
        font-family: inherit;
        transition: all 0.2s ease;
    }

    .btn-topic-read {
        background: transparent;
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
    }
    .btn-topic-read:hover {
        background: var(--primary-color);
        color: white;
    }

    .btn-topic-practice {
        background: var(--primary-color);
        color: white;
    }
    .btn-topic-practice:hover {
        background: var(--primary-dark);
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
`;
document.head.appendChild(grammarStyle);

// Make Grammar globally available
window.Grammar = Grammar;
