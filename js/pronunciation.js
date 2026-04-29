// Pronunciation Guide Module

const PronunciationRules = [
    {
        id: "c-soft",
        title: "C + E/I",
        symbol: "/tʃ/",
        tip: "klinkt als <em>\"tsj\"</em>",
        examples: [
            { it: "ciao", nl: "hallo", pronounce: "tsja-o" },
            { it: "cinema", nl: "bioscoop", pronounce: "tsji-ne-ma" },
            { it: "cena", nl: "avondeten", pronounce: "tsje-na" }
        ]
    },
    {
        id: "c-hard",
        title: "C + A/O/U",
        symbol: "/k/",
        tip: "klinkt als <em>\"k\"</em>",
        examples: [
            { it: "casa", nl: "huis", pronounce: "ka-za" },
            { it: "cosa", nl: "ding/wat", pronounce: "ko-za" },
            { it: "cucina", nl: "keuken", pronounce: "ku-tsji-na" }
        ]
    },
    {
        id: "g-soft",
        title: "G + E/I",
        symbol: "/dʒ/",
        tip: "klinkt als <em>\"dzj\"</em>",
        examples: [
            { it: "gelato", nl: "ijs", pronounce: "dzje-la-to" },
            { it: "giro", nl: "ronde", pronounce: "dzji-ro" },
            { it: "gente", nl: "mensen", pronounce: "dzjen-te" }
        ]
    },
    {
        id: "g-hard",
        title: "G + A/O/U",
        symbol: "/g/",
        tip: "klinkt als gewone <em>\"g\"</em>",
        examples: [
            { it: "gatto", nl: "kat", pronounce: "gat-to" },
            { it: "gonna", nl: "rok", pronounce: "gon-na" },
            { it: "gusto", nl: "smaak", pronounce: "gus-to" }
        ]
    },
    {
        id: "gn",
        title: "GN",
        symbol: "/ɲ/",
        tip: "klinkt als <em>\"nj\"</em>",
        examples: [
            { it: "bagno", nl: "badkamer", pronounce: "ban-jo" },
            { it: "agnello", nl: "lam", pronounce: "an-jel-lo" },
            { it: "cognome", nl: "achternaam", pronounce: "kon-jo-me" }
        ]
    },
    {
        id: "gli",
        title: "GLI",
        symbol: "/ʎ/",
        tip: "klinkt als zachte <em>\"lj\"</em>",
        examples: [
            { it: "figlio", nl: "zoon", pronounce: "fil-jo" },
            { it: "famiglia", nl: "familie", pronounce: "fa-mil-ja" },
            { it: "aglio", nl: "knoflook", pronounce: "al-jo" }
        ]
    },
    {
        id: "sc-soft",
        title: "SC + E/I",
        symbol: "/ʃ/",
        tip: "klinkt als <em>\"sj\"</em>",
        examples: [
            { it: "scena", nl: "scène", pronounce: "sje-na" },
            { it: "sci", nl: "ski", pronounce: "sji" },
            { it: "uscita", nl: "uitgang", pronounce: "u-sji-ta" }
        ]
    },
    {
        id: "sc-hard",
        title: "SC + A/O/U",
        symbol: "/sk/",
        tip: "klinkt als <em>\"sk\"</em>",
        examples: [
            { it: "scala", nl: "trap", pronounce: "ska-la" },
            { it: "scuola", nl: "school", pronounce: "skwo-la" },
            { it: "sconto", nl: "korting", pronounce: "skon-to" }
        ]
    },
    {
        id: "double-consonant",
        title: "Dubbele medeklinker",
        symbol: "✗✓",
        tip: "verlengd uitgesproken — betekenisverschil!",
        examples: [
            { it: "palla", nl: "bal", pronounce: "pal-la" },
            { it: "pala", nl: "schop", pronounce: "pa-la" },
            { it: "nonno", nl: "opa", pronounce: "non-no" }
        ]
    },
    {
        id: "h-silent",
        title: "H (stille letter)",
        symbol: "∅",
        tip: "altijd stil — verandert C/G: <em>chi=ki, ghi=gi</em>",
        examples: [
            { it: "ho", nl: "ik heb", pronounce: "o" },
            { it: "chi", nl: "wie", pronounce: "ki" },
            { it: "spaghetti", nl: "spaghetti", pronounce: "spa-get-ti" }
        ]
    }
];

// Group pronunciation rules
const PRON_GROUPS = [
    {
        label: '🔤 C & G klanken',
        ids: ['c-soft', 'c-hard', 'g-soft', 'g-hard']
    },
    {
        label: '🔗 Letterverbindingen',
        ids: ['gn', 'gli', 'sc-soft', 'sc-hard']
    },
    {
        label: '✨ Bijzonderheden',
        ids: ['double-consonant', 'h-silent']
    }
];

const Pronunciation = {
    init() {
        this.render();
    },

    render() {
        const container = document.getElementById('pronunciation-rules');
        if (!container) return;

        const ruleMap = Object.fromEntries(PronunciationRules.map(r => [r.id, r]));

        container.innerHTML = PRON_GROUPS.map(group => {
            const rules = group.ids.map(id => ruleMap[id]).filter(Boolean);
            const cards = rules.map(rule => `
                <div class="pron-card">
                    <div class="pron-card-head">
                        <span class="pron-badge">${rule.symbol}</span>
                        <span class="pron-card-title">${rule.title}</span>
                    </div>
                    <p class="pron-card-tip">${rule.tip}</p>
                    <div class="pron-card-examples">
                        ${rule.examples.map(ex => `
                            <div class="pron-ex-row">
                                <button class="pron-speak-btn" data-word="${ex.it}" title="Uitspreken">🔊</button>
                                <strong class="pron-italian">${ex.it}</strong>
                                <span class="pron-phonetic">[${ex.pronounce}]</span>
                                <span class="pron-dutch">${ex.nl}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');

            return `
                <div class="pron-group">
                    <button class="pron-group-header" aria-expanded="false">
                        <span class="pron-group-label">${group.label}</span>
                        <span class="pron-chevron">▼</span>
                    </button>
                    <div class="pron-cards-grid" hidden>${cards}</div>
                </div>
            `;
        }).join('');

        // Toggle accordion + speak button handler
        container.addEventListener('click', (e) => {
            const header = e.target.closest('.pron-group-header');
            if (header) {
                const grid = header.nextElementSibling;
                const chevron = header.querySelector('.pron-chevron');
                const isOpen = !grid.hidden;
                grid.hidden = isOpen;
                header.setAttribute('aria-expanded', String(!isOpen));
                chevron.textContent = isOpen ? '▼' : '▲';
                return;
            }
            const btn = e.target.closest('.pron-speak-btn');
            if (btn) this.speak(btn.dataset.word);
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

// ─── CSS ────────────────────────────────────────────────────────────
const pronStyle = document.createElement('style');
pronStyle.textContent = `
    .pron-group {
        margin-bottom: 1.1rem;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e0e0e0;
    }

    .pron-group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0.6rem 1rem;
        background: var(--secondary-color, #1565c0);
        color: white;
        font-weight: 700;
        font-size: 0.88rem;
        border: none;
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        transition: filter 0.15s;
    }

    .pron-group-header:hover {
        filter: brightness(1.12);
    }

    .pron-group-label {
        flex: 1;
    }

    .pron-chevron {
        font-size: 0.75rem;
        opacity: 0.85;
    }

    .pron-cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        background: var(--card-background);
    }

    .pron-card {
        padding: 0.75rem 0.9rem;
        border-top: 1px solid #f0f0f0;
        border-right: 1px solid #f0f0f0;
    }

    .pron-card:nth-child(odd):last-child {
        border-right: none;
    }

    .pron-card-head {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        margin-bottom: 0.25rem;
    }

    .pron-badge {
        font-size: 0.7rem;
        font-weight: 700;
        background: var(--secondary-color, #1565c0);
        color: white;
        border-radius: 4px;
        padding: 0.1rem 0.4rem;
        flex-shrink: 0;
        font-family: monospace;
        letter-spacing: 0.02em;
    }

    .pron-card-title {
        font-weight: 700;
        font-size: 0.85rem;
        color: var(--text-primary);
    }

    .pron-card-tip {
        font-size: 0.77rem;
        color: var(--text-secondary);
        margin-bottom: 0.45rem;
        line-height: 1.35;
    }

    .pron-card-examples {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .pron-ex-row {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.8rem;
    }

    .pron-speak-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        padding: 0;
        flex-shrink: 0;
        line-height: 1;
    }

    .pron-italian {
        font-weight: 700;
        color: var(--primary-color);
        font-size: 0.85rem;
    }

    .pron-phonetic {
        color: #888;
        font-size: 0.78rem;
        font-style: italic;
    }

    .pron-dutch {
        color: var(--text-secondary);
        font-size: 0.78rem;
        margin-left: auto;
    }

    /* Dark mode */
    body.dark-mode .pron-group {
        border-color: #333;
    }
    body.dark-mode .pron-card {
        border-top-color: #2a2a2a;
        border-right-color: #2a2a2a;
    }
    body.dark-mode .pron-phonetic {
        color: #666;
    }
`;
document.head.appendChild(pronStyle);

window.Pronunciation = Pronunciation;
