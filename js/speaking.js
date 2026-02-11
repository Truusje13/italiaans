// Speaking Module - Text-to-speech and speech recognition

const Speaking = {
    currentPhrases: [],
    currentIndex: 0,
    currentMode: 'listen', // 'listen' or 'speak'
    currentCategory: 'greetings',
    recognition: null,
    isRecording: false,
    speechRate: 0.8,

    // Initialize the speaking module
    init() {
        this.checkBrowserSupport();
        this.setupSpeechRecognition();
        this.setupEventListeners();
        this.loadPhrases();
    },

    // Check browser support for speech APIs
    checkBrowserSupport() {
        const warning = document.getElementById('speech-warning');

        if (!('speechSynthesis' in window)) {
            warning.style.display = 'block';
            warning.innerHTML = '<p>⚠️ Je browser ondersteunt geen text-to-speech. Gebruik Chrome of Edge voor de beste ervaring.</p>';
        }

        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            warning.style.display = 'block';
            warning.innerHTML += '<p>⚠️ Je browser ondersteunt geen spraakherkenning. De "Spreken & Controleren" modus is uitgeschakeld.</p>';

            // Disable speak mode button
            document.querySelector('[data-mode="speak"]')?.setAttribute('disabled', 'true');
        }
    },

    // Setup speech recognition
    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'it-IT';
            this.recognition.continuous = false;
            this.recognition.interimResults = true;

            this.recognition.onresult = (event) => {
                const result = event.results[event.results.length - 1];
                const transcript = result[0].transcript;

                document.getElementById('recognized-text').textContent = `"${transcript}"`;

                if (result.isFinal) {
                    this.evaluatePronunciation(transcript);
                }
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.stopRecording();

                if (event.error === 'no-speech') {
                    document.getElementById('recognized-text').textContent = 'Geen spraak gedetecteerd. Probeer opnieuw.';
                }
            };

            this.recognition.onend = () => {
                this.stopRecording();
            };
        }
    },

    // Setup event listeners
    setupEventListeners() {
        // Mode selection
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.disabled) return;

                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMode = e.target.dataset.mode;
                this.updateModeUI();
            });
        });

        // Category selection
        document.getElementById('speaking-category')?.addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.loadPhrases();
        });

        // Play button (text-to-speech)
        document.getElementById('play-btn')?.addEventListener('click', () => {
            this.speakCurrentPhrase();
        });

        // Speed control
        document.getElementById('speech-speed')?.addEventListener('input', (e) => {
            this.speechRate = parseFloat(e.target.value);
            document.getElementById('speed-value').textContent = this.speechRate + 'x';
        });

        // Record button
        const recordBtn = document.getElementById('record-btn');
        if (recordBtn) {
            recordBtn.addEventListener('mousedown', () => this.startRecording());
            recordBtn.addEventListener('mouseup', () => this.stopRecording());
            recordBtn.addEventListener('mouseleave', () => this.stopRecording());

            // Touch events for mobile
            recordBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.startRecording();
            });
            recordBtn.addEventListener('touchend', () => this.stopRecording());
        }

        // Next button
        document.getElementById('speaking-next-btn')?.addEventListener('click', () => {
            this.nextPhrase();
        });
    },

    // Load phrases for current category
    loadPhrases() {
        const categoryData = AppData.speaking[this.currentCategory];
        // Support both old format (array) and new format (object with phrases array)
        if (categoryData && categoryData.phrases) {
            this.currentPhrases = [...categoryData.phrases];
        } else if (Array.isArray(categoryData)) {
            this.currentPhrases = [...categoryData];
        } else {
            this.currentPhrases = [];
        }
        this.currentIndex = 0;
        this.showCurrentPhrase();
    },

    // Show current phrase
    showCurrentPhrase() {
        const phrase = this.currentPhrases[this.currentIndex];
        if (!phrase) return;

        document.getElementById('speaking-italian').textContent = phrase.it;
        document.getElementById('speaking-dutch').textContent = phrase.nl;

        // Reset recognized text
        document.getElementById('recognized-text').textContent = '';

        // Hide feedback
        document.getElementById('speaking-feedback').style.display = 'none';
    },

    // Update UI based on mode
    updateModeUI() {
        const recordingArea = document.getElementById('recording-area');

        if (this.currentMode === 'listen') {
            recordingArea.style.display = 'none';
        } else {
            recordingArea.style.display = 'block';
        }
    },

    // Speak current phrase using text-to-speech
    speakCurrentPhrase() {
        const phrase = this.currentPhrases[this.currentIndex];
        if (!phrase || !window.speechSynthesis) return;

        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(phrase.it);
        utterance.lang = 'it-IT';
        utterance.rate = this.speechRate;

        // Try to find an Italian voice
        const voices = speechSynthesis.getVoices();
        const italianVoice = voices.find(v => v.lang.startsWith('it'));
        if (italianVoice) {
            utterance.voice = italianVoice;
        }

        // Visual feedback
        const playBtn = document.getElementById('play-btn');
        playBtn.classList.add('playing');
        playBtn.textContent = '🔊 Spreekt...';

        utterance.onend = () => {
            playBtn.classList.remove('playing');
            playBtn.textContent = '🔊 Luister';
        };

        speechSynthesis.speak(utterance);
    },

    // Start recording
    startRecording() {
        if (!this.recognition || this.isRecording) return;

        this.isRecording = true;

        const recordBtn = document.getElementById('record-btn');
        const indicator = document.getElementById('recording-indicator');

        recordBtn.classList.add('recording');
        recordBtn.textContent = '🎤 Opnemen...';
        indicator.classList.add('active');

        document.getElementById('recognized-text').textContent = '';
        document.getElementById('speaking-feedback').style.display = 'none';

        try {
            this.recognition.start();
        } catch (e) {
            console.error('Error starting recognition:', e);
            this.stopRecording();
        }
    },

    // Stop recording
    stopRecording() {
        if (!this.isRecording) return;

        this.isRecording = false;

        const recordBtn = document.getElementById('record-btn');
        const indicator = document.getElementById('recording-indicator');

        recordBtn.classList.remove('recording');
        recordBtn.textContent = '🎤 Houd ingedrukt om te spreken';
        indicator.classList.remove('active');

        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (e) {
                // Ignore errors when stopping
            }
        }
    },

    // Evaluate pronunciation
    evaluatePronunciation(spokenText) {
        const phrase = this.currentPhrases[this.currentIndex];
        if (!phrase) return;

        const expected = phrase.it.toLowerCase().replace(/[.,!?]/g, '');
        const spoken = spokenText.toLowerCase().replace(/[.,!?]/g, '');

        // Calculate similarity score
        const score = this.calculateSimilarity(expected, spoken);

        // Record progress
        const phraseId = `${this.currentCategory}_${this.currentIndex}`;
        Progress.recordSpeakingAttempt(phraseId, score);

        // Show feedback
        const feedback = Feedback.speakingFeedback(expected, spoken, score);
        this.showFeedback(feedback, score);
    },

    // Calculate similarity between two strings (0-100)
    calculateSimilarity(str1, str2) {
        if (str1 === str2) return 100;

        const len1 = str1.length;
        const len2 = str2.length;

        // Levenshtein distance
        const dp = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

        for (let i = 0; i <= len1; i++) dp[i][0] = i;
        for (let j = 0; j <= len2; j++) dp[0][j] = j;

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
            }
        }

        const distance = dp[len1][len2];
        const maxLen = Math.max(len1, len2);

        // Convert distance to percentage (0-100)
        return Math.max(0, Math.round((1 - distance / maxLen) * 100));
    },

    // Show feedback
    showFeedback(feedback, score) {
        const container = document.getElementById('speaking-feedback');
        if (!container) return;

        container.style.display = 'block';

        let className = 'feedback-panel ';
        if (score >= 80) {
            className += 'success';
        } else if (score >= 50) {
            className += 'warning';
        } else {
            className += 'error';
        }
        container.className = className;

        let icon, title;
        if (score >= 80) {
            icon = '✓';
            title = 'Uitstekend!';
        } else if (score >= 50) {
            icon = '👍';
            title = 'Goed geprobeerd!';
        } else {
            icon = '🔄';
            title = 'Probeer het nog eens';
        }

        container.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">${icon}</span>
                <span class="feedback-title">${title}</span>
            </div>
            <div class="feedback-content">
                <p class="pronunciation-score">Score: <span id="pronunciation-score">${score}</span>%</p>
                <p class="explanation">${feedback.explanation}</p>
                <p class="pronunciation-tip" id="pronunciation-tip">💡 ${feedback.tip}</p>
            </div>
        `;
    },

    // Move to next phrase
    nextPhrase() {
        this.currentIndex++;

        if (this.currentIndex >= this.currentPhrases.length) {
            this.currentIndex = 0; // Loop back to start
        }

        this.showCurrentPhrase();
    }
};

// Add CSS for speaking module
const speakingStyle = document.createElement('style');
speakingStyle.textContent = `
    .control-btn.playing {
        background: var(--primary-light);
        animation: pulse 1s infinite;
    }

    .mode-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .feedback-panel.warning {
        border-left-color: var(--warning-color);
        background: rgba(255, 152, 0, 0.05);
    }

    .recording-area {
        margin-top: 1.5rem;
    }
`;
document.head.appendChild(speakingStyle);

// Load voices when they become available
if (window.speechSynthesis) {
    speechSynthesis.onvoiceschanged = () => {
        // Voices are now available
    };
}

// Make Speaking globally available
window.Speaking = Speaking;
