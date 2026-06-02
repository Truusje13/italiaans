#!/usr/bin/env node
/**
 * apply-batch.js — Past de volgende ongepubliceerde content-batch toe op data.js
 *
 * Gebruik:
 *   node content-batches/apply-batch.js
 *   node content-batches/apply-batch.js --batch 3   (specifieke batch)
 *   node content-batches/apply-batch.js --dry-run   (toon wat er zou veranderen)
 *
 * Het script:
 *   1. Leest alle batch-XX.json bestanden
 *   2. Bepaalt welke nog niet zijn toegepast (via applied-batches.json)
 *   3. Voegt vocab-categorie, grammar-topic en werkwoorden toe aan data.js
 *   4. Verhoogt versienummers (data.js, index.html, sw.js)
 *   5. Slaat de batch op als 'toegepast'
 */

const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..');
const DATA_FILE  = path.join(ROOT, 'js', 'data.js');
const INDEX_FILE = path.join(ROOT, 'index.html');
const SW_FILE    = path.join(ROOT, 'sw.js');
const APPLIED    = path.join(__dirname, 'applied-batches.json');
const BATCHES_DIR = __dirname;

// ── Argumenten ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const dryRun    = args.includes('--dry-run');
const batchArg  = args.includes('--batch') ? parseInt(args[args.indexOf('--batch') + 1]) : null;

// ── Hulpfuncties ────────────────────────────────────────────────────────────
function readApplied() {
    if (!fs.existsSync(APPLIED)) return [];
    return JSON.parse(fs.readFileSync(APPLIED, 'utf8'));
}

function writeApplied(list) {
    fs.writeFileSync(APPLIED, JSON.stringify(list, null, 2));
}

function bumpVersion(str, regex, prefix) {
    return str.replace(regex, (m, v) => `${prefix}${parseInt(v) + 1}`);
}

// ── Vind de volgende batch ──────────────────────────────────────────────────
const applied = readApplied();
const allBatches = fs.readdirSync(BATCHES_DIR)
    .filter(f => /^batch-\d+\.json$/.test(f))
    .sort()
    .map(f => JSON.parse(fs.readFileSync(path.join(BATCHES_DIR, f), 'utf8')));

let batch;
if (batchArg) {
    batch = allBatches.find(b => b.batch === batchArg);
    if (!batch) { console.error(`Batch ${batchArg} niet gevonden.`); process.exit(1); }
} else {
    batch = allBatches.find(b => !applied.includes(b.batch));
    if (!batch) { console.log('Alle batches zijn al toegepast!'); process.exit(0); }
}

console.log(`\n📦 Batch ${batch.batch}: ${batch.description}`);
console.log(`📅 Gepland voor: ${batch.scheduledDate}`);
if (dryRun) console.log('🔍 DRY RUN — geen bestanden worden aangepast\n');

// ── Lees data.js ────────────────────────────────────────────────────────────
let data = fs.readFileSync(DATA_FILE, 'utf8');

// ── 1. Vocabulaire toevoegen ─────────────────────────────────────────────────
if (batch.vocabulary) {
    const { key, data: catData } = batch.vocabulary;
    if (data.includes(`${key}:`)) {
        console.log(`⚠️  Vocabulaire-categorie '${key}' bestaat al — overgeslagen.`);
    } else {
        const wordsJson = JSON.stringify(catData.words, null, 16)
            .replace(/^\[/, '')
            .replace(/\]$/, '')
            .trim()
            .split('\n')
            .map(l => '                ' + l)
            .join('\n');

        const newCat = `
        ${key}: {
            name: ${JSON.stringify(catData.name)},
            icon: ${JSON.stringify(catData.icon)},
            words: [
${wordsJson}
            ]
        },`;

        // Voeg toe vóór de sluiting van het vocabulary-object
        // Zoek de laatste categorie-sluiting vóór "verbs:"
        const insertPos = data.lastIndexOf('\n    },\n\n    // Grammar');
        if (insertPos === -1) {
            console.error('❌ Kan invoegpunt voor vocabulary niet vinden!');
            process.exit(1);
        }
        data = data.slice(0, insertPos) + newCat + data.slice(insertPos);
        console.log(`✅ Vocabulaire '${catData.name}' (${catData.words.length} woorden) toegevoegd.`);
    }
}

// ── 2. Grammatica-topic toevoegen ────────────────────────────────────────────
if (batch.grammar) {
    const g = batch.grammar;
    if (data.includes(`id: "${g.id}"`)) {
        console.log(`⚠️  Grammar-topic '${g.id}' bestaat al — overgeslagen.`);
    } else {
        const exJson = g.exercises.map(ex => `            {
                question: ${JSON.stringify(ex.question)},
                options: ${JSON.stringify(ex.options)},
                correct: ${ex.correct},
                explanation: ${JSON.stringify(ex.explanation)}
            }`).join(',\n');

        const newTopic = `
        {
            id: "${g.id}",
            topic: ${JSON.stringify(g.topic)},
            summary: ${JSON.stringify(g.summary)},
            level: ${g.level || 2},
            explanation: \`${g.explanation}\`,
            examples: ${JSON.stringify(g.examples, null, 16)},
            exercises: [
${exJson}
            ]
        },`;

        // Voeg toe aan het einde van de grammar-array, vóór de sluitende ]
        const grammarEnd = data.lastIndexOf('\n    ],\n\n    verbs:');
        if (grammarEnd === -1) {
            console.error('❌ Kan invoegpunt voor grammar niet vinden!');
            process.exit(1);
        }
        data = data.slice(0, grammarEnd) + newTopic + data.slice(grammarEnd);
        console.log(`✅ Grammar-topic '${g.topic}' toegevoegd.`);
    }
}

// ── 3. Werkwoorden toevoegen ─────────────────────────────────────────────────
if (batch.verbs && batch.verbs.irregular) {
    for (const verb of batch.verbs.irregular) {
        if (data.includes(`infinitive: "${verb.infinitive}"`)) {
            console.log(`⚠️  Werkwoord '${verb.infinitive}' bestaat al — overgeslagen.`);
            continue;
        }
        const noteStr = verb.note ? `\n                note: ${JSON.stringify(verb.note)},` : '';
        const newVerb = `
            {
                infinitive: "${verb.infinitive}",
                meaning: "${verb.meaning}",
                level: ${verb.level},${noteStr}
                presente: ${JSON.stringify(verb.presente)},
                passatoProssimo: ${JSON.stringify(verb.passatoProssimo)},
                imperfetto: ${JSON.stringify(verb.imperfetto)},
                futuro: ${JSON.stringify(verb.futuro)},
                condizionale: ${JSON.stringify(verb.condizionale)}
            },`;

        // Voeg toe aan het einde van irregular-array, vóór de laatste }
        const irrEnd = data.lastIndexOf('\n        ],\n        // Conjugation patterns');
        if (irrEnd === -1) {
            // Alternatief invoegpunt
            const irrEnd2 = data.lastIndexOf('\n        ]\n    },\n    // Grammar') ;
            if (irrEnd2 === -1) {
                console.error(`❌ Kan invoegpunt voor werkwoord '${verb.infinitive}' niet vinden!`);
                continue;
            }
            data = data.slice(0, irrEnd2) + newVerb + data.slice(irrEnd2);
        } else {
            data = data.slice(0, irrEnd) + newVerb + data.slice(irrEnd);
        }
        console.log(`✅ Werkwoord '${verb.infinitive}' (${verb.meaning}) toegevoegd.`);
    }
}

if (dryRun) {
    console.log('\n🔍 Dry run klaar — data.js NIET opgeslagen.');
    process.exit(0);
}

// ── 4. Versienummers verhogen ────────────────────────────────────────────────
// data.js versie in index.html
let index = fs.readFileSync(INDEX_FILE, 'utf8');
index = index.replace(/(data\.js\?v=)(\d+)/, (m, p, v) => `${p}${parseInt(v) + 1}`);

// data.js versie in sw.js
let sw = fs.readFileSync(SW_FILE, 'utf8');
sw = sw.replace(/(data\.js\?v=)(\d+)/, (m, p, v) => `${p}${parseInt(v) + 1}`);

// Cache-versie in sw.js
sw = sw.replace(/(impara-italiano-v)(\d+)/, (m, p, v) => `${p}${parseInt(v) + 1}`);

// ── 5. Bestanden opslaan ─────────────────────────────────────────────────────
fs.writeFileSync(DATA_FILE, data, 'utf8');
fs.writeFileSync(INDEX_FILE, index, 'utf8');
fs.writeFileSync(SW_FILE, sw, 'utf8');

// ── 6. Markeer batch als toegepast ───────────────────────────────────────────
applied.push(batch.batch);
writeApplied(applied);

console.log(`\n🎉 Batch ${batch.batch} succesvol toegepast!`);
console.log('📝 Vergeet niet: git add -A && git commit -m "Batch ' + batch.batch + ': ' + batch.description + '" && git push');
