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
            `;
            container.appendChild(card);
        });
    },

    // Setup event listeners
    setupEventListeners() {
        // Topic selection
        document.getElementById('grammar-topics')?.addEventListener('click', (e) => {
            const card = e.target.closest('.topic-card');
            if (card) {
                this.openTopic(card.dataset.topicId);
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
`;
document.head.appendChild(grammarStyle);

// Make Grammar globally available
window.Grammar = Grammar;
