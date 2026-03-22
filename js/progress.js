// Progress Module - Handles saving and loading user progress via LocalStorage

const Progress = {
    STORAGE_KEY: 'italian_learning_progress',

    // Default progress structure
    defaultProgress: {
        xp: 0,
        level: 1,
        streak: 0,
        lastVisit: null,
        dailyXP: 0,
        dailyGoal: 50,

        vocabulary: {
            learned: [],           // Array of word IDs that have been learned
            mastered: [],          // Array of word IDs with high accuracy
            categoryProgress: {},  // Progress per category
            totalCorrect: 0,
            totalAttempts: 0
        },

        grammar: {
            completedTopics: [],   // Array of completed topic IDs
            topicProgress: {},     // Exercises completed per topic
            totalCorrect: 0,
            totalAttempts: 0
        },

        conjugation: {
            masteredVerbs: [],     // Verbs with high accuracy
            verbProgress: {},      // Progress per verb
            tenseProgress: {},     // Progress per tense
            totalCorrect: 0,
            totalAttempts: 0
        },

        speaking: {
            practiced: [],         // Phrases that have been practiced
            averageScore: 0,
            totalPracticed: 0
        },

        srs: {
            // wordId → { interval, easiness, repetitions, nextReview ('YYYY-MM-DD') }
            schedule: {}
        },

        dailyHistory: []  // Array of { date: 'YYYY-MM-DD', xp: N } (last 90 days)
    },

    // Initialize or load progress
    init() {
        let progress = this.load();
        if (!progress) {
            progress = JSON.parse(JSON.stringify(this.defaultProgress));
            this.save(progress);
        }
        this.checkStreak(progress);
        this.updateUI(progress);
        return progress;
    },

    // Load progress from LocalStorage
    load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.error('Error loading progress:', e);
        }
        return null;
    },

    // Save progress to LocalStorage
    save(progress) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
        } catch (e) {
            console.error('Error saving progress:', e);
        }
    },

    // Check and update streak
    checkStreak(progress) {
        const today = new Date().toDateString();
        const lastVisit = progress.lastVisit;

        if (lastVisit) {
            const lastDate = new Date(lastVisit);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                // Same day, do nothing
            } else if (diffDays === 1) {
                // Consecutive day, increment streak
                progress.streak++;
                progress.dailyXP = 0;
            } else {
                // Streak broken
                progress.streak = 1;
                progress.dailyXP = 0;
            }
        } else {
            // First visit
            progress.streak = 1;
        }

        progress.lastVisit = today;

        // Record daily history
        if (!progress.dailyHistory) progress.dailyHistory = [];
        const todayStr = new Date().toISOString().slice(0, 10);
        if (!progress.dailyHistory.find(d => d.date === todayStr)) {
            progress.dailyHistory.push({ date: todayStr, xp: 0 });
            // Keep only last 90 days
            if (progress.dailyHistory.length > 90) {
                progress.dailyHistory = progress.dailyHistory.slice(-90);
            }
        }

        this.save(progress);
    },

    // Add XP
    addXP(amount) {
        const progress = this.load();
        progress.xp += amount;
        progress.dailyXP += amount;

        // Level up every 100 XP
        const newLevel = Math.floor(progress.xp / 100) + 1;
        if (newLevel > progress.level) {
            progress.level = newLevel;
            this.showLevelUp(newLevel);
        }

        this.save(progress);
        this.updateUI(progress);
        return progress;
    },

    // Show level up notification
    showLevelUp(level) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <span class="level-up-icon">🎉</span>
                <span class="level-up-text">Level ${level} bereikt!</span>
            </div>
        `;
        document.body.appendChild(notification);

        // Remove after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    // Record vocabulary attempt
    recordVocabularyAttempt(wordId, category, correct) {
        const progress = this.load();

        progress.vocabulary.totalAttempts++;
        if (correct) {
            progress.vocabulary.totalCorrect++;

            // Track learned words
            if (!progress.vocabulary.learned.includes(wordId)) {
                progress.vocabulary.learned.push(wordId);
            }
        }

        // Track category progress
        if (!progress.vocabulary.categoryProgress[category]) {
            progress.vocabulary.categoryProgress[category] = { correct: 0, attempts: 0 };
        }
        progress.vocabulary.categoryProgress[category].attempts++;
        if (correct) {
            progress.vocabulary.categoryProgress[category].correct++;
        }

        // Update SRS schedule
        this.updateSRS(wordId, correct, progress);

        // Add XP
        const xpGained = correct ? 10 : 2;
        progress.xp += xpGained;
        progress.dailyXP += xpGained;

        // Update daily history XP
        if (!progress.dailyHistory) progress.dailyHistory = [];
        const todayStr = new Date().toISOString().slice(0, 10);
        const todayEntry = progress.dailyHistory.find(d => d.date === todayStr);
        if (todayEntry) todayEntry.xp += xpGained;

        this.save(progress);
        this.updateUI(progress);
        return xpGained;
    },

    // Record grammar attempt
    recordGrammarAttempt(topicId, correct) {
        const progress = this.load();

        progress.grammar.totalAttempts++;
        if (correct) {
            progress.grammar.totalCorrect++;
        }

        // Track topic progress
        if (!progress.grammar.topicProgress[topicId]) {
            progress.grammar.topicProgress[topicId] = { correct: 0, attempts: 0 };
        }
        progress.grammar.topicProgress[topicId].attempts++;
        if (correct) {
            progress.grammar.topicProgress[topicId].correct++;
        }

        // Mark topic as completed after 5 correct answers
        if (progress.grammar.topicProgress[topicId].correct >= 5 &&
            !progress.grammar.completedTopics.includes(topicId)) {
            progress.grammar.completedTopics.push(topicId);
        }

        // Add XP
        const xpGained = correct ? 15 : 3;
        progress.xp += xpGained;
        progress.dailyXP += xpGained;

        this.save(progress);
        this.updateUI(progress);
        return xpGained;
    },

    // Record conjugation attempt
    recordConjugationAttempt(verbInfinitive, tense, correct) {
        const progress = this.load();

        progress.conjugation.totalAttempts++;
        if (correct) {
            progress.conjugation.totalCorrect++;
        }

        // Track verb progress
        if (!progress.conjugation.verbProgress[verbInfinitive]) {
            progress.conjugation.verbProgress[verbInfinitive] = { correct: 0, attempts: 0 };
        }
        progress.conjugation.verbProgress[verbInfinitive].attempts++;
        if (correct) {
            progress.conjugation.verbProgress[verbInfinitive].correct++;
        }

        // Track tense progress
        if (!progress.conjugation.tenseProgress[tense]) {
            progress.conjugation.tenseProgress[tense] = { correct: 0, attempts: 0 };
        }
        progress.conjugation.tenseProgress[tense].attempts++;
        if (correct) {
            progress.conjugation.tenseProgress[tense].correct++;
        }

        // Mark verb as mastered after high accuracy
        const verbStats = progress.conjugation.verbProgress[verbInfinitive];
        if (verbStats.attempts >= 10 && (verbStats.correct / verbStats.attempts) >= 0.8) {
            if (!progress.conjugation.masteredVerbs.includes(verbInfinitive)) {
                progress.conjugation.masteredVerbs.push(verbInfinitive);
            }
        }

        // Add XP
        const xpGained = correct ? 12 : 2;
        progress.xp += xpGained;
        progress.dailyXP += xpGained;

        this.save(progress);
        this.updateUI(progress);
        return xpGained;
    },

    // Record speaking attempt
    recordSpeakingAttempt(phraseId, score) {
        const progress = this.load();

        if (!progress.speaking.practiced.includes(phraseId)) {
            progress.speaking.practiced.push(phraseId);
        }

        // Update average score
        const totalScore = progress.speaking.averageScore * progress.speaking.totalPracticed + score;
        progress.speaking.totalPracticed++;
        progress.speaking.averageScore = totalScore / progress.speaking.totalPracticed;

        // Add XP based on score
        const xpGained = Math.round(score / 10);
        progress.xp += xpGained;
        progress.dailyXP += xpGained;

        this.save(progress);
        this.updateUI(progress);
        return xpGained;
    },

    // Calculate vocabulary progress percentage
    getVocabularyProgress() {
        const progress = this.load();
        let totalWords = 0;

        // Count total words across all categories
        for (const category in AppData.vocabulary) {
            totalWords += AppData.vocabulary[category].words.length;
        }

        if (totalWords === 0) return 0;
        return Math.round((progress.vocabulary.learned.length / totalWords) * 100);
    },

    // Calculate grammar progress percentage
    getGrammarProgress() {
        const progress = this.load();
        const totalTopics = AppData.grammar.length;

        if (totalTopics === 0) return 0;
        return Math.round((progress.grammar.completedTopics.length / totalTopics) * 100);
    },

    // Calculate conjugation progress percentage
    getConjugationProgress() {
        const progress = this.load();
        let totalVerbs = AppData.verbs.irregular.length;

        for (const type in AppData.verbs.regular) {
            totalVerbs += AppData.verbs.regular[type].length;
        }

        if (totalVerbs === 0) return 0;
        return Math.round((progress.conjugation.masteredVerbs.length / totalVerbs) * 100);
    },

    // Calculate speaking progress percentage
    getSpeakingProgress() {
        const progress = this.load();
        let totalPhrases = 0;

        for (const category in AppData.speaking) {
            totalPhrases += AppData.speaking[category].length;
        }

        if (totalPhrases === 0) return 0;
        return Math.round((progress.speaking.practiced.length / totalPhrases) * 100);
    },

    // Update all UI elements showing progress
    updateUI(progress) {
        if (!progress) progress = this.load();

        // Update XP and streak in sidebar
        const totalXpEl = document.getElementById('total-xp');
        const streakEl = document.getElementById('streak-days');

        if (totalXpEl) totalXpEl.textContent = progress.xp;
        if (streakEl) streakEl.textContent = progress.streak;

        // Update progress badges
        const vocabProgress = this.getVocabularyProgress();
        const grammarProgress = this.getGrammarProgress();
        const conjugationProgress = this.getConjugationProgress();
        const speakingProgress = this.getSpeakingProgress();

        const vocabBadge = document.getElementById('vocab-progress');
        const grammarBadge = document.getElementById('grammar-progress');
        const conjugationBadge = document.getElementById('conjugation-progress');
        const speakingBadge = document.getElementById('speaking-progress');

        if (vocabBadge) vocabBadge.textContent = vocabProgress + '%';
        if (grammarBadge) grammarBadge.textContent = grammarProgress + '%';
        if (conjugationBadge) conjugationBadge.textContent = conjugationProgress + '%';
        if (speakingBadge) speakingBadge.textContent = speakingProgress + '%';

        // Update home page stats
        const homeVocab = document.getElementById('home-vocab-learned');
        const homeGrammar = document.getElementById('home-grammar-completed');
        const homeVerbs = document.getElementById('home-verbs-mastered');
        const homeSpeaking = document.getElementById('home-speaking-score');

        if (homeVocab) homeVocab.textContent = progress.vocabulary.learned.length;
        if (homeGrammar) homeGrammar.textContent = progress.grammar.completedTopics.length;
        if (homeVerbs) homeVerbs.textContent = progress.conjugation.masteredVerbs.length;
        if (homeSpeaking) homeSpeaking.textContent = Math.round(progress.speaking.averageScore) + '%';

        // Update daily goal
        const dailyGoalFill = document.getElementById('daily-goal-fill');
        const dailyGoalText = document.getElementById('daily-goal-text');

        if (dailyGoalFill) {
            const percentage = Math.min((progress.dailyXP / progress.dailyGoal) * 100, 100);
            dailyGoalFill.style.width = percentage + '%';
        }
        if (dailyGoalText) {
            dailyGoalText.textContent = `${progress.dailyXP} / ${progress.dailyGoal} XP`;
        }
    },

    // Get statistics for a specific category
    getCategoryStats(category) {
        const progress = this.load();
        const catProgress = progress.vocabulary.categoryProgress[category];

        if (!catProgress) {
            return { correct: 0, attempts: 0, accuracy: 0 };
        }

        return {
            correct: catProgress.correct,
            attempts: catProgress.attempts,
            accuracy: catProgress.attempts > 0 ? Math.round((catProgress.correct / catProgress.attempts) * 100) : 0
        };
    },

    // Update SRS schedule for a word (simplified SM-2)
    updateSRS(wordId, correct, progress) {
        if (!progress) progress = this.load();
        if (!progress.srs) progress.srs = { schedule: {} };

        const today = new Date().toISOString().slice(0, 10);
        let entry = progress.srs.schedule[wordId] || { interval: 1, easiness: 2.5, repetitions: 0, nextReview: today };

        if (correct) {
            entry.repetitions++;
            entry.interval = entry.repetitions === 1 ? 1 : Math.round(entry.interval * entry.easiness);
            entry.easiness = Math.min(3.5, entry.easiness + 0.1);
        } else {
            entry.repetitions = 0;
            entry.interval = 1;
            entry.easiness = Math.max(1.3, entry.easiness - 0.2);
        }

        const next = new Date();
        next.setDate(next.getDate() + entry.interval);
        entry.nextReview = next.toISOString().slice(0, 10);
        progress.srs.schedule[wordId] = entry;
        // Note: caller must save(progress) after this
    },

    // Get words due for review in a category
    getDueWords(categoryKey, words) {
        const progress = this.load();
        if (!progress.srs) return { due: [], other: words };
        const today = new Date().toISOString().slice(0, 10);
        const due = [];
        const other = [];
        words.forEach((word, idx) => {
            const wordId = `${categoryKey}_${idx}`;
            const entry = progress.srs.schedule[wordId];
            if (!entry || entry.nextReview <= today) {
                due.push(word);
            } else {
                other.push(word);
            }
        });
        return { due, other };
    },

    // Count total due words across all categories
    getTotalDueCount() {
        const progress = this.load();
        if (!progress.srs) return 0;
        const today = new Date().toISOString().slice(0, 10);
        let count = 0;
        for (const [key, cat] of Object.entries(AppData.vocabulary)) {
            cat.words.forEach((word, idx) => {
                const wordId = `${key}_${idx}`;
                const entry = progress.srs.schedule[wordId];
                if (entry && entry.nextReview <= today && progress.vocabulary.learned.includes(wordId)) {
                    count++;
                }
            });
        }
        return count;
    },

    // Count due words for a specific category
    getCategoryDueCount(categoryKey) {
        const progress = this.load();
        if (!progress.srs) return 0;
        const today = new Date().toISOString().slice(0, 10);
        const cat = AppData.vocabulary[categoryKey];
        if (!cat) return 0;
        let count = 0;
        cat.words.forEach((word, idx) => {
            const wordId = `${categoryKey}_${idx}`;
            const entry = progress.srs.schedule[wordId];
            if (entry && entry.nextReview <= today && progress.vocabulary.learned.includes(wordId)) {
                count++;
            }
        });
        return count;
    },

    // Get last 30 days as array of { date, xp, active }
    getLast30Days() {
        const progress = this.load();
        const history = progress.dailyHistory || [];
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().slice(0, 10);
            const entry = history.find(h => h.date === dateStr);
            days.push({ date: dateStr, xp: entry ? entry.xp : 0, active: !!entry });
        }
        return days;
    },

    // Reset all progress (for testing or user request)
    reset() {
        const defaultProgress = JSON.parse(JSON.stringify(this.defaultProgress));
        this.save(defaultProgress);
        this.updateUI(defaultProgress);
        return defaultProgress;
    }
};

// Add CSS for level up notification
const style = document.createElement('style');
style.textContent = `
    .level-up-notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        animation: slideDown 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
    }

    .level-up-content {
        background: linear-gradient(135deg, #ff9800, #ff5722);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 4px 20px rgba(255, 152, 0, 0.4);
        font-weight: 600;
        font-size: 1.1rem;
    }

    .level-up-icon {
        font-size: 1.5rem;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Make Progress globally available
window.Progress = Progress;
