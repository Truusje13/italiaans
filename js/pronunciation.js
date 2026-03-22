// Pronunciation Guide Module

const PronunciationRules = [
    {
        id: "c-soft",
        title: "C vóór E en I — zachte klank",
        symbol: "/tʃ/",
        description: "C vóór <strong>e</strong> of <strong>i</strong> klinkt als het Nederlandse <em>\"tsj\"</em> (zoals in \"church\").",
        examples: [
            { it: "ciao", nl: "hallo", pronounce: "tsja-o" },
            { it: "cinema", nl: "bioscoop", pronounce: "tsji-ne-ma" },
            { it: "cena", nl: "avondeten", pronounce: "tsje-na" }
        ]
    },
    {
        id: "c-hard",
        title: "C vóór A, O en U — harde klank",
        symbol: "/k/",
        description: "C vóór <strong>a</strong>, <strong>o</strong> of <strong>u</strong> klinkt als de gewone Nederlandse <em>\"k\"</em>.",
        examples: [
            { it: "casa", nl: "huis", pronounce: "ka-za" },
            { it: "cosa", nl: "ding/wat", pronounce: "ko-za" },
            { it: "cucina", nl: "keuken", pronounce: "ku-tsji-na" }
        ]
    },
    {
        id: "g-soft",
        title: "G vóór E en I — zachte klank",
        symbol: "/dʒ/",
        description: "G vóór <strong>e</strong> of <strong>i</strong> klinkt als het Nederlandse <em>\"dzj\"</em> (zoals in \"journal\").",
        examples: [
            { it: "gelato", nl: "ijs", pronounce: "dzje-la-to" },
            { it: "giro", nl: "ronde/tocht", pronounce: "dzji-ro" },
            { it: "gente", nl: "mensen", pronounce: "dzjen-te" }
        ]
    },
    {
        id: "g-hard",
        title: "G vóór A, O en U — harde klank",
        symbol: "/g/",
        description: "G vóór <strong>a</strong>, <strong>o</strong> of <strong>u</strong> klinkt als de gewone Nederlandse <em>\"g\"</em> (zachte g).",
        examples: [
            { it: "gatto", nl: "kat", pronounce: "gat-to" },
            { it: "gonna", nl: "rok", pronounce: "gon-na" },
            { it: "gusto", nl: "smaak", pronounce: "gus-to" }
        ]
    },
    {
        id: "gn",
        title: "GN — neusklank",
        symbol: "/ɲ/",
        description: "De combinatie <strong>gn</strong> klinkt als het Nederlandse <em>\"nj\"</em> (zoals in \"oranje\").",
        examples: [
            { it: "bagno", nl: "badkamer", pronounce: "ban-jo" },
            { it: "agnello", nl: "lam", pronounce: "an-jel-lo" },
            { it: "cognome", nl: "achternaam", pronounce: "kon-jo-me" }
        ]
    },
    {
        id: "gli",
        title: "GLI — palatale L",
        symbol: "/ʎ/",
        description: "De combinatie <strong>gli</strong> klinkt als een zachte <em>\"lj\"</em> (zoals in \"familie\").",
        examples: [
            { it: "figlio", nl: "zoon", pronounce: "fil-jo" },
            { it: "famiglia", nl: "familie", pronounce: "fa-mil-ja" },
            { it: "aglio", nl: "knoflook", pronounce: "al-jo" }
        ]
    },
    {
        id: "sc-soft",
        title: "SC vóór E en I — zachte klank",
        symbol: "/ʃ/",
        description: "SC vóór <strong>e</strong> of <strong>i</strong> klinkt als het Nederlandse <em>\"sj\"</em> (zoals in \"show\").",
        examples: [
            { it: "scena", nl: "scène", pronounce: "sje-na" },
            { it: "sci", nl: "ski", pronounce: "sji" },
            { it: "uscita", nl: "uitgang", pronounce: "u-sji-ta" }
        ]
    },
    {
        id: "sc-hard",
        title: "SC vóór A, O en U — harde klank",
        symbol: "/sk/",
        description: "SC vóór <strong>a</strong>, <strong>o</strong> of <strong>u</strong> klinkt als het Nederlandse <em>\"sk\"</em>.",
        examples: [
            { it: "scala", nl: "trap/ladder", pronounce: "ska-la" },
            { it: "scuola", nl: "school", pronounce: "skwo-la" },
            { it: "sconto", nl: "korting", pronounce: "skon-to" }
        ]
    },
    {
        id: "double-consonant",
        title: "Dubbele medeklinkers",
        symbol: "✗✓",
        description: "Dubbele medeklinkers worden verlengd uitgesproken. Het verschil is belangrijk: <strong>pala</strong> (schop) ≠ <strong>palla</strong> (bal).",
        examples: [
            { it: "cappello", nl: "hoed (dubbel-p)", pronounce: "kap-pel-lo" },
            { it: "capello", nl: "haar (enkel-p)", pronounce: "ka-pel-lo" },
            { it: "nonno", nl: "opa (dubbel-n)", pronounce: "non-no" }
        ]
    },
    {
        id: "h-silent",
        title: "H — stille letter",
        symbol: "∅",
        description: "De letter <strong>h</strong> is altijd stil in het Italiaans. Maar het verandert de uitspraak van C en G: <em>chi</em> = \"ki\", <em>che</em> = \"ke\", <em>ghi</em> = \"gi\".",
        examples: [
            { it: "ho", nl: "ik heb (stil h)", pronounce: "o" },
            { it: "chi", nl: "wie (klinkt als ki)", pronounce: "ki" },
            { it: "spaghetti", nl: "spaghetti (stil h)", pronounce: "spa-get-ti" }
        ]
    }
];

const Pronunciation = {
    init() {
        this.render();
    },

    render() {
        const container = document.getElementById('pronunciation-rules');
        if (!container) return;

        container.innerHTML = PronunciationRules.map(rule => `
            <div class="pron-rule" id="pron-${rule.id}">
                <button class="pron-rule-header" data-rule="${rule.id}">
                    <span class="pron-symbol">${rule.symbol}</span>
                    <span class="pron-title">${rule.title}</span>
                    <span class="pron-chevron">▼</span>
                </button>
                <div class="pron-rule-body" style="display:none;">
                    <p class="pron-description">${rule.description}</p>
                    <div class="pron-examples">
                        ${rule.examples.map(ex => `
                            <div class="pron-example">
                                <button class="pron-speak-btn" data-word="${ex.it}" title="Uitspreken">🔊</button>
                                <span class="pron-italian">${ex.it}</span>
                                <span class="pron-phonetic">[${ex.pronounce}]</span>
                                <span class="pron-dutch">= ${ex.nl}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Event delegation for headers and speak buttons
        container.addEventListener('click', (e) => {
            const header = e.target.closest('.pron-rule-header');
            if (header) {
                const body = header.nextElementSibling;
                const chevron = header.querySelector('.pron-chevron');
                const isOpen = body.style.display !== 'none';
                body.style.display = isOpen ? 'none' : 'block';
                chevron.textContent = isOpen ? '▼' : '▲';
                return;
            }
            const speakBtn = e.target.closest('.pron-speak-btn');
            if (speakBtn) {
                this.speak(speakBtn.dataset.word);
            }
        });
    },

    speak(text) {
        if (!window.speechSynthesis) return;
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'it-IT';
        utterance.rate = 0.7;
        const voices = speechSynthesis.getVoices();
        const italianVoice = voices.find(v => v.lang.startsWith('it'));
        if (italianVoice) utterance.voice = italianVoice;
        speechSynthesis.speak(utterance);
    }
};

window.Pronunciation = Pronunciation;
