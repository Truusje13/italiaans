# Content Batches — Impara l'Italiano

Tweewekelijks geplande content-updates voor de app.
Elke batch voegt toe: ~27 woordenschatwoorden + 1 grammaticatopic + 3 werkwoorden.

## Schema

| Batch | Datum       | Woordenschat              | Grammatica                      | Werkwoorden                        |
|-------|-------------|---------------------------|---------------------------------|------------------------------------|
| 1     | 2026-06-16  | 🍝 Cucina italiana (28w)  | De toekomende tijd (futuro)     | scendere, vincere, aggiungere      |
| 2     | 2026-06-30  | 🏙️ Città & Quartiere (28w) | Indirecte objectpronomen        | spingere, comprendere, crescere    |
| 3     | 2026-07-14  | 😊 Carattere & Personalità (27w) | Congiuntivo presente      | dipingere, condurre, proporre      |
| 4     | 2026-07-28  | 🌱 Ambiente & Sostenibilità (27w) | Het gerundium            | proteggere, cuocere, assumere      |
| 5     | 2026-08-11  | 💰 Finanze & Lavoro (27w) | Passato remoto (literair)       | fingere, sciogliere, reggere       |
| 6     | 2026-08-25  | 🎨 Arte & Letteratura (27w) | Congiuntivo passato           | cogliere, trascorrere, compiere    |

## Een batch toepassen

```bash
# Volgende ongepubliceerde batch toepassen:
node content-batches/apply-batch.js

# Specifieke batch:
node content-batches/apply-batch.js --batch 3

# Eerst controleren zonder te wijzigen:
node content-batches/apply-batch.js --dry-run

# Daarna committen en pushen:
git add js/data.js index.html sw.js content-batches/applied-batches.json
git commit -m "Batch X: <beschrijving>"
git push
```

## Handmatig toepassen

Open `batch-XX.json` en kopieer:
- `vocabulary.data` → voeg toe aan `AppData.vocabulary` in `js/data.js`
- `grammar` → voeg toe aan de `grammar: []` array in `js/data.js`
- `verbs.irregular[]` → voeg toe aan `verbs.irregular[]` in `js/data.js`

Verhoog daarna:
- `data.js?v=XX` in `index.html` en `sw.js`
- `impara-italiano-vXX` in `sw.js`
