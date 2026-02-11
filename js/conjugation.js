// Conjugation Module - Verb conjugation practice

const Conjugation = {
    currentVerbs: [],
    currentIndex: 0,
    currentTense: 'presente',
    currentPerson: null,
    currentVerb: null,
    totalExercises: 10,

    // Initialize the conjugation module
    init() {
        this.setupEventListeners();
        this.renderReferenceTable('are');
    },

    // Setup event listeners
    setupEventListeners() {
        // Start exercise button
        document.getElementById('start-conjugation')?.addEventListener('click', () => {
            this.startExercise();
        });

        // Reference tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.renderReferenceTable(e.target.dataset.tab);
            });
        });

        // Submit answer
        document.getElementById('conj-submit')?.addEventListener('click', () => {
            this.checkAnswer();
        });

        // Enter key for answer input
        document.getElementById('conj-answer')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });

        // Next button
        document.getElementById('conj-feedback')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-primary')) {
                this.nextExercise();
            }
        });
    },

    // Render reference conjugation table
    renderReferenceTable(verbType) {
        const container = document.getElementById('reference-content');
        if (!container) return;

        const patterns = AppData.verbs.patterns;
        const persons = ['io', 'tu', 'lui', 'noi', 'voi', 'loro'];
        const tenses = ['presente', 'imperfetto', 'futuro'];

        // Example verb for this type
        const exampleVerbs = {
            are: { infinitive: 'parlare', stem: 'parl' },
            ere: { infinitive: 'vedere', stem: 'ved' },
            ire: { infinitive: 'dormire', stem: 'dorm' }
        };

        const example = exampleVerbs[verbType];

        let html = `<h4>Voorbeeld: ${example.infinitive} (${this.getVerbMeaning(example.infinitive)})</h4>`;
        html += '<table class="reference-table"><thead><tr><th>Persoon</th>';

        tenses.forEach(tense => {
            html += `<th>${AppData.verbs.tenses[tense].name}</th>`;
        });

        html += '</tr></thead><tbody>';

        persons.forEach(person => {
            html += `<tr><td>${AppData.verbs.persons[person]}</td>`;

            tenses.forEach(tense => {
                const pattern = patterns[tense][verbType];
                if (pattern && pattern[person]) {
                    html += `<td>${example.stem}${pattern[person]}</td>`;
                } else {
                    html += '<td>-</td>';
                }
            });

            html += '</tr>';
        });

        html += '</tbody></table>';

        // Add note about -isc- verbs for -ire
        if (verbType === 'ire') {
            html += `
                <div class="reference-note">
                    <strong>Let op:</strong> Sommige -ire werkwoorden (zoals capire, finire, preferire)
                    voegen -isc- toe voor io, tu, lui/lei, en loro in de presente:
                    <br>capire → capisco, capisci, capisce, capiamo, capite, capiscono
                </div>
            `;
        }

        container.innerHTML = html;
    },

    // Get verb meaning
    getVerbMeaning(infinitive) {
        // Check regular verbs
        for (const type in AppData.verbs.regular) {
            const verb = AppData.verbs.regular[type].find(v => v.infinitive === infinitive);
            if (verb) return verb.meaning;
        }

        // Check irregular verbs
        const irregular = AppData.verbs.irregular.find(v => v.infinitive === infinitive);
        if (irregular) return irregular.meaning;

        return '';
    },

    // Start conjugation exercise
    startExercise() {
        const verbType = document.getElementById('verb-type').value;
        this.currentTense = document.getElementById('verb-tense').value;

        // Collect verbs based on selection
        this.currentVerbs = [];

        if (verbType === 'all' || verbType === 'irregular') {
            // Add irregular verbs
            AppData.verbs.irregular.forEach(verb => {
                this.currentVerbs.push({ ...verb, type: 'irregular' });
            });
        }

        if (verbType === 'all' || verbType === 'are') {
            AppData.verbs.regular.are.forEach(verb => {
                this.currentVerbs.push({ ...verb, type: 'are' });
            });
        }

        if (verbType === 'all' || verbType === 'ere') {
            AppData.verbs.regular.ere.forEach(verb => {
                this.currentVerbs.push({ ...verb, type: 'ere' });
            });
        }

        if (verbType === 'all' || verbType === 'ire') {
            AppData.verbs.regular.ire.forEach(verb => {
                this.currentVerbs.push({ ...verb, type: 'ire' });
            });
        }

        // Shuffle and limit
        this.currentVerbs = this.shuffleArray(this.currentVerbs).slice(0, this.totalExercises);
        this.currentIndex = 0;

        // Hide reference, show exercise
        document.getElementById('conjugation-reference').style.display = 'none';
        document.querySelector('.conjugation-selector').style.display = 'none';
        document.getElementById('conjugation-exercise').style.display = 'block';

        // Update total
        document.getElementById('conj-total').textContent = this.currentVerbs.length;

        this.showCurrentExercise();
    },

    // Show current exercise
    showCurrentExercise() {
        this.currentVerb = this.currentVerbs[this.currentIndex];
        if (!this.currentVerb) return;

        // Random person
        const persons = ['io', 'tu', 'lui', 'noi', 'voi', 'loro'];
        this.currentPerson = persons[Math.floor(Math.random() * persons.length)];

        // Update UI
        document.getElementById('conj-current').textContent = this.currentIndex + 1;
        document.getElementById('conj-infinitive').textContent = this.currentVerb.infinitive;
        document.getElementById('conj-meaning').textContent = this.currentVerb.meaning;
        document.getElementById('conj-tense-display').textContent = AppData.verbs.tenses[this.currentTense].name;
        document.getElementById('conj-person').textContent = AppData.verbs.persons[this.currentPerson];

        // Reset input
        const input = document.getElementById('conj-answer');
        input.value = '';
        input.disabled = false;
        input.focus();

        document.getElementById('conj-submit').disabled = false;

        // Hide feedback
        document.getElementById('conj-feedback').style.display = 'none';
    },

    // Get correct conjugation for current exercise
    getCorrectConjugation() {
        const verb = this.currentVerb;
        const tense = this.currentTense;
        const person = this.currentPerson;

        // Check if irregular verb has this tense defined
        if (verb.type === 'irregular' && verb[tense]) {
            return verb[tense][person];
        }

        // Calculate regular conjugation
        const infinitive = verb.infinitive;
        const stem = infinitive.slice(0, -3);
        const ending = infinitive.slice(-3);

        // Handle passato prossimo specially
        if (tense === 'passatoProssimo') {
            return this.getPassatoProssimo(verb, person);
        }

        // Get pattern
        let pattern;
        if (verb.isc && tense === 'presente') {
            pattern = AppData.verbs.patterns.presente.ire_isc;
        } else {
            pattern = AppData.verbs.patterns[tense][ending.slice(0, -1) + ending.slice(-1)];
            if (!pattern) {
                // Try without the 'e' for 'are'/'ere'/'ire'
                if (ending === 'are') pattern = AppData.verbs.patterns[tense].are;
                else if (ending === 'ere') pattern = AppData.verbs.patterns[tense].ere;
                else if (ending === 'ire') pattern = AppData.verbs.patterns[tense].ire;
            }
        }

        if (pattern && pattern[person]) {
            return stem + pattern[person];
        }

        return null;
    },

    // Get passato prossimo conjugation
    getPassatoProssimo(verb, person) {
        const infinitive = verb.infinitive;
        const ending = infinitive.slice(-3);

        // Determine auxiliary (essere or avere)
        let auxiliary = 'avere';
        let participle;

        // Check if irregular has passatoProssimo info
        if (verb.passatoProssimo) {
            auxiliary = verb.passatoProssimo.auxiliary;
            participle = verb.passatoProssimo.participle;
        } else {
            // Regular participle
            const stem = infinitive.slice(0, -3);
            if (ending === 'are') participle = stem + 'ato';
            else if (ending === 'ere') participle = stem + 'uto';
            else if (ending === 'ire') participle = stem + 'ito';
        }

        // Get auxiliary conjugation
        const auxiliaryVerb = AppData.verbs.irregular.find(v => v.infinitive === auxiliary);
        const auxiliaryForm = auxiliaryVerb.presente[person];

        return `${auxiliaryForm} ${participle}`;
    },

    // Check the answer
    checkAnswer() {
        const userAnswer = document.getElementById('conj-answer').value.trim().toLowerCase();
        const correctAnswer = this.getCorrectConjugation();

        if (!userAnswer) return;

        const correct = userAnswer === correctAnswer.toLowerCase();

        // Record progress
        Progress.recordConjugationAttempt(this.currentVerb.infinitive, this.currentTense, correct);

        // Disable input
        document.getElementById('conj-answer').disabled = true;
        document.getElementById('conj-submit').disabled = true;

        // Show feedback
        const feedback = Feedback.conjugationFeedback(
            this.currentVerb,
            this.currentTense,
            this.currentPerson,
            userAnswer,
            correctAnswer,
            correct
        );

        this.showFeedback(feedback);
    },

    // Show feedback panel
    showFeedback(feedback) {
        const container = document.getElementById('conj-feedback');
        if (!container) return;

        container.style.display = 'block';
        container.className = 'feedback-panel ' + (feedback.isCorrect ? 'success' : 'error');

        const icon = feedback.isCorrect ? '✓' : '✗';
        const title = feedback.isCorrect ? 'Correct!' : 'Helaas, dat is niet juist';

        let tableHtml = '';
        if (feedback.conjugationTable && Object.keys(feedback.conjugationTable).length > 0) {
            tableHtml = '<div class="conjugation-table-mini"><h5>Volledige vervoeging:</h5><table>';
            for (const [person, form] of Object.entries(feedback.conjugationTable)) {
                const highlight = person === this.currentPerson ? 'style="background: rgba(46, 125, 50, 0.2);"' : '';
                tableHtml += `<tr ${highlight}><td>${AppData.verbs.persons[person]}</td><td>${form}</td></tr>`;
            }
            tableHtml += '</table></div>';
        }

        container.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">${icon}</span>
                <span class="feedback-title">${title}</span>
            </div>
            <div class="feedback-content">
                <p class="correct-answer">Correct antwoord: ${feedback.correctAnswer}</p>
                <p class="explanation">${feedback.explanation}</p>
                ${tableHtml}
            </div>
            <button class="btn btn-primary" id="conj-next-btn">Volgende</button>
        `;
    },

    // Move to next exercise
    nextExercise() {
        this.currentIndex++;

        if (this.currentIndex >= this.currentVerbs.length) {
            this.showSessionComplete();
        } else {
            this.showCurrentExercise();
        }
    },

    // Show session complete screen
    showSessionComplete() {
        const container = document.getElementById('conjugation-exercise');
        if (!container) return;

        const progress = Progress.load();
        const tenseStats = progress.conjugation.tenseProgress[this.currentTense] || { correct: 0, attempts: 0 };
        const accuracy = tenseStats.attempts > 0 ? Math.round((tenseStats.correct / tenseStats.attempts) * 100) : 0;

        container.innerHTML = `
            <div class="session-complete">
                <h3>🎉 Oefening voltooid!</h3>
                <p>Je hebt ${this.currentVerbs.length} werkwoorden geoefend in de ${AppData.verbs.tenses[this.currentTense].name}.</p>
                <div class="session-stats">
                    <div class="stat-item">
                        <span class="stat-value">${accuracy}%</span>
                        <span class="stat-label">Nauwkeurigheid</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${progress.conjugation.masteredVerbs.length}</span>
                        <span class="stat-label">Werkwoorden beheerst</span>
                    </div>
                </div>
                <div class="session-actions">
                    <button class="btn btn-primary" id="conj-restart">Opnieuw oefenen</button>
                    <button class="btn btn-secondary" id="conj-back">Terug naar opties</button>
                </div>
            </div>
        `;

        document.getElementById('conj-restart')?.addEventListener('click', () => {
            this.startExercise();
        });

        document.getElementById('conj-back')?.addEventListener('click', () => {
            this.backToSelector();
        });
    },

    // Go back to selector
    backToSelector() {
        document.getElementById('conjugation-reference').style.display = 'block';
        document.querySelector('.conjugation-selector').style.display = 'flex';

        const exerciseArea = document.getElementById('conjugation-exercise');
        exerciseArea.style.display = 'none';

        // Reset exercise area HTML
        exerciseArea.innerHTML = `
            <div class="exercise-progress">
                <span id="conj-current">1</span> / <span id="conj-total">10</span>
            </div>

            <div class="conjugation-prompt">
                <p class="verb-infinitive">Vervoeging van: <strong id="conj-infinitive"></strong> (<span id="conj-meaning"></span>)</p>
                <p class="verb-tense">Tijd: <strong id="conj-tense-display"></strong></p>
                <p class="verb-person">Persoon: <strong id="conj-person"></strong></p>
            </div>

            <div class="answer-input">
                <input type="text" id="conj-answer" placeholder="Typ de vervoeging...">
                <button class="btn btn-primary" id="conj-submit">Controleer</button>
            </div>

            <div class="feedback-panel" id="conj-feedback" style="display: none;">
                <div class="feedback-header">
                    <span class="feedback-icon"></span>
                    <span class="feedback-title"></span>
                </div>
                <div class="feedback-content">
                    <p class="correct-answer"></p>
                    <p class="explanation"></p>
                    <div class="conjugation-table-mini" id="conj-table-mini"></div>
                </div>
                <button class="btn btn-primary" id="conj-next-btn">Volgende</button>
            </div>
        `;

        // Re-setup event listeners
        this.setupEventListeners();
    },

    // Shuffle array
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
};

// Add CSS for reference note
const conjStyle = document.createElement('style');
conjStyle.textContent = `
    .reference-note {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(255, 152, 0, 0.1);
        border-left: 3px solid var(--accent-color);
        border-radius: 4px;
        font-size: 0.9rem;
    }

    .conjugation-table-mini h5 {
        margin-bottom: 0.5rem;
        color: var(--text-secondary);
    }
`;
document.head.appendChild(conjStyle);

// Make Conjugation globally available
window.Conjugation = Conjugation;
