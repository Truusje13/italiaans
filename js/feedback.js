// Feedback Module - Provides detailed explanations for mistakes

const Feedback = {
    // Generate feedback for vocabulary mistakes
    vocabularyFeedback(word, userAnswer, correct) {
        const feedback = {
            isCorrect: correct,
            correctAnswer: word.nl,
            explanation: '',
            tip: ''
        };

        if (correct) {
            feedback.explanation = 'Uitstekend! Je hebt het goede antwoord gegeven.';
            feedback.tip = this.getEncouragement();
        } else {
            feedback.explanation = this.generateVocabularyExplanation(word, userAnswer);
            feedback.tip = this.generateVocabularyTip(word);
        }

        return feedback;
    },

    // Generate explanation for vocabulary mistake
    generateVocabularyExplanation(word, userAnswer) {
        let explanation = `Het correcte antwoord is "${word.nl}".`;

        // Check if answer was close (typo)
        if (userAnswer && this.isSimilar(userAnswer.toLowerCase(), word.nl.toLowerCase())) {
            explanation += ' Je was er bijna! Let op de spelling.';
        }

        // Add note if available
        if (word.note) {
            explanation += ` Let op: ${word.note}`;
        }

        return explanation;
    },

    // Generate tip for vocabulary
    generateVocabularyTip(word) {
        const tips = [];

        // Article-based tips
        if (word.it.startsWith('il ')) {
            tips.push('Woorden met "il" zijn mannelijk.');
        } else if (word.it.startsWith('la ')) {
            tips.push('Woorden met "la" zijn vrouwelijk.');
        } else if (word.it.startsWith("l'")) {
            tips.push("Woorden met \"l'\" beginnen met een klinker. Check het woordenboek voor het geslacht.");
        } else if (word.it.startsWith('lo ')) {
            tips.push('Woorden met "lo" zijn mannelijk en beginnen met z, s+medeklinker, of speciale combinaties.');
        }

        // Word ending tips
        if (word.it.endsWith('o') && !word.it.includes(' ')) {
            tips.push('Woorden eindigend op -o zijn meestal mannelijk.');
        } else if (word.it.endsWith('a') && !word.it.includes(' ')) {
            tips.push('Woorden eindigend op -a zijn meestal vrouwelijk.');
        } else if (word.it.endsWith('e') && !word.it.includes(' ')) {
            tips.push('Woorden eindigend op -e kunnen mannelijk of vrouwelijk zijn - je moet ze uit je hoofd leren.');
        }

        // Mnemonic suggestions
        if (word.note) {
            tips.push(word.note);
        }

        return tips.length > 0 ? tips[Math.floor(Math.random() * tips.length)] :
            'Probeer het woord hardop uit te spreken om het beter te onthouden.';
    },

    // Generate feedback for grammar mistakes
    grammarFeedback(exercise, selectedIndex, correct) {
        const feedback = {
            isCorrect: correct,
            correctAnswer: exercise.options[exercise.correct],
            explanation: ''
        };

        if (correct) {
            feedback.explanation = 'Correct! ' + (exercise.explanation || 'Goed gedaan!');
        } else {
            feedback.explanation = exercise.explanation ||
                `Het correcte antwoord is "${exercise.options[exercise.correct]}".`;

            // Add why the selected answer was wrong if we can determine it
            const wrongAnswer = exercise.options[selectedIndex];
            const additionalInfo = this.getGrammarMistakeInfo(exercise, wrongAnswer);
            if (additionalInfo) {
                feedback.explanation += ' ' + additionalInfo;
            }
        }

        return feedback;
    },

    // Get additional info about grammar mistakes
    getGrammarMistakeInfo(exercise, wrongAnswer) {
        // Article mistakes
        if (exercise.question.includes('lidwoord')) {
            if (wrongAnswer === 'il' && exercise.options[exercise.correct] === 'lo') {
                return 'Gebruik "lo" voor woorden die beginnen met z, s+medeklinker, gn, ps, x of y.';
            }
            if (wrongAnswer === 'il' && exercise.options[exercise.correct] === "l'") {
                return 'Gebruik "l\'" voor mannelijke woorden die beginnen met een klinker.';
            }
            if (wrongAnswer === 'la' && exercise.options[exercise.correct] === "l'") {
                return 'Gebruik "l\'" ook voor vrouwelijke woorden die beginnen met een klinker.';
            }
            if (wrongAnswer === 'i' && exercise.options[exercise.correct] === 'gli') {
                return 'Gebruik "gli" voor meervoud van woorden met "lo" of "l\'" (mannelijk).';
            }
        }

        return null;
    },

    // Generate feedback for conjugation mistakes
    conjugationFeedback(verb, tense, person, userAnswer, correctAnswer, correct) {
        const feedback = {
            isCorrect: correct,
            correctAnswer: correctAnswer,
            explanation: '',
            conjugationTable: null
        };

        if (correct) {
            feedback.explanation = 'Perfect! Je hebt de juiste vervoeging gegeven.';
        } else {
            feedback.explanation = this.generateConjugationExplanation(verb, tense, person, userAnswer, correctAnswer);
            feedback.conjugationTable = this.getFullConjugation(verb, tense);
        }

        return feedback;
    },

    // Generate explanation for conjugation mistake
    generateConjugationExplanation(verb, tense, person, userAnswer, correctAnswer) {
        let explanation = `De correcte vervoeging is "${correctAnswer}".`;

        // Determine verb type
        const infinitive = verb.infinitive;
        let verbType = null;

        if (infinitive.endsWith('are')) verbType = 'are';
        else if (infinitive.endsWith('ere')) verbType = 'ere';
        else if (infinitive.endsWith('ire')) verbType = 'ire';

        // Check if it's an irregular verb
        const isIrregular = AppData.verbs.irregular.some(v => v.infinitive === infinitive);

        if (isIrregular) {
            explanation += ` Let op: "${infinitive}" is een onregelmatig werkwoord. De vervoegingen moet je uit je hoofd leren.`;
        } else if (verbType) {
            // Explain the pattern
            const patterns = AppData.verbs.patterns;
            const stem = infinitive.slice(0, -3);

            if (tense === 'presente') {
                const ending = patterns.presente[verbType][person];
                explanation += ` Voor -${verbType} werkwoorden in de tegenwoordige tijd: verwijder -${verbType} en voeg -${ending} toe voor "${person}".`;
                explanation += ` Dus: ${stem} + ${ending} = ${stem}${ending === 'iamo' ? verbType.charAt(0) + 'iamo' : ending}.`;
            } else if (tense === 'imperfetto') {
                const ending = patterns.imperfetto[verbType][person];
                explanation += ` Voor de imperfetto van -${verbType} werkwoorden: voeg -${ending} toe aan de stam.`;
            } else if (tense === 'futuro') {
                explanation += ` In de toekomende tijd krijgen alle werkwoorden dezelfde uitgangen: -ò, -ai, -à, -emo, -ete, -anno.`;
            }
        }

        // Check for common mistakes
        if (userAnswer) {
            if (userAnswer.toLowerCase() === infinitive.toLowerCase()) {
                explanation += ' Je hebt de infinitief geschreven in plaats van de vervoegde vorm.';
            } else if (this.isSimilar(userAnswer, correctAnswer)) {
                explanation += ' Je was er bijna! Let op de precieze spelling.';
            }
        }

        return explanation;
    },

    // Get full conjugation table for a verb in a tense
    getFullConjugation(verb, tense) {
        const conjugation = {};
        const persons = ['io', 'tu', 'lui', 'noi', 'voi', 'loro'];

        // Check if it's irregular and has this tense
        if (verb[tense]) {
            for (const person of persons) {
                conjugation[person] = verb[tense][person];
            }
        } else {
            // Regular verb - calculate conjugation
            const infinitive = verb.infinitive;
            let verbType = null;

            if (infinitive.endsWith('are')) verbType = 'are';
            else if (infinitive.endsWith('ere')) verbType = 'ere';
            else if (infinitive.endsWith('ire')) verbType = 'ire';

            if (verbType && AppData.verbs.patterns[tense]) {
                const stem = infinitive.slice(0, -3);
                const pattern = verb.isc && tense === 'presente' ?
                    AppData.verbs.patterns.presente.ire_isc :
                    AppData.verbs.patterns[tense][verbType];

                for (const person of persons) {
                    if (pattern && pattern[person]) {
                        conjugation[person] = stem + pattern[person];
                    }
                }
            }
        }

        return conjugation;
    },

    // Generate feedback for speaking/pronunciation
    speakingFeedback(expected, recognized, score) {
        const feedback = {
            score: score,
            explanation: '',
            tip: ''
        };

        if (score >= 90) {
            feedback.explanation = 'Uitstekend! Je uitspraak is heel goed!';
            feedback.tip = 'Blijf oefenen om dit niveau te behouden.';
        } else if (score >= 70) {
            feedback.explanation = 'Goed gedaan! Je uitspraak is redelijk goed.';
            feedback.tip = this.getPronunciationTip(expected, recognized);
        } else if (score >= 50) {
            feedback.explanation = 'Niet slecht, maar er is ruimte voor verbetering.';
            feedback.tip = this.getPronunciationTip(expected, recognized);
        } else {
            feedback.explanation = 'Probeer het nog eens. Luister eerst naar de uitspraak.';
            feedback.tip = 'Spreek langzamer en let goed op elke lettergreep.';
        }

        return feedback;
    },

    // Get pronunciation tip
    getPronunciationTip(expected, recognized) {
        const tips = [
            'Let op de klemtoon - in het Italiaans ligt de klemtoon vaak op de voorlaatste lettergreep.',
            'De Italiaanse "r" wordt gerold met de tongpunt.',
            'Dubbele medeklinkers worden langer uitgesproken: "palla" vs "pala".',
            'De letter "c" voor e/i klinkt als "tsj": "ciao" = "tsjao".',
            'De letter "g" voor e/i klinkt als "dzj": "gelato" = "dzjelato".',
            'De combinatie "gn" klinkt als "nj": "gnocchi" = "njokki".',
            'De combinatie "gl" voor i klinkt als "lj": "famiglia" = "familja".',
            'Probeer het woord in lettergrepen op te delen en elke lettergreep duidelijk uit te spreken.'
        ];

        return tips[Math.floor(Math.random() * tips.length)];
    },

    // Check if two strings are similar (for typo detection)
    isSimilar(str1, str2) {
        if (!str1 || !str2) return false;

        const distance = this.levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
        const maxLength = Math.max(str1.length, str2.length);

        // Consider similar if edit distance is less than 30% of string length
        return distance <= Math.ceil(maxLength * 0.3);
    },

    // Calculate Levenshtein distance between two strings
    levenshteinDistance(str1, str2) {
        const m = str1.length;
        const n = str2.length;
        const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j],     // deletion
                        dp[i][j - 1],     // insertion
                        dp[i - 1][j - 1]  // substitution
                    );
                }
            }
        }

        return dp[m][n];
    },

    // Get random encouragement message
    getEncouragement() {
        const messages = [
            'Ga zo door!',
            'Uitstekend werk!',
            'Je maakt goede voortgang!',
            'Bravo!',
            'Ottimo! (Uitstekend!)',
            'Perfetto!',
            'Je leert snel!',
            'Fantastisch!'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    },

    // Display feedback in the UI
    showFeedback(container, feedback, type = 'vocabulary') {
        if (!container) return;

        container.style.display = 'block';
        container.className = 'feedback-panel ' + (feedback.isCorrect ? 'success' : 'error');

        const icon = feedback.isCorrect ? '✓' : '✗';
        const title = feedback.isCorrect ? 'Correct!' : 'Helaas, dat is niet juist';

        let html = `
            <div class="feedback-header">
                <span class="feedback-icon">${icon}</span>
                <span class="feedback-title">${title}</span>
            </div>
            <div class="feedback-content">
                <p class="correct-answer">Antwoord: ${feedback.correctAnswer}</p>
                <p class="explanation">${feedback.explanation}</p>
        `;

        if (feedback.tip && !feedback.isCorrect) {
            html += `<p class="tip">💡 Tip: ${feedback.tip}</p>`;
        }

        if (feedback.conjugationTable) {
            html += '<div class="conjugation-table-mini"><table>';
            for (const [person, form] of Object.entries(feedback.conjugationTable)) {
                html += `<tr><td>${AppData.verbs.persons[person]}</td><td>${form}</td></tr>`;
            }
            html += '</table></div>';
        }

        html += '</div>';

        // Find or create next button
        let nextBtn = container.querySelector('.btn-primary');
        if (nextBtn) {
            html += `<button class="btn btn-primary">${nextBtn.textContent}</button>`;
        }

        container.innerHTML = html;
    }
};

// Make Feedback globally available
window.Feedback = Feedback;
