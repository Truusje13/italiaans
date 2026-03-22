// Italian Learning App - Data Module
// Contains all vocabulary, grammar rules, verbs, and speaking phrases

const AppData = {
    // Vocabulary organized by categories (ordered from easy to difficult within each category)
    vocabulary: {
        greetings: {
            name: "Begroetingen",
            icon: "👋",
            words: [
                // Niveau 1 - Basis
                { it: "Ciao", nl: "Hallo / Dag", note: "Informeel, voor vrienden", level: 1, sentence: { it: "Ciao, come stai?", nl: "Hallo, hoe gaat het?" } },
                { it: "Sì", nl: "Ja", note: "", level: 1, sentence: { it: "Sì, capisco.", nl: "Ja, ik begrijp het." } },
                { it: "No", nl: "Nee", note: "", level: 1, sentence: { it: "No, grazie.", nl: "Nee, bedankt." } },
                { it: "Grazie", nl: "Bedankt", note: "", level: 1, sentence: { it: "Grazie mille!", nl: "Heel erg bedankt!" } },
                { it: "Prego", nl: "Alstublieft / Graag gedaan", note: "Meerdere betekenissen", level: 1, sentence: { it: "Prego, si accomodi.", nl: "Alstublieft, gaat u zitten." } },
                // Niveau 2 - Eenvoudig
                { it: "Buongiorno", nl: "Goedemorgen / Goedendag", note: "Formeel, tot 's middags", level: 2, sentence: { it: "Buongiorno, signora!", nl: "Goedemorgen, mevrouw!" } },
                { it: "Buonasera", nl: "Goedenavond", note: "Vanaf late namiddag", level: 2, sentence: { it: "Buonasera, come va?", nl: "Goedenavond, hoe gaat het?" } },
                { it: "Buonanotte", nl: "Goedenacht", note: "Bij het slapengaan", level: 2, sentence: { it: "Buonanotte, a domani!", nl: "Goedenacht, tot morgen!" } },
                { it: "Arrivederci", nl: "Tot ziens", note: "Formeel afscheid", level: 2, sentence: { it: "Arrivederci e grazie!", nl: "Tot ziens en bedankt!" } },
                { it: "A presto", nl: "Tot snel", note: "Informeel", level: 2, sentence: { it: "A presto, amico!", nl: "Tot snel, vriend!" } },
                // Niveau 3 - Gemiddeld
                { it: "Come stai?", nl: "Hoe gaat het? (informeel)", note: "Tegen vrienden/familie", level: 3, sentence: { it: "Ciao! Come stai oggi?", nl: "Hallo! Hoe gaat het vandaag?" } },
                { it: "Come sta?", nl: "Hoe gaat het? (formeel)", note: "Tegen onbekenden/ouderen", level: 3 },
                { it: "Bene, grazie", nl: "Goed, bedankt", note: "Standaard antwoord", level: 3, sentence: { it: "Bene, grazie, e tu?", nl: "Goed, bedankt, en jij?" } },
                { it: "Piacere", nl: "Aangenaam", note: "Bij kennismaking", level: 3, sentence: { it: "Piacere, mi chiamo Marco.", nl: "Aangenaam, ik heet Marco." } },
                { it: "Scusa", nl: "Sorry (informeel)", note: "", level: 3, sentence: { it: "Scusa, non ho capito.", nl: "Sorry, ik heb het niet begrepen." } },
                { it: "Mi scusi", nl: "Pardon (formeel)", note: "", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "Come va?", nl: "Hoe gaat het?", note: "Informeel alternatief", level: 4 },
                { it: "Molto bene", nl: "Heel goed", note: "", level: 4 },
                { it: "Così così", nl: "Zo zo / Gaat wel", note: "", level: 4 },
                { it: "Non c'è male", nl: "Niet slecht", note: "Letterlijk: er is geen kwaad", level: 4 },
                { it: "A dopo", nl: "Tot later", note: "", level: 4 },
                { it: "A domani", nl: "Tot morgen", note: "", level: 4 },
                { it: "Ci vediamo", nl: "We zien elkaar", note: "Informeel afscheid", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "Piacere di conoscerti", nl: "Aangenaam kennis te maken (informeel)", note: "", level: 5 },
                { it: "Piacere di conoscerla", nl: "Aangenaam kennis te maken (formeel)", note: "", level: 5 },
                { it: "Mi fa piacere", nl: "Het doet me plezier", note: "", level: 5 },
                { it: "Le presento...", nl: "Mag ik u voorstellen aan...", note: "Formeel", level: 5 },
                { it: "Ti presento...", nl: "Dit is... (informeel)", note: "", level: 5 },
                { it: "Benvenuto/a", nl: "Welkom", note: "Past aan naar geslacht", level: 5 },
                { it: "In bocca al lupo!", nl: "Succes! (Letterlijk: in de bek van de wolf)", note: "Antwoord: Crepi!", level: 5 }
            ]
        },
        numbers: {
            name: "Getallen",
            icon: "🔢",
            words: [
                // Niveau 1 - Basis (1-10)
                { it: "zero", nl: "nul (0)", note: "", level: 1 },
                { it: "uno", nl: "een (1)", note: "", level: 1 },
                { it: "due", nl: "twee (2)", note: "", level: 1 },
                { it: "tre", nl: "drie (3)", note: "", level: 1 },
                { it: "quattro", nl: "vier (4)", note: "", level: 1 },
                { it: "cinque", nl: "vijf (5)", note: "", level: 1 },
                { it: "sei", nl: "zes (6)", note: "", level: 1 },
                { it: "sette", nl: "zeven (7)", note: "", level: 1 },
                { it: "otto", nl: "acht (8)", note: "", level: 1 },
                { it: "nove", nl: "negen (9)", note: "", level: 1 },
                { it: "dieci", nl: "tien (10)", note: "", level: 1 },
                // Niveau 2 - Eenvoudig (11-20)
                { it: "undici", nl: "elf (11)", note: "", level: 2 },
                { it: "dodici", nl: "twaalf (12)", note: "", level: 2 },
                { it: "tredici", nl: "dertien (13)", note: "", level: 2 },
                { it: "quattordici", nl: "veertien (14)", note: "", level: 2 },
                { it: "quindici", nl: "vijftien (15)", note: "", level: 2 },
                { it: "sedici", nl: "zestien (16)", note: "", level: 2 },
                { it: "diciassette", nl: "zeventien (17)", note: "", level: 2 },
                { it: "diciotto", nl: "achttien (18)", note: "", level: 2 },
                { it: "diciannove", nl: "negentien (19)", note: "", level: 2 },
                { it: "venti", nl: "twintig (20)", note: "", level: 2 },
                // Niveau 3 - Gemiddeld (tientallen)
                { it: "ventuno", nl: "eenentwintig (21)", note: "Let op: geen 'i' tussen vent- en uno", level: 3 },
                { it: "ventidue", nl: "tweeëntwintig (22)", note: "", level: 3 },
                { it: "trenta", nl: "dertig (30)", note: "", level: 3 },
                { it: "quaranta", nl: "veertig (40)", note: "", level: 3 },
                { it: "cinquanta", nl: "vijftig (50)", note: "", level: 3 },
                { it: "sessanta", nl: "zestig (60)", note: "", level: 3 },
                { it: "settanta", nl: "zeventig (70)", note: "", level: 3 },
                { it: "ottanta", nl: "tachtig (80)", note: "", level: 3 },
                { it: "novanta", nl: "negentig (90)", note: "", level: 3 },
                // Niveau 4 - Gevorderd (grote getallen)
                { it: "cento", nl: "honderd (100)", note: "", level: 4 },
                { it: "centouno", nl: "honderd en een (101)", note: "", level: 4 },
                { it: "duecento", nl: "tweehonderd (200)", note: "", level: 4 },
                { it: "cinquecento", nl: "vijfhonderd (500)", note: "", level: 4 },
                { it: "mille", nl: "duizend (1000)", note: "Meervoud: mila", level: 4 },
                { it: "duemila", nl: "tweeduizend (2000)", note: "", level: 4 },
                // Niveau 5 - Moeilijk (rangtelwoorden & speciale getallen)
                { it: "un milione", nl: "een miljoen", note: "", level: 5 },
                { it: "un miliardo", nl: "een miljard", note: "", level: 5 },
                { it: "primo", nl: "eerste", note: "Rangtelwoord", level: 5 },
                { it: "secondo", nl: "tweede", note: "Rangtelwoord", level: 5 },
                { it: "terzo", nl: "derde", note: "Rangtelwoord", level: 5 },
                { it: "quarto", nl: "vierde", note: "Rangtelwoord", level: 5 },
                { it: "quinto", nl: "vijfde", note: "Rangtelwoord", level: 5 },
                { it: "ultimo", nl: "laatste", note: "Rangtelwoord", level: 5 }
            ]
        },
        food: {
            name: "Eten & Drinken",
            icon: "🍕",
            words: [
                // Niveau 1 - Basis
                { it: "il pane", nl: "het brood", note: "Mannelijk woord", level: 1, sentence: { it: "Vorrei del pane, per favore.", nl: "Ik wil graag brood, alstublieft." } },
                { it: "l'acqua", nl: "het water", note: "Vrouwelijk, l' voor klinker", level: 1, sentence: { it: "Un bicchiere d'acqua, per favore.", nl: "Een glas water, alstublieft." } },
                { it: "il latte", nl: "de melk", note: "Mannelijk woord", level: 1, sentence: { it: "Il caffè con il latte si chiama cappuccino.", nl: "Koffie met melk heet cappuccino." } },
                { it: "la pizza", nl: "de pizza", note: "Vrouwelijk woord", level: 1, sentence: { it: "La pizza margherita è buonissima.", nl: "De margheritapizza is heel lekker." } },
                { it: "la pasta", nl: "de pasta", note: "Vrouwelijk woord", level: 1, sentence: { it: "La pasta è pronta!", nl: "De pasta is klaar!" } },
                // Niveau 2 - Eenvoudig
                { it: "il vino", nl: "de wijn", note: "Mannelijk woord", level: 2, sentence: { it: "Un bicchiere di vino rosso, per favore.", nl: "Een glas rode wijn, alstublieft." } },
                { it: "la birra", nl: "het bier", note: "Vrouwelijk woord", level: 2, sentence: { it: "Vuoi una birra fredda?", nl: "Wil je een koud biertje?" } },
                { it: "il caffè", nl: "de koffie", note: "Mannelijk, accent op laatste lettergreep", level: 2, sentence: { it: "Prendo un caffè, grazie.", nl: "Ik neem een koffie, bedankt." } },
                { it: "il tè", nl: "de thee", note: "Mannelijk woord", level: 2, sentence: { it: "Preferisco il tè al caffè.", nl: "Ik geef de voorkeur aan thee boven koffie." } },
                { it: "il formaggio", nl: "de kaas", note: "Mannelijk woord", level: 2, sentence: { it: "Il formaggio italiano è famoso.", nl: "Italiaanse kaas is beroemd." } },
                { it: "il gelato", nl: "het ijs", note: "Mannelijk woord", level: 2, sentence: { it: "Un gelato al cioccolato, per favore.", nl: "Een chocolade-ijsje, alstublieft." } },
                { it: "la frutta", nl: "het fruit", note: "Vrouwelijk woord", level: 2, sentence: { it: "Mangio la frutta ogni giorno.", nl: "Ik eet elke dag fruit." } },
                // Niveau 3 - Gemiddeld
                { it: "il pomodoro", nl: "de tomaat", note: "Mannelijk woord", level: 3 },
                { it: "la carne", nl: "het vlees", note: "Vrouwelijk woord", level: 3 },
                { it: "il pesce", nl: "de vis", note: "Mannelijk woord", level: 3 },
                { it: "il pollo", nl: "de kip", note: "Mannelijk woord", level: 3 },
                { it: "l'uovo", nl: "het ei", note: "Mannelijk, meervoud: le uova (vrouwelijk!)", level: 3 },
                { it: "il riso", nl: "de rijst", note: "Mannelijk woord", level: 3 },
                { it: "lo zucchero", nl: "de suiker", note: "Mannelijk, lo voor z", level: 3 },
                { it: "il sale", nl: "het zout", note: "Mannelijk woord", level: 3 },
                { it: "il pepe", nl: "de peper", note: "Mannelijk woord", level: 3 },
                { it: "l'olio", nl: "de olie", note: "Mannelijk woord", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "la mela", nl: "de appel", note: "Vrouwelijk woord", level: 4 },
                { it: "l'arancia", nl: "de sinaasappel", note: "Vrouwelijk woord", level: 4 },
                { it: "la banana", nl: "de banaan", note: "Vrouwelijk woord", level: 4 },
                { it: "l'uva", nl: "de druif/druiven", note: "Vrouwelijk, vaak enkelvoud", level: 4 },
                { it: "la fragola", nl: "de aardbei", note: "Vrouwelijk woord", level: 4 },
                { it: "la cipolla", nl: "de ui", note: "Vrouwelijk woord", level: 4 },
                { it: "l'aglio", nl: "de knoflook", note: "Mannelijk woord", level: 4 },
                { it: "la patata", nl: "de aardappel", note: "Vrouwelijk woord", level: 4 },
                { it: "la carota", nl: "de wortel", note: "Vrouwelijk woord", level: 4 },
                { it: "l'insalata", nl: "de salade/sla", note: "Vrouwelijk woord", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "il prosciutto", nl: "de ham", note: "Mannelijk woord", level: 5 },
                { it: "la bistecca", nl: "de biefstuk", note: "Vrouwelijk woord", level: 5 },
                { it: "i frutti di mare", nl: "de zeevruchten", note: "Meervoud", level: 5 },
                { it: "il contorno", nl: "de bijgerecht", note: "Mannelijk woord", level: 5 },
                { it: "l'antipasto", nl: "het voorgerecht", note: "Mannelijk woord", level: 5 },
                { it: "il primo piatto", nl: "het eerste gerecht (pasta/risotto)", note: "", level: 5 },
                { it: "il secondo piatto", nl: "het hoofdgerecht (vlees/vis)", note: "", level: 5 },
                { it: "il dolce", nl: "het dessert", note: "Mannelijk woord", level: 5 },
                { it: "il conto", nl: "de rekening", note: "Mannelijk woord", level: 5 },
                { it: "la mancia", nl: "de fooi", note: "Vrouwelijk woord", level: 5 }
            ]
        },
        family: {
            name: "Familie",
            icon: "👨‍👩‍👧‍👦",
            words: [
                // Niveau 1 - Basis
                { it: "la mamma", nl: "de mama", note: "Vrouwelijk, informeel", level: 1, sentence: { it: "La mia mamma cucina benissimo.", nl: "Mijn mama kookt heel goed." } },
                { it: "il papà", nl: "de papa", note: "Mannelijk, informeel", level: 1, sentence: { it: "Il mio papà lavora in città.", nl: "Mijn papa werkt in de stad." } },
                { it: "la famiglia", nl: "de familie", note: "Vrouwelijk woord", level: 1, sentence: { it: "La mia famiglia è grande.", nl: "Mijn familie is groot." } },
                // Niveau 2 - Eenvoudig
                { it: "il padre", nl: "de vader", note: "Mannelijk woord", level: 2, sentence: { it: "Mio padre ha quarant'anni.", nl: "Mijn vader is veertig jaar oud." } },
                { it: "la madre", nl: "de moeder", note: "Vrouwelijk woord", level: 2, sentence: { it: "Mia madre è insegnante.", nl: "Mijn moeder is lerares." } },
                { it: "il figlio", nl: "de zoon", note: "Mannelijk woord", level: 2, sentence: { it: "Il loro figlio studia medicina.", nl: "Hun zoon studeert geneeskunde." } },
                { it: "la figlia", nl: "de dochter", note: "Vrouwelijk woord", level: 2, sentence: { it: "La figlia di Marco ha dieci anni.", nl: "De dochter van Marco is tien jaar oud." } },
                { it: "il fratello", nl: "de broer", note: "Mannelijk woord", level: 2, sentence: { it: "Ho un fratello e una sorella.", nl: "Ik heb een broer en een zus." } },
                { it: "la sorella", nl: "de zus", note: "Vrouwelijk woord", level: 2, sentence: { it: "Mia sorella abita a Roma.", nl: "Mijn zus woont in Rome." } },
                // Niveau 3 - Gemiddeld
                { it: "il nonno", nl: "de opa", note: "Mannelijk woord", level: 3 },
                { it: "la nonna", nl: "de oma", note: "Vrouwelijk woord", level: 3 },
                { it: "lo zio", nl: "de oom", note: "Mannelijk, lo voor z", level: 3 },
                { it: "la zia", nl: "de tante", note: "Vrouwelijk woord", level: 3 },
                { it: "il cugino", nl: "de neef (oomzegger)", note: "Mannelijk woord", level: 3 },
                { it: "la cugina", nl: "de nicht (oomzegger)", note: "Vrouwelijk woord", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "il marito", nl: "de echtgenoot", note: "Mannelijk woord", level: 4 },
                { it: "la moglie", nl: "de echtgenote", note: "Vrouwelijk woord", level: 4 },
                { it: "il fidanzato", nl: "de verloofde (m)", note: "Ook: vriend", level: 4 },
                { it: "la fidanzata", nl: "de verloofde (v)", note: "Ook: vriendin", level: 4 },
                { it: "il nipote", nl: "de kleinzoon / neef", note: "Mannelijk", level: 4 },
                { it: "la nipote", nl: "de kleindochter / nicht", note: "Vrouwelijk", level: 4 },
                { it: "i genitori", nl: "de ouders", note: "Meervoud", level: 4 },
                { it: "i figli", nl: "de kinderen", note: "Meervoud van figlio", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "il suocero", nl: "de schoonvader", note: "Mannelijk woord", level: 5 },
                { it: "la suocera", nl: "de schoonmoeder", note: "Vrouwelijk woord", level: 5 },
                { it: "il genero", nl: "de schoonzoon", note: "Mannelijk woord", level: 5 },
                { it: "la nuora", nl: "de schoondochter", note: "Vrouwelijk woord", level: 5 },
                { it: "il cognato", nl: "de zwager", note: "Mannelijk woord", level: 5 },
                { it: "la cognata", nl: "de schoonzus", note: "Vrouwelijk woord", level: 5 },
                { it: "il patrigno", nl: "de stiefvader", note: "Mannelijk woord", level: 5 },
                { it: "la matrigna", nl: "de stiefmoeder", note: "Vrouwelijk woord", level: 5 },
                { it: "il bisnonno", nl: "de overgrootvader", note: "Mannelijk woord", level: 5 },
                { it: "la bisnonna", nl: "de overgrootmoeder", note: "Vrouwelijk woord", level: 5 }
            ]
        },
        colors: {
            name: "Kleuren",
            icon: "🎨",
            words: [
                // Niveau 1 - Basis
                { it: "rosso", nl: "rood", note: "Bijv.nw., past aan: rosso/rossa/rossi/rosse", level: 1 },
                { it: "blu", nl: "blauw", note: "Onveranderlijk bijvoeglijk naamwoord", level: 1 },
                { it: "verde", nl: "groen", note: "Bijv.nw., verde/verdi", level: 1 },
                { it: "giallo", nl: "geel", note: "Bijv.nw., giallo/gialla/gialli/gialle", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "bianco", nl: "wit", note: "Bijv.nw., bianco/bianca/bianchi/bianche", level: 2 },
                { it: "nero", nl: "zwart", note: "Bijv.nw., nero/nera/neri/nere", level: 2 },
                { it: "arancione", nl: "oranje", note: "Onveranderlijk bijvoeglijk naamwoord", level: 2 },
                { it: "rosa", nl: "roze", note: "Onveranderlijk bijvoeglijk naamwoord", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "viola", nl: "paars", note: "Onveranderlijk bijvoeglijk naamwoord", level: 3 },
                { it: "marrone", nl: "bruin", note: "Onveranderlijk bijvoeglijk naamwoord", level: 3 },
                { it: "grigio", nl: "grijs", note: "Bijv.nw., grigio/grigia/grigi/grigie", level: 3 },
                { it: "azzurro", nl: "lichtblauw/hemelblauw", note: "Bijv.nw., past aan", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "celeste", nl: "hemelsblauw", note: "Onveranderlijk", level: 4 },
                { it: "beige", nl: "beige", note: "Onveranderlijk", level: 4 },
                { it: "oro", nl: "goud(kleurig)", note: "Onveranderlijk", level: 4 },
                { it: "argento", nl: "zilver(kleurig)", note: "Onveranderlijk", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "chiaro", nl: "licht (bijv. verde chiaro = lichtgroen)", note: "Modifier", level: 5 },
                { it: "scuro", nl: "donker (bijv. blu scuro = donkerblauw)", note: "Modifier", level: 5 },
                { it: "colorato", nl: "kleurrijk/gekleurd", note: "Bijv.nw., past aan", level: 5 },
                { it: "trasparente", nl: "transparant/doorzichtig", note: "Onveranderlijk", level: 5 },
                { it: "opaco", nl: "mat/ondoorzichtig", note: "Bijv.nw., past aan", level: 5 }
            ]
        },
        travel: {
            name: "Reizen",
            icon: "✈️",
            words: [
                // Niveau 1 - Basis
                { it: "il treno", nl: "de trein", note: "Mannelijk woord", level: 1, sentence: { it: "Il treno parte alle otto.", nl: "De trein vertrekt om acht uur." } },
                { it: "l'autobus", nl: "de bus", note: "Mannelijk, l' voor klinker", level: 1, sentence: { it: "Prendo l'autobus ogni giorno.", nl: "Ik neem elke dag de bus." } },
                { it: "la macchina", nl: "de auto", note: "Vrouwelijk woord", level: 1, sentence: { it: "Vado in macchina al lavoro.", nl: "Ik ga met de auto naar het werk." } },
                { it: "l'aereo", nl: "het vliegtuig", note: "Mannelijk woord", level: 1, sentence: { it: "L'aereo è in ritardo di un'ora.", nl: "Het vliegtuig heeft een uur vertraging." } },
                // Niveau 2 - Eenvoudig
                { it: "il viaggio", nl: "de reis", note: "Mannelijk woord", level: 2, sentence: { it: "Buon viaggio!", nl: "Goede reis!" } },
                { it: "l'aeroporto", nl: "de luchthaven", note: "Mannelijk, l' voor klinker", level: 2, sentence: { it: "L'aeroporto è lontano dal centro.", nl: "De luchthaven is ver van het centrum." } },
                { it: "la stazione", nl: "het station", note: "Vrouwelijk woord", level: 2, sentence: { it: "Dove si trova la stazione?", nl: "Waar is het station?" } },
                { it: "il biglietto", nl: "het kaartje", note: "Mannelijk woord", level: 2, sentence: { it: "Quanto costa il biglietto?", nl: "Hoeveel kost het kaartje?" } },
                { it: "l'albergo", nl: "het hotel", note: "Mannelijk, l' voor klinker", level: 2, sentence: { it: "Ho prenotato una camera in albergo.", nl: "Ik heb een kamer in het hotel gereserveerd." } },
                { it: "la camera", nl: "de kamer", note: "Vrouwelijk woord", level: 2, sentence: { it: "La camera è al terzo piano.", nl: "De kamer is op de derde verdieping." } },
                // Niveau 3 - Gemiddeld
                { it: "il passaporto", nl: "het paspoort", note: "Mannelijk woord", level: 3 },
                { it: "la valigia", nl: "de koffer", note: "Vrouwelijk woord", level: 3 },
                { it: "la mappa", nl: "de kaart/plattegrond", note: "Vrouwelijk woord", level: 3 },
                { it: "la fermata", nl: "de halte", note: "Vrouwelijk woord", level: 3 },
                { it: "l'uscita", nl: "de uitgang", note: "Vrouwelijk woord", level: 3 },
                { it: "l'entrata", nl: "de ingang", note: "Vrouwelijk woord", level: 3 },
                { it: "il binario", nl: "het perron/spoor", note: "Mannelijk woord", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "la prenotazione", nl: "de reservering", note: "Vrouwelijk woord", level: 4 },
                { it: "il volo", nl: "de vlucht", note: "Mannelijk woord", level: 4 },
                { it: "il ritardo", nl: "de vertraging", note: "Mannelijk woord", level: 4 },
                { it: "la partenza", nl: "het vertrek", note: "Vrouwelijk woord", level: 4 },
                { it: "l'arrivo", nl: "de aankomst", note: "Mannelijk woord", level: 4 },
                { it: "la dogana", nl: "de douane", note: "Vrouwelijk woord", level: 4 },
                { it: "il bagaglio", nl: "de bagage", note: "Mannelijk woord", level: 4 },
                { it: "lo zaino", nl: "de rugzak", note: "Mannelijk, lo voor z", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "la carta d'imbarco", nl: "de instapkaart", note: "", level: 5 },
                { it: "il controllo passaporti", nl: "de paspoortcontrole", note: "", level: 5 },
                { it: "la coincidenza", nl: "de aansluiting/overstap", note: "Vrouwelijk woord", level: 5 },
                { it: "il noleggio auto", nl: "de autoverhuur", note: "", level: 5 },
                { it: "l'assicurazione viaggio", nl: "de reisverzekering", note: "", level: 5 },
                { it: "il finestrino", nl: "het raampje (in trein/vliegtuig)", note: "Mannelijk", level: 5 },
                { it: "il corridoio", nl: "het gangpad", note: "Mannelijk woord", level: 5 },
                { it: "la classe economica", nl: "de economy class", note: "", level: 5 }
            ]
        },
        days: {
            name: "Dagen & Tijd",
            icon: "📅",
            words: [
                // Niveau 1 - Basis (dagen)
                { it: "oggi", nl: "vandaag", note: "", level: 1 },
                { it: "domani", nl: "morgen", note: "", level: 1 },
                { it: "ieri", nl: "gisteren", note: "", level: 1 },
                // Niveau 2 - Eenvoudig (dagen van de week)
                { it: "lunedì", nl: "maandag", note: "Dagen zijn mannelijk en niet gekapitaliseerd", level: 2 },
                { it: "martedì", nl: "dinsdag", note: "", level: 2 },
                { it: "mercoledì", nl: "woensdag", note: "", level: 2 },
                { it: "giovedì", nl: "donderdag", note: "", level: 2 },
                { it: "venerdì", nl: "vrijdag", note: "", level: 2 },
                { it: "sabato", nl: "zaterdag", note: "", level: 2 },
                { it: "domenica", nl: "zondag", note: "Vrouwelijk woord", level: 2 },
                // Niveau 3 - Gemiddeld (tijdseenheden)
                { it: "la settimana", nl: "de week", note: "Vrouwelijk woord", level: 3 },
                { it: "il mese", nl: "de maand", note: "Mannelijk woord", level: 3 },
                { it: "l'anno", nl: "het jaar", note: "Mannelijk, l' voor klinker", level: 3 },
                { it: "l'ora", nl: "het uur", note: "Vrouwelijk woord", level: 3 },
                { it: "il minuto", nl: "de minuut", note: "Mannelijk woord", level: 3 },
                { it: "il secondo", nl: "de seconde", note: "Mannelijk woord", level: 3 },
                // Niveau 4 - Gevorderd (maanden)
                { it: "gennaio", nl: "januari", note: "Niet gekapitaliseerd", level: 4 },
                { it: "febbraio", nl: "februari", note: "", level: 4 },
                { it: "marzo", nl: "maart", note: "", level: 4 },
                { it: "aprile", nl: "april", note: "", level: 4 },
                { it: "maggio", nl: "mei", note: "", level: 4 },
                { it: "giugno", nl: "juni", note: "", level: 4 },
                { it: "luglio", nl: "juli", note: "", level: 4 },
                { it: "agosto", nl: "augustus", note: "", level: 4 },
                { it: "settembre", nl: "september", note: "", level: 4 },
                { it: "ottobre", nl: "oktober", note: "", level: 4 },
                { it: "novembre", nl: "november", note: "", level: 4 },
                { it: "dicembre", nl: "december", note: "", level: 4 },
                // Niveau 5 - Moeilijk (tijdsuitdrukkingen)
                { it: "dopodomani", nl: "overmorgen", note: "", level: 5 },
                { it: "l'altro ieri", nl: "eergisteren", note: "", level: 5 },
                { it: "la prossima settimana", nl: "volgende week", note: "", level: 5 },
                { it: "la settimana scorsa", nl: "vorige week", note: "", level: 5 },
                { it: "fra poco", nl: "straks/binnenkort", note: "", level: 5 },
                { it: "nel frattempo", nl: "ondertussen", note: "", level: 5 },
                { it: "all'improvviso", nl: "plotseling", note: "", level: 5 },
                { it: "di solito", nl: "gewoonlijk", note: "", level: 5 },
                { it: "ogni tanto", nl: "af en toe", note: "", level: 5 }
            ]
        },
        common: {
            name: "Veelgebruikt",
            icon: "⭐",
            words: [
                // Niveau 1 - Basis
                { it: "sì", nl: "ja", note: "", level: 1, sentence: { it: "Sì, voglio venire!", nl: "Ja, ik wil komen!" } },
                { it: "no", nl: "nee", note: "", level: 1, sentence: { it: "No, non ho fame.", nl: "Nee, ik heb geen honger." } },
                { it: "e", nl: "en", note: "", level: 1, sentence: { it: "Pane e burro.", nl: "Brood en boter." } },
                { it: "o", nl: "of", note: "", level: 1, sentence: { it: "Caffè o tè?", nl: "Koffie of thee?" } },
                { it: "ma", nl: "maar", note: "", level: 1, sentence: { it: "Voglio venire, ma sono stanco.", nl: "Ik wil komen, maar ik ben moe." } },
                // Niveau 2 - Eenvoudig
                { it: "grazie", nl: "bedankt", note: "", level: 2, sentence: { it: "Grazie per il tuo aiuto!", nl: "Bedankt voor je hulp!" } },
                { it: "prego", nl: "alstublieft / graag gedaan", note: "Meerdere betekenissen", level: 2, sentence: { it: "— Grazie! — Prego!", nl: "— Bedankt! — Graag gedaan!" } },
                { it: "per favore", nl: "alstublieft (bij verzoek)", note: "", level: 2, sentence: { it: "Un caffè, per favore.", nl: "Een koffie, alstublieft." } },
                { it: "scusa", nl: "sorry (informeel)", note: "", level: 2, sentence: { it: "Scusa, puoi ripetere?", nl: "Sorry, kun je herhalen?" } },
                { it: "mi scusi", nl: "sorry / pardon (formeel)", note: "", level: 2 },
                // Niveau 3 - Gemiddeld (bijvoeglijke naamwoorden)
                { it: "buono", nl: "goed / lekker", note: "Bijv.nw.", level: 3 },
                { it: "bello", nl: "mooi", note: "Bijv.nw.", level: 3 },
                { it: "grande", nl: "groot", note: "Bijv.nw.", level: 3 },
                { it: "piccolo", nl: "klein", note: "Bijv.nw.", level: 3 },
                { it: "nuovo", nl: "nieuw", note: "Bijv.nw.", level: 3 },
                { it: "vecchio", nl: "oud", note: "Bijv.nw.", level: 3 },
                { it: "giovane", nl: "jong", note: "Bijv.nw.", level: 3 },
                // Niveau 4 - Gevorderd (bijwoorden)
                { it: "molto", nl: "veel / erg", note: "", level: 4 },
                { it: "poco", nl: "weinig", note: "", level: 4 },
                { it: "adesso", nl: "nu", note: "", level: 4 },
                { it: "sempre", nl: "altijd", note: "", level: 4 },
                { it: "mai", nl: "nooit", note: "", level: 4 },
                { it: "già", nl: "al/reeds", note: "", level: 4 },
                { it: "ancora", nl: "nog/weer", note: "", level: 4 },
                { it: "qui", nl: "hier", note: "", level: 4 },
                { it: "là", nl: "daar", note: "", level: 4 },
                { it: "forse", nl: "misschien", note: "", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "comunque", nl: "hoe dan ook/trouwens", note: "", level: 5 },
                { it: "inoltre", nl: "bovendien", note: "", level: 5 },
                { it: "quindi", nl: "dus/daarom", note: "", level: 5 },
                { it: "però", nl: "echter/maar", note: "", level: 5 },
                { it: "anzi", nl: "sterker nog/integendeel", note: "", level: 5 },
                { it: "magari", nl: "misschien/hopelijk/als het maar kon", note: "Veelzijdig woord", level: 5 },
                { it: "piuttosto", nl: "eerder/nogal", note: "", level: 5 },
                { it: "appena", nl: "net/zodra/nauwelijks", note: "Meerdere betekenissen", level: 5 },
                { it: "mica", nl: "toch niet/helemaal niet", note: "Versterkt ontkenning", level: 5 }
            ]
        },
        body: {
            name: "Lichaam",
            icon: "🧍",
            words: [
                // Niveau 1 - Basis
                { it: "la testa", nl: "het hoofd", note: "Vrouwelijk woord", level: 1 },
                { it: "la mano", nl: "de hand", note: "Vrouwelijk, onregelmatig meervoud: le mani", level: 1 },
                { it: "il piede", nl: "de voet", note: "Mannelijk woord", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "l'occhio", nl: "het oog", note: "Mannelijk woord", level: 2 },
                { it: "l'orecchio", nl: "het oor", note: "Mannelijk, mv: le orecchie (vrouwelijk!)", level: 2 },
                { it: "il naso", nl: "de neus", note: "Mannelijk woord", level: 2 },
                { it: "la bocca", nl: "de mond", note: "Vrouwelijk woord", level: 2 },
                { it: "il dente", nl: "de tand", note: "Mannelijk woord", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "il braccio", nl: "de arm", note: "Mannelijk, mv: le braccia (vrouwelijk!)", level: 3 },
                { it: "la gamba", nl: "het been", note: "Vrouwelijk woord", level: 3 },
                { it: "il dito", nl: "de vinger", note: "Mannelijk, mv: le dita (vrouwelijk!)", level: 3 },
                { it: "il collo", nl: "de nek/hals", note: "Mannelijk woord", level: 3 },
                { it: "la schiena", nl: "de rug", note: "Vrouwelijk woord", level: 3 },
                { it: "il petto", nl: "de borst", note: "Mannelijk woord", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "il cuore", nl: "het hart", note: "Mannelijk woord", level: 4 },
                { it: "lo stomaco", nl: "de maag", note: "Mannelijk, lo voor st", level: 4 },
                { it: "il fegato", nl: "de lever", note: "Mannelijk woord", level: 4 },
                { it: "il polmone", nl: "de long", note: "Mannelijk woord", level: 4 },
                { it: "il ginocchio", nl: "de knie", note: "Mannelijk, mv: le ginocchia", level: 4 },
                { it: "la caviglia", nl: "de enkel", note: "Vrouwelijk woord", level: 4 },
                { it: "il gomito", nl: "de elleboog", note: "Mannelijk woord", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "la fronte", nl: "het voorhoofd", note: "Vrouwelijk woord", level: 5 },
                { it: "il sopracciglio", nl: "de wenkbrauw", note: "Mannelijk, mv: le sopracciglia", level: 5 },
                { it: "la guancia", nl: "de wang", note: "Vrouwelijk woord", level: 5 },
                { it: "il mento", nl: "de kin", note: "Mannelijk woord", level: 5 },
                { it: "la spalla", nl: "de schouder", note: "Vrouwelijk woord", level: 5 },
                { it: "il polso", nl: "de pols", note: "Mannelijk woord", level: 5 },
                { it: "l'unghia", nl: "de nagel", note: "Vrouwelijk woord", level: 5 },
                { it: "la pelle", nl: "de huid", note: "Vrouwelijk woord", level: 5 }
            ]
        },
        house: {
            name: "Huis & Wonen",
            icon: "🏠",
            words: [
                // Niveau 1 - Basis
                { it: "la casa", nl: "het huis", note: "Vrouwelijk woord", level: 1 },
                { it: "la porta", nl: "de deur", note: "Vrouwelijk woord", level: 1 },
                { it: "la finestra", nl: "het raam", note: "Vrouwelijk woord", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "la cucina", nl: "de keuken", note: "Vrouwelijk woord", level: 2 },
                { it: "il bagno", nl: "de badkamer", note: "Mannelijk woord", level: 2 },
                { it: "la camera da letto", nl: "de slaapkamer", note: "", level: 2 },
                { it: "il soggiorno", nl: "de woonkamer", note: "Mannelijk woord", level: 2 },
                { it: "il giardino", nl: "de tuin", note: "Mannelijk woord", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "il tavolo", nl: "de tafel", note: "Mannelijk woord", level: 3 },
                { it: "la sedia", nl: "de stoel", note: "Vrouwelijk woord", level: 3 },
                { it: "il letto", nl: "het bed", note: "Mannelijk woord", level: 3 },
                { it: "l'armadio", nl: "de kast", note: "Mannelijk woord", level: 3 },
                { it: "il divano", nl: "de bank/sofa", note: "Mannelijk woord", level: 3 },
                { it: "lo specchio", nl: "de spiegel", note: "Mannelijk, lo voor sp", level: 3 },
                { it: "il frigorifero", nl: "de koelkast", note: "Mannelijk woord", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "il piano", nl: "de verdieping", note: "Mannelijk woord", level: 4 },
                { it: "le scale", nl: "de trap", note: "Vrouwelijk meervoud", level: 4 },
                { it: "l'ascensore", nl: "de lift", note: "Mannelijk woord", level: 4 },
                { it: "il balcone", nl: "het balkon", note: "Mannelijk woord", level: 4 },
                { it: "il tetto", nl: "het dak", note: "Mannelijk woord", level: 4 },
                { it: "il muro", nl: "de muur", note: "Mannelijk woord", level: 4 },
                { it: "il pavimento", nl: "de vloer", note: "Mannelijk woord", level: 4 },
                { it: "il soffitto", nl: "het plafond", note: "Mannelijk woord", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "la lavatrice", nl: "de wasmachine", note: "Vrouwelijk woord", level: 5 },
                { it: "l'asciugatrice", nl: "de droger", note: "Vrouwelijk woord", level: 5 },
                { it: "la lavastoviglie", nl: "de vaatwasser", note: "Vrouwelijk woord", level: 5 },
                { it: "il forno", nl: "de oven", note: "Mannelijk woord", level: 5 },
                { it: "il microonde", nl: "de magnetron", note: "Mannelijk woord", level: 5 },
                { it: "il riscaldamento", nl: "de verwarming", note: "Mannelijk woord", level: 5 },
                { it: "l'aria condizionata", nl: "de airconditioning", note: "", level: 5 },
                { it: "l'inquilino", nl: "de huurder", note: "Mannelijk woord", level: 5 },
                { it: "il proprietario", nl: "de eigenaar", note: "Mannelijk woord", level: 5 },
                { it: "l'affitto", nl: "de huur", note: "Mannelijk woord", level: 5 }
            ]
        },
        weather: {
            name: "Weer & Natuur",
            icon: "🌤️",
            words: [
                // Niveau 1 - Basis
                { it: "il sole", nl: "de zon", note: "Mannelijk woord", level: 1 },
                { it: "la pioggia", nl: "de regen", note: "Vrouwelijk woord", level: 1 },
                { it: "il cielo", nl: "de lucht/hemel", note: "Mannelijk woord", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "caldo", nl: "warm/heet", note: "Fa caldo = het is warm", level: 2 },
                { it: "freddo", nl: "koud", note: "Fa freddo = het is koud", level: 2 },
                { it: "la neve", nl: "de sneeuw", note: "Vrouwelijk woord", level: 2 },
                { it: "il vento", nl: "de wind", note: "Mannelijk woord", level: 2 },
                { it: "la nuvola", nl: "de wolk", note: "Vrouwelijk woord", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "il mare", nl: "de zee", note: "Mannelijk woord", level: 3 },
                { it: "la montagna", nl: "de berg", note: "Vrouwelijk woord", level: 3 },
                { it: "il lago", nl: "het meer", note: "Mannelijk woord", level: 3 },
                { it: "il fiume", nl: "de rivier", note: "Mannelijk woord", level: 3 },
                { it: "l'albero", nl: "de boom", note: "Mannelijk woord", level: 3 },
                { it: "il fiore", nl: "de bloem", note: "Mannelijk woord", level: 3 },
                { it: "l'erba", nl: "het gras", note: "Vrouwelijk woord", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "nuvoloso", nl: "bewolkt", note: "Bijv.nw.", level: 4 },
                { it: "soleggiato", nl: "zonnig", note: "Bijv.nw.", level: 4 },
                { it: "piovoso", nl: "regenachtig", note: "Bijv.nw.", level: 4 },
                { it: "il temporale", nl: "de storm/onweer", note: "Mannelijk woord", level: 4 },
                { it: "il fulmine", nl: "de bliksem", note: "Mannelijk woord", level: 4 },
                { it: "il tuono", nl: "de donder", note: "Mannelijk woord", level: 4 },
                { it: "la nebbia", nl: "de mist", note: "Vrouwelijk woord", level: 4 },
                { it: "il ghiaccio", nl: "het ijs", note: "Mannelijk woord", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "l'arcobaleno", nl: "de regenboog", note: "Mannelijk woord", level: 5 },
                { it: "l'alba", nl: "de dageraad/zonsopgang", note: "Vrouwelijk woord", level: 5 },
                { it: "il tramonto", nl: "de zonsondergang", note: "Mannelijk woord", level: 5 },
                { it: "la grandine", nl: "de hagel", note: "Vrouwelijk woord", level: 5 },
                { it: "l'umidità", nl: "de vochtigheid", note: "Vrouwelijk woord", level: 5 },
                { it: "la temperatura", nl: "de temperatuur", note: "Vrouwelijk woord", level: 5 },
                { it: "le previsioni del tempo", nl: "de weersvoorspelling", note: "", level: 5 },
                { it: "la siccità", nl: "de droogte", note: "Vrouwelijk woord", level: 5 }
            ]
        },
        work: {
            name: "Werk & Beroepen",
            icon: "💼",
            words: [
                // Niveau 1 - Basis
                { it: "il lavoro", nl: "het werk", note: "Mannelijk woord", level: 1 },
                { it: "l'ufficio", nl: "het kantoor", note: "Mannelijk woord", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "il medico", nl: "de dokter", note: "Mannelijk woord", level: 2 },
                { it: "l'insegnante", nl: "de leraar/lerares", note: "Mannelijk of vrouwelijk", level: 2 },
                { it: "il cameriere", nl: "de ober", note: "Mannelijk woord", level: 2 },
                { it: "la cameriera", nl: "de serveerster", note: "Vrouwelijk woord", level: 2 },
                { it: "il cuoco", nl: "de kok", note: "Mannelijk woord", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "l'avvocato", nl: "de advocaat", note: "Mannelijk woord", level: 3 },
                { it: "l'ingegnere", nl: "de ingenieur", note: "Mannelijk woord", level: 3 },
                { it: "il poliziotto", nl: "de politieagent", note: "Mannelijk woord", level: 3 },
                { it: "il pompiere", nl: "de brandweerman", note: "Mannelijk woord", level: 3 },
                { it: "l'infermiere", nl: "de verpleger", note: "Mannelijk woord", level: 3 },
                { it: "l'infermiera", nl: "de verpleegster", note: "Vrouwelijk woord", level: 3 },
                { it: "il giornalista", nl: "de journalist", note: "Mannelijk/vrouwelijk", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "il collega", nl: "de collega", note: "Mannelijk, vrouwelijk: la collega", level: 4 },
                { it: "il capo", nl: "de baas", note: "Mannelijk woord", level: 4 },
                { it: "il dipendente", nl: "de werknemer", note: "Mannelijk woord", level: 4 },
                { it: "lo stipendio", nl: "het salaris", note: "Mannelijk, lo voor st", level: 4 },
                { it: "la riunione", nl: "de vergadering", note: "Vrouwelijk woord", level: 4 },
                { it: "il contratto", nl: "het contract", note: "Mannelijk woord", level: 4 },
                { it: "le ferie", nl: "de vakantie (werk)", note: "Vrouwelijk meervoud", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "il commercialista", nl: "de accountant", note: "Mannelijk woord", level: 5 },
                { it: "il consulente", nl: "de consultant", note: "Mannelijk woord", level: 5 },
                { it: "l'imprenditore", nl: "de ondernemer", note: "Mannelijk woord", level: 5 },
                { it: "il disoccupato", nl: "de werkloze", note: "Mannelijk woord", level: 5 },
                { it: "la disoccupazione", nl: "de werkloosheid", note: "Vrouwelijk woord", level: 5 },
                { it: "il colloquio di lavoro", nl: "het sollicitatiegesprek", note: "", level: 5 },
                { it: "il curriculum vitae", nl: "het cv", note: "", level: 5 },
                { it: "la promozione", nl: "de promotie", note: "Vrouwelijk woord", level: 5 },
                { it: "il licenziamento", nl: "het ontslag", note: "Mannelijk woord", level: 5 }
            ]
        },
        sport: {
            name: "Sport & Fitness",
            icon: "🏃",
            words: [
                // Niveau 1 - Basis
                { it: "il calcio", nl: "het voetbal", note: "Meest populaire sport in Italië", level: 1 },
                { it: "lo sport", nl: "de sport", note: "Mannelijk woord", level: 1 },
                { it: "la partita", nl: "de wedstrijd", note: "Vrouwelijk woord", level: 1 },
                { it: "la squadra", nl: "het team / de ploeg", note: "Vrouwelijk woord", level: 1 },
                { it: "vincere", nl: "winnen", note: "Onregelmatig werkwoord", level: 1 },
                { it: "perdere", nl: "verliezen", note: "Regelmatig -ere", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "il nuoto", nl: "het zwemmen", note: "Mannelijk woord", level: 2 },
                { it: "la piscina", nl: "het zwembad", note: "Vrouwelijk woord", level: 2 },
                { it: "la palestra", nl: "de sportschool / het gym", note: "Vrouwelijk woord", level: 2 },
                { it: "correre", nl: "rennen / hardlopen", note: "Onregelmatig werkwoord", level: 2 },
                { it: "giocare a tennis", nl: "tennissen", note: "Letterlijk: tennis spelen", level: 2 },
                { it: "la bicicletta", nl: "de fiets", note: "Vrouwelijk woord", level: 2 },
                { it: "andare in bici", nl: "fietsen", note: "Letterlijk: met de fiets gaan", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "il basket", nl: "het basketbal", note: "Engelstalige lening", level: 3 },
                { it: "il ciclismo", nl: "het wielrennen", note: "Mannelijk woord", level: 3 },
                { it: "la pallavolo", nl: "het volleybal", note: "Vrouwelijk woord", level: 3 },
                { it: "il nuotatore", nl: "de zwemmer", note: "Mannelijk, vrouwelijk: la nuotatrice", level: 3 },
                { it: "allenarsi", nl: "trainen / sporten", note: "Reflexief werkwoord", level: 3 },
                { it: "il campo da calcio", nl: "het voetbalveld", note: "Mannelijk woord", level: 3 },
                { it: "la gara", nl: "de wedstrijd / de race", note: "Vrouwelijk woord", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "il campionato", nl: "het kampioenschap", note: "Mannelijk woord", level: 4 },
                { it: "il pareggio", nl: "de gelijkspel", note: "Mannelijk woord", level: 4 },
                { it: "il portiere", nl: "de doelverdediger", note: "Mannelijk woord", level: 4 },
                { it: "la rete", nl: "het net / het doel", note: "Vrouwelijk woord, ook: netwerk", level: 4 },
                { it: "fare jogging", nl: "joggen", note: "Engelstalige lening", level: 4 },
                { it: "lo stadio", nl: "het stadion", note: "Mannelijk woord", level: 4 },
                { it: "il tifoso", nl: "de supporter / de fan", note: "Vrouwelijk: la tifosa", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "il palio", nl: "het paardenrennen (Siena)", note: "Beroemd Italiaans event", level: 5 },
                { it: "la classifica", nl: "de ranglijst / het klassement", note: "Vrouwelijk woord", level: 5 },
                { it: "il professionista", nl: "de beroepssporter", note: "Mannelijk/vrouwelijk", level: 5 },
                { it: "il Giro d'Italia", nl: "de Ronde van Italië", note: "Beroemde wielerwedstrijd", level: 5 },
                { it: "fare stretching", nl: "stretchen", note: "Engelstalige lening", level: 5 },
                { it: "il cronometro", nl: "de chronometer / de stopwatch", note: "Mannelijk woord", level: 5 }
            ]
        },
        nature: {
            name: "Natuur & Dieren",
            icon: "🌿",
            words: [
                // Niveau 1 - Basis
                { it: "il cane", nl: "de hond", note: "Mannelijk woord", level: 1 },
                { it: "il gatto", nl: "de kat", note: "Mannelijk, vrouwelijk: la gatta", level: 1 },
                { it: "l'albero", nl: "de boom", note: "Mannelijk woord", level: 1 },
                { it: "il fiore", nl: "de bloem", note: "Mannelijk woord", level: 1 },
                { it: "il mare", nl: "de zee", note: "Mannelijk woord", level: 1 },
                { it: "la montagna", nl: "de berg", note: "Vrouwelijk woord", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "il bosco", nl: "het bos", note: "Mannelijk woord", level: 2 },
                { it: "il fiume", nl: "de rivier", note: "Mannelijk woord", level: 2 },
                { it: "il lago", nl: "het meer", note: "Mannelijk woord", level: 2 },
                { it: "l'uccello", nl: "de vogel", note: "Mannelijk woord", level: 2 },
                { it: "il pesce", nl: "de vis", note: "Mannelijk woord", level: 2 },
                { it: "la rosa", nl: "de roos", note: "Vrouwelijk woord", level: 2 },
                { it: "l'erba", nl: "het gras / het kruid", note: "Vrouwelijk woord", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "la farfalla", nl: "de vlinder", note: "Vrouwelijk woord", level: 3 },
                { it: "l'ape", nl: "de bij", note: "Vrouwelijk woord", level: 3 },
                { it: "il lupo", nl: "de wolf", note: "Mannelijk woord", level: 3 },
                { it: "la volpe", nl: "de vos", note: "Vrouwelijk woord", level: 3 },
                { it: "il cervo", nl: "het hert", note: "Mannelijk woord", level: 3 },
                { it: "la spiaggia", nl: "het strand", note: "Vrouwelijk woord", level: 3 },
                { it: "la cascata", nl: "de waterval", note: "Vrouwelijk woord", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "il paesaggio", nl: "het landschap", note: "Mannelijk woord", level: 4 },
                { it: "la foresta", nl: "het woud / de wildernis", note: "Vrouwelijk woord", level: 4 },
                { it: "il vulcano", nl: "de vulkaan", note: "Mannelijk woord, bijv. Etna", level: 4 },
                { it: "il terremoto", nl: "de aardbeving", note: "Mannelijk woord", level: 4 },
                { it: "la quercia", nl: "de eik", note: "Vrouwelijk woord", level: 4 },
                { it: "l'aquila", nl: "de adelaar", note: "Vrouwelijk woord, ook: de hoofdstad", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "la biodiversità", nl: "de biodiversiteit", note: "Vrouwelijk woord", level: 5 },
                { it: "il cambiamento climatico", nl: "de klimaatverandering", note: "Mannelijk woord", level: 5 },
                { it: "la fauna", nl: "de fauna / de diersoorten", note: "Vrouwelijk woord", level: 5 },
                { it: "la flora", nl: "de flora / de plantensoorten", note: "Vrouwelijk woord", level: 5 },
                { it: "il cinghiale", nl: "het wild zwijn", note: "Mannelijk woord, veel in Toscane", level: 5 },
                { it: "la riserva naturale", nl: "het natuurreservaat", note: "Vrouwelijk woord", level: 5 }
            ]
        },
        health: {
            name: "Gezondheid",
            icon: "🏥",
            words: [
                // Niveau 1 - Basis
                { it: "il dottore", nl: "de dokter (m)", note: "Vrouwelijk: la dottoressa", level: 1 },
                { it: "l'ospedale", nl: "het ziekenhuis", note: "Mannelijk woord", level: 1 },
                { it: "la medicina", nl: "de medicijn / de geneeskunde", note: "Vrouwelijk woord", level: 1 },
                { it: "la salute", nl: "de gezondheid", note: "Vrouwelijk woord, toast: Salute!", level: 1 },
                { it: "il mal di testa", nl: "de hoofdpijn", note: "Mannelijk woord", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "la febbre", nl: "de koorts", note: "Vrouwelijk woord", level: 2 },
                { it: "il raffreddore", nl: "de verkoudheid", note: "Mannelijk woord", level: 2 },
                { it: "il mal di gola", nl: "de keelpijn", note: "Mannelijk woord", level: 2 },
                { it: "la farmacia", nl: "de apotheek", note: "Vrouwelijk woord", level: 2 },
                { it: "il farmacista", nl: "de apotheker", note: "Vrouwelijk: la farmacista", level: 2 },
                { it: "la visita medica", nl: "het doktersbezoek", note: "Vrouwelijk woord", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "l'allergia", nl: "de allergie", note: "Vrouwelijk woord", level: 3 },
                { it: "il pronto soccorso", nl: "de eerste hulp / spoedeisende hulp", note: "Mannelijk woord", level: 3 },
                { it: "la ricetta", nl: "het recept (medisch)", note: "Vrouwelijk woord, ook: kookrecept", level: 3 },
                { it: "la pressione del sangue", nl: "de bloeddruk", note: "Vrouwelijk woord", level: 3 },
                { it: "stare male", nl: "zich niet goed voelen / ziek zijn", note: "Letterlijk: slecht zijn", level: 3 },
                { it: "stare bene", nl: "zich goed voelen / gezond zijn", note: "Letterlijk: goed zijn", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "l'ambulanza", nl: "de ambulance", note: "Vrouwelijk woord", level: 4 },
                { it: "il chirurgo", nl: "de chirurg", note: "Mannelijk woord", level: 4 },
                { it: "l'intervento chirurgico", nl: "de operatie", note: "Mannelijk woord", level: 4 },
                { it: "la radiografia", nl: "de röntgenfoto", note: "Vrouwelijk woord", level: 4 },
                { it: "il dolore", nl: "de pijn", note: "Mannelijk woord", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "la diagnosi", nl: "de diagnose", note: "Vrouwelijk woord", level: 5 },
                { it: "la terapia", nl: "de therapie / de behandeling", note: "Vrouwelijk woord", level: 5 },
                { it: "il reparto", nl: "de afdeling (ziekenhuis)", note: "Mannelijk woord", level: 5 },
                { it: "la convalescenza", nl: "het herstel / het genezingsproces", note: "Vrouwelijk woord", level: 5 },
                { it: "l'assicurazione sanitaria", nl: "de ziektekostenverzekering", note: "Vrouwelijk woord", level: 5 }
            ]
        },
        shopping: {
            name: "Winkelen",
            icon: "🛍️",
            words: [
                // Niveau 1 - Basis
                { it: "il negozio", nl: "de winkel", note: "Mannelijk woord", level: 1 },
                { it: "comprare", nl: "kopen", note: "Regelmatig -are", level: 1 },
                { it: "vendere", nl: "verkopen", note: "Regelmatig -ere", level: 1 },
                { it: "il prezzo", nl: "de prijs", note: "Mannelijk woord", level: 1 },
                { it: "quanto costa?", nl: "hoeveel kost het?", note: "Standaardzin bij winkelen", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "il mercato", nl: "de markt", note: "Mannelijk woord", level: 2 },
                { it: "il supermercato", nl: "de supermarkt", note: "Mannelijk woord", level: 2 },
                { it: "la cassa", nl: "de kassa", note: "Vrouwelijk woord", level: 2 },
                { it: "lo scontrino", nl: "het kassabonnetje", note: "Mannelijk woord", level: 2 },
                { it: "la borsa", nl: "de tas", note: "Vrouwelijk woord", level: 2 },
                { it: "pagare", nl: "betalen", note: "Regelmatig -are", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "lo sconto", nl: "de korting", note: "Mannelijk woord", level: 3 },
                { it: "la vetrina", nl: "de etalage", note: "Vrouwelijk woord", level: 3 },
                { it: "il camerino", nl: "het kleedhokje / de paskamer", note: "Mannelijk woord", level: 3 },
                { it: "la taglia", nl: "de maat (kleding)", note: "Vrouwelijk woord", level: 3 },
                { it: "provare", nl: "passen (kleding) / proberen", note: "Regelmatig -are", level: 3 },
                { it: "il reparto", nl: "de afdeling (winkel)", note: "Mannelijk woord", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "il commesso", nl: "de winkelbediende (m)", note: "Vrouwelijk: la commessa", level: 4 },
                { it: "fare shopping", nl: "shoppen / winkelen", note: "Engelstalige uitdrukking", level: 4 },
                { it: "la ricevuta", nl: "het reçu / het bewijs van betaling", note: "Vrouwelijk woord", level: 4 },
                { it: "il rimborso", nl: "de terugbetaling / het geld terug", note: "Mannelijk woord", level: 4 },
                { it: "il buono regalo", nl: "de cadeaubon", note: "Mannelijk woord", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "la boutique", nl: "de boetiek", note: "Frans leenwoord, vrouwelijk", level: 5 },
                { it: "l'artigianato", nl: "het ambacht / het handwerk", note: "Mannelijk woord", level: 5 },
                { it: "la liquidazione", nl: "de uitverkoop / de opruiming", note: "Vrouwelijk woord", level: 5 },
                { it: "fare un affare", nl: "een koopje doen", note: "Idioom", level: 5 },
                { it: "contrattare", nl: "onderhandelen / afdingen", note: "Regelmatig -are", level: 5 }
            ]
        },
        emotions: {
            name: "Gevoelens & Emoties",
            icon: "❤️",
            words: [
                // Niveau 1 - Basis
                { it: "felice", nl: "gelukkig / blij", note: "Bijvoeglijk naamwoord", level: 1 },
                { it: "triste", nl: "verdrietig / treurig", note: "Bijvoeglijk naamwoord", level: 1 },
                { it: "arrabbiato/a", nl: "boos / kwaad", note: "Past aan naar geslacht", level: 1 },
                { it: "stanco/a", nl: "moe", note: "Past aan naar geslacht", level: 1 },
                { it: "contento/a", nl: "tevreden / blij", note: "Past aan naar geslacht", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "avere paura", nl: "bang zijn", note: "Letterlijk: angst hebben", level: 2 },
                { it: "avere vergogna", nl: "zich schamen", note: "Letterlijk: schaamte hebben", level: 2 },
                { it: "ridere", nl: "lachen", note: "Onregelmatig werkwoord", level: 2 },
                { it: "piangere", nl: "huilen", note: "Onregelmatig werkwoord", level: 2 },
                { it: "amare", nl: "houden van / liefhebben", note: "Regelmatig -are", level: 2 },
                { it: "l'amore", nl: "de liefde", note: "Mannelijk woord", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "la gioia", nl: "de vreugde / de blijdschap", note: "Vrouwelijk woord", level: 3 },
                { it: "la tristezza", nl: "de verdrietigheid / de droefheid", note: "Vrouwelijk woord", level: 3 },
                { it: "l'ansia", nl: "de angst / de bezorgdheid", note: "Vrouwelijk woord", level: 3 },
                { it: "la nostalgia", nl: "het heimwee / de nostalgie", note: "Vrouwelijk woord", level: 3 },
                { it: "emozionato/a", nl: "opgewonden / ontroerd", note: "Past aan naar geslacht", level: 3 },
                { it: "sorpreso/a", nl: "verrast", note: "Past aan naar geslacht", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "la speranza", nl: "de hoop", note: "Vrouwelijk woord", level: 4 },
                { it: "la fiducia", nl: "het vertrouwen", note: "Vrouwelijk woord", level: 4 },
                { it: "il rimpianto", nl: "het spijt / het berouw", note: "Mannelijk woord", level: 4 },
                { it: "la gelosia", nl: "de jaloezie", note: "Vrouwelijk woord", level: 4 },
                { it: "provare imbarazzo", nl: "verlegen zijn / zich schamen", note: "Letterlijk: verlegenheid voelen", level: 4 },
                // Niveau 5 - Moeilijk
                { it: "la commozione", nl: "de ontroering / de bewogenheid", note: "Vrouwelijk woord", level: 5 },
                { it: "il senso di colpa", nl: "het schuldgevoel", note: "Mannelijk woord", level: 5 },
                { it: "l'entusiasmo", nl: "het enthousiasme", note: "Mannelijk woord", level: 5 },
                { it: "la rassegnazione", nl: "de berusting", note: "Vrouwelijk woord", level: 5 },
                { it: "stravolgere qualcuno", nl: "iemand diep ontroeren / overstelpen", note: "Sterk werkwoord", level: 5 }
            ]
        }
    },

    // Grammar rules and lessons
    grammar: [
        {
            id: "articles-definite",
            topic: "Bepaalde lidwoorden",
            summary: "il, la, lo, l', i, gli, le",
            explanation: `In het Italiaans zijn er verschillende bepaalde lidwoorden, afhankelijk van het geslacht en de beginletter van het zelfstandig naamwoord.

<strong>Mannelijk enkelvoud:</strong>
• <strong>il</strong> - voor de meeste medeklinkers: il libro (het boek), il tavolo (de tafel)
• <strong>lo</strong> - voor z, s+medeklinker, gn, ps, x, y: lo zio (de oom), lo studente (de student)
• <strong>l'</strong> - voor klinkers: l'amico (de vriend), l'albero (de boom)

<strong>Vrouwelijk enkelvoud:</strong>
• <strong>la</strong> - voor medeklinkers: la casa (het huis), la donna (de vrouw)
• <strong>l'</strong> - voor klinkers: l'amica (de vriendin), l'acqua (het water)

<strong>Mannelijk meervoud:</strong>
• <strong>i</strong> - voor de meeste medeklinkers: i libri, i tavoli
• <strong>gli</strong> - voor klinkers, z, s+medeklinker, gn, ps, x, y: gli amici, gli zii, gli studenti

<strong>Vrouwelijk meervoud:</strong>
• <strong>le</strong> - altijd: le case, le donne, le amiche`,
            examples: [
                "il ragazzo (de jongen) → i ragazzi (de jongens)",
                "la ragazza (het meisje) → le ragazze (de meisjes)",
                "lo studente (de student) → gli studenti (de studenten)",
                "l'amico (de vriend) → gli amici (de vrienden)",
                "l'amica (de vriendin) → le amiche (de vriendinnen)"
            ],
            exercises: [
                {
                    question: "Welk lidwoord past bij 'libro' (boek)?",
                    options: ["il", "la", "lo", "l'"],
                    correct: 0,
                    explanation: "'Libro' is mannelijk en begint met een gewone medeklinker, dus we gebruiken 'il'."
                },
                {
                    question: "Welk lidwoord past bij 'acqua' (water)?",
                    options: ["il", "la", "lo", "l'"],
                    correct: 3,
                    explanation: "'Acqua' is vrouwelijk en begint met een klinker, dus we gebruiken 'l''."
                },
                {
                    question: "Welk lidwoord past bij 'studente' (student)?",
                    options: ["il", "la", "lo", "l'"],
                    correct: 2,
                    explanation: "'Studente' is mannelijk en begint met s+medeklinker (st), dus we gebruiken 'lo'."
                },
                {
                    question: "Wat is het meervoud van 'il libro'?",
                    options: ["i libri", "gli libri", "le libri", "lo libri"],
                    correct: 0,
                    explanation: "Mannelijke woorden met 'il' krijgen 'i' in het meervoud: i libri."
                },
                {
                    question: "Welk lidwoord past bij 'zio' (oom)?",
                    options: ["il", "la", "lo", "l'"],
                    correct: 2,
                    explanation: "'Zio' is mannelijk en begint met z, dus we gebruiken 'lo'."
                }
            ]
        },
        {
            id: "articles-indefinite",
            topic: "Onbepaalde lidwoorden",
            summary: "un, uno, una, un'",
            explanation: `De onbepaalde lidwoorden in het Italiaans zijn vergelijkbaar met 'een' in het Nederlands.

<strong>Mannelijk:</strong>
• <strong>un</strong> - voor de meeste medeklinkers en klinkers: un libro, un amico
• <strong>uno</strong> - voor z, s+medeklinker, gn, ps, x, y: uno zio, uno studente

<strong>Vrouwelijk:</strong>
• <strong>una</strong> - voor medeklinkers: una casa, una donna
• <strong>un'</strong> - voor klinkers: un'amica, un'idea

Let op: Er is geen meervoudsvorm van onbepaalde lidwoorden. In het meervoud laat je het lidwoord weg of gebruik je 'alcuni/alcune' (enkele).`,
            examples: [
                "un libro (een boek)",
                "uno studente (een student)",
                "una casa (een huis)",
                "un'amica (een vriendin)",
                "Compro libri. (Ik koop boeken.) - zonder lidwoord"
            ],
            exercises: [
                {
                    question: "Welk lidwoord past bij 'ragazzo' (jongen)?",
                    options: ["un", "uno", "una", "un'"],
                    correct: 0,
                    explanation: "'Ragazzo' is mannelijk en begint met een gewone medeklinker, dus we gebruiken 'un'."
                },
                {
                    question: "Welk lidwoord past bij 'studentessa' (studente)?",
                    options: ["un", "uno", "una", "un'"],
                    correct: 2,
                    explanation: "'Studentessa' is vrouwelijk en begint met een medeklinker, dus we gebruiken 'una'."
                },
                {
                    question: "Welk lidwoord past bij 'idea' (idee)?",
                    options: ["un", "uno", "una", "un'"],
                    correct: 3,
                    explanation: "'Idea' is vrouwelijk en begint met een klinker, dus we gebruiken 'un''."
                },
                {
                    question: "Welk lidwoord past bij 'zaino' (rugzak)?",
                    options: ["un", "uno", "una", "un'"],
                    correct: 1,
                    explanation: "'Zaino' is mannelijk en begint met z, dus we gebruiken 'uno'."
                }
            ]
        },
        {
            id: "adjectives",
            topic: "Bijvoeglijke naamwoorden",
            summary: "Verbuiging naar geslacht en getal",
            explanation: `Italiaanse bijvoeglijke naamwoorden veranderen naar geslacht (mannelijk/vrouwelijk) en getal (enkelvoud/meervoud).

<strong>Type 1: -o/-a/-i/-e</strong>
• mannelijk enkelvoud: -o (bello)
• vrouwelijk enkelvoud: -a (bella)
• mannelijk meervoud: -i (belli)
• vrouwelijk meervoud: -e (belle)

<strong>Type 2: -e/-i</strong>
Sommige bijvoeglijke naamwoorden hebben dezelfde vorm voor mannelijk en vrouwelijk:
• enkelvoud: -e (grande, verde, interessante)
• meervoud: -i (grandi, verdi, interessanti)

<strong>Onveranderlijke bijvoeglijke naamwoorden:</strong>
Sommige kleuren veranderen niet: blu, rosa, viola, arancione, marrone.

<strong>Positie:</strong>
Meestal komen bijvoeglijke naamwoorden NA het zelfstandig naamwoord:
• una macchina rossa (een rode auto)
• un libro interessante (een interessant boek)

Maar sommige korte, veelgebruikte bijvoeglijke naamwoorden komen VOOR het zn:
• bello, brutto, buono, cattivo, grande, piccolo, nuovo, vecchio, giovane`,
            examples: [
                "il ragazzo alto (de lange jongen) → i ragazzi alti",
                "la ragazza alta (het lange meisje) → le ragazze alte",
                "un libro grande (een groot boek) → libri grandi",
                "una bella casa (een mooi huis) → belle case",
                "la macchina blu (de blauwe auto) → le macchine blu"
            ],
            exercises: [
                {
                    question: "Hoe zeg je 'de witte huizen'?",
                    options: ["le case bianco", "le case bianche", "le case bianchi", "i case bianchi"],
                    correct: 1,
                    explanation: "'Case' is vrouwelijk meervoud, dus 'bianco' wordt 'bianche'."
                },
                {
                    question: "Hoe zeg je 'een interessant boek'?",
                    options: ["un libro interessanto", "un libro interessante", "una libro interessante", "un libro interessa"],
                    correct: 1,
                    explanation: "'Interessante' is een -e bijvoeglijk naamwoord en verandert niet naar geslacht in het enkelvoud."
                },
                {
                    question: "Hoe zeg je 'de groene appels'?",
                    options: ["le mele verde", "i mele verdi", "le mele verdi", "la mele verde"],
                    correct: 2,
                    explanation: "'Mele' (appels) is vrouwelijk meervoud. 'Verde' wordt 'verdi' in het meervoud."
                }
            ]
        },
        {
            id: "prepositions",
            topic: "Voorzetsels",
            summary: "di, a, da, in, con, su, per, tra/fra",
            explanation: `De belangrijkste Italiaanse voorzetsels en hun gebruik:

<strong>di</strong> (van, uit)
• bezit: il libro di Marco (het boek van Marco)
• herkomst: Sono di Amsterdam (Ik kom uit Amsterdam)
• materiaal: una tavola di legno (een houten tafel)

<strong>a</strong> (naar, aan, in, om)
• richting: Vado a Roma (Ik ga naar Rome)
• locatie (stad): Abito a Milano (Ik woon in Milaan)
• tijd: alle tre (om drie uur)

<strong>da</strong> (van...af, bij, sinds)
• vertrekpunt: Vengo da casa (Ik kom van huis)
• bij personen: Vado da Maria (Ik ga naar Maria's huis)
• sinds: Studio italiano da un anno (Ik studeer Italiaans sinds een jaar)

<strong>in</strong> (in, naar)
• landen: in Italia (in Italië)
• vervoer: in macchina (met de auto)

<strong>con</strong> (met)
• Vengo con te (Ik kom met jou)

<strong>su</strong> (op)
• Il libro è sul tavolo (Het boek ligt op de tafel)

<strong>per</strong> (voor, om te)
• È per te (Het is voor jou)
• Studio per imparare (Ik studeer om te leren)

<strong>tra/fra</strong> (tussen, over)
• tra due ore (over twee uur)`,
            examples: [
                "Vado a scuola. (Ik ga naar school.)",
                "Vengo da Milano. (Ik kom uit Milaan.)",
                "Abito in Italia. (Ik woon in Italië.)",
                "Il gatto è sul divano. (De kat is op de bank.)",
                "Studio italiano da tre mesi. (Ik studeer Italiaans sinds drie maanden.)"
            ],
            exercises: [
                {
                    question: "Welk voorzetsel: 'Vado ___ Roma.' (Ik ga naar Rome.)",
                    options: ["di", "a", "da", "in"],
                    correct: 1,
                    explanation: "Voor steden gebruiken we 'a' voor richting: Vado a Roma."
                },
                {
                    question: "Welk voorzetsel: 'Abito ___ Italia.' (Ik woon in Italië.)",
                    options: ["di", "a", "da", "in"],
                    correct: 3,
                    explanation: "Voor landen gebruiken we 'in': Abito in Italia."
                },
                {
                    question: "Welk voorzetsel: 'Il libro è ___ Maria.' (Het boek is van Maria.)",
                    options: ["di", "a", "da", "per"],
                    correct: 0,
                    explanation: "Voor bezit gebruiken we 'di': Il libro è di Maria."
                },
                {
                    question: "Welk voorzetsel: 'Studio italiano ___ un anno.' (Ik studeer Italiaans sinds een jaar.)",
                    options: ["di", "a", "da", "per"],
                    correct: 2,
                    explanation: "Voor 'sinds' gebruiken we 'da': da un anno."
                }
            ]
        },
        {
            id: "negation",
            topic: "Ontkenning",
            summary: "non, mai, niente, nessuno",
            explanation: `In het Italiaans wordt de ontkenning gevormd door 'non' voor het werkwoord te plaatsen.

<strong>Basis ontkenning met 'non':</strong>
• Non parlo italiano. (Ik spreek geen Italiaans.)
• Non capisco. (Ik begrijp het niet.)

<strong>Dubbele ontkenning:</strong>
In tegenstelling tot het Nederlands, gebruikt het Italiaans vaak dubbele ontkenningen:

• <strong>non...mai</strong> (nooit): Non vado mai al cinema. (Ik ga nooit naar de bioscoop.)
• <strong>non...niente/nulla</strong> (niets): Non capisco niente. (Ik begrijp niets.)
• <strong>non...nessuno</strong> (niemand): Non conosco nessuno. (Ik ken niemand.)
• <strong>non...più</strong> (niet meer): Non abito più a Roma. (Ik woon niet meer in Rome.)
• <strong>non...ancora</strong> (nog niet): Non ho ancora mangiato. (Ik heb nog niet gegeten.)
• <strong>non...né...né</strong> (noch...noch): Non bevo né caffè né tè. (Ik drink noch koffie noch thee.)

<strong>Let op:</strong>
Als mai, niente, nessuno aan het begin van de zin staan, vervalt 'non':
• Nessuno parla. (Niemand spreekt.)
• Mai! (Nooit!)`,
            examples: [
                "Non parlo italiano. (Ik spreek geen Italiaans.)",
                "Non ho tempo. (Ik heb geen tijd.)",
                "Non vado mai in palestra. (Ik ga nooit naar de sportschool.)",
                "Non c'è nessuno. (Er is niemand.)",
                "Non mangio più carne. (Ik eet geen vlees meer.)"
            ],
            exercises: [
                {
                    question: "Hoe zeg je 'Ik spreek geen Italiaans'?",
                    options: ["Parlo non italiano.", "Non parlo italiano.", "Italiano non parlo.", "No parlo italiano."],
                    correct: 1,
                    explanation: "'Non' komt altijd direct voor het werkwoord: Non parlo italiano."
                },
                {
                    question: "Hoe zeg je 'Ik ga nooit naar de bioscoop'?",
                    options: ["Non mai vado al cinema.", "Vado non mai al cinema.", "Non vado mai al cinema.", "Mai non vado al cinema."],
                    correct: 2,
                    explanation: "Bij dubbele ontkenning: non + werkwoord + mai."
                },
                {
                    question: "Hoe zeg je 'Ik begrijp niets'?",
                    options: ["Capisco niente.", "Non capisco niente.", "Niente non capisco.", "Non niente capisco."],
                    correct: 1,
                    explanation: "Dubbele ontkenning met 'non' voor het werkwoord en 'niente' erna."
                }
            ]
        },
        {
            id: "questions",
            topic: "Vraagzinnen",
            summary: "Chi, che, dove, quando, perché, come, quanto",
            explanation: `In het Italiaans kun je vragen stellen door de intonatie te veranderen of door vraagwoorden te gebruiken.

<strong>Ja/nee-vragen:</strong>
Gewoon de intonatie verhogen aan het einde:
• Parli italiano? (Spreek je Italiaans?)
• Sei italiano? (Ben je Italiaans?)

<strong>Vraagwoorden:</strong>
• <strong>Chi?</strong> (Wie?): Chi è? (Wie is het?)
• <strong>Che? / Che cosa? / Cosa?</strong> (Wat?): Che fai? / Cosa fai? (Wat doe je?)
• <strong>Dove?</strong> (Waar?): Dove abiti? (Waar woon je?)
• <strong>Quando?</strong> (Wanneer?): Quando parti? (Wanneer vertrek je?)
• <strong>Perché?</strong> (Waarom?): Perché studi italiano? (Waarom studeer je Italiaans?)
• <strong>Come?</strong> (Hoe?): Come stai? (Hoe gaat het?)
• <strong>Quanto/a/i/e?</strong> (Hoeveel?): Quanto costa? (Hoeveel kost het?)
• <strong>Quale/i?</strong> (Welke?): Quale libro? (Welk boek?)

<strong>Woordvolgorde:</strong>
Meestal: vraagwoord + werkwoord + onderwerp
• Dove abita Marco? (Waar woont Marco?)
• Cosa mangi? (Wat eet je?)`,
            examples: [
                "Chi sei? (Wie ben je?)",
                "Cosa fai stasera? (Wat doe je vanavond?)",
                "Dove lavori? (Waar werk je?)",
                "Quando arrivi? (Wanneer kom je aan?)",
                "Perché non vieni? (Waarom kom je niet?)",
                "Come ti chiami? (Hoe heet je?)",
                "Quanti anni hai? (Hoe oud ben je?)"
            ],
            exercises: [
                {
                    question: "Welk vraagwoord: '___ ti chiami?' (Hoe heet je?)",
                    options: ["Chi", "Che", "Come", "Dove"],
                    correct: 2,
                    explanation: "'Come' betekent 'hoe': Come ti chiami?"
                },
                {
                    question: "Welk vraagwoord: '___ abiti?' (Waar woon je?)",
                    options: ["Chi", "Quando", "Come", "Dove"],
                    correct: 3,
                    explanation: "'Dove' betekent 'waar': Dove abiti?"
                },
                {
                    question: "Welk vraagwoord: '___ costa?' (Hoeveel kost het?)",
                    options: ["Quanto", "Quale", "Come", "Che"],
                    correct: 0,
                    explanation: "'Quanto' betekent 'hoeveel': Quanto costa?"
                },
                {
                    question: "Welk vraagwoord: '___ studi italiano?' (Waarom studeer je Italiaans?)",
                    options: ["Come", "Quando", "Perché", "Dove"],
                    correct: 2,
                    explanation: "'Perché' betekent 'waarom': Perché studi italiano?"
                }
            ]
        },
        {
            id: "pronouns-subject",
            topic: "Persoonlijke voornaamwoorden",
            summary: "io, tu, lui/lei, noi, voi, loro",
            explanation: `In het Italiaans worden persoonlijke voornaamwoorden (onderwerp) vaak weggelaten omdat de werkwoordsvorm al aangeeft wie het onderwerp is.

<strong>Enkelvoud:</strong>
• <strong>io</strong> - ik
• <strong>tu</strong> - jij (informeel)
• <strong>lui</strong> - hij
• <strong>lei</strong> - zij
• <strong>Lei</strong> - u (formeel, met hoofdletter)

<strong>Meervoud:</strong>
• <strong>noi</strong> - wij
• <strong>voi</strong> - jullie
• <strong>loro</strong> - zij (meervoud)

<strong>Wanneer gebruik je het voornaamwoord?</strong>
• Voor nadruk: <em>Io</em> parlo italiano! (IK spreek Italiaans!)
• Voor contrast: Io lavoro, tu riposi. (Ik werk, jij rust.)
• Na anche/neanche: Anche io! (Ik ook!)

<strong>Let op:</strong> In de meeste gevallen laat je het voornaamwoord weg:
• Parlo italiano. (Ik spreek Italiaans.) - io is weggelaten`,
            examples: [
                "Io sono italiano. (Ik ben Italiaans.) - met nadruk",
                "Parli italiano? (Spreek je Italiaans?) - tu weggelaten",
                "Lei è molto gentile. (U bent erg vriendelijk.) - formeel",
                "Anche noi veniamo! (Wij komen ook!)",
                "Loro abitano a Roma. (Zij wonen in Rome.)"
            ],
            exercises: [
                {
                    question: "Welk voornaamwoord gebruik je voor 'u' (formeel)?",
                    options: ["tu", "voi", "Lei", "lui"],
                    correct: 2,
                    explanation: "'Lei' (met hoofdletter) is de formele vorm voor 'u'."
                },
                {
                    question: "Wat betekent 'loro'?",
                    options: ["wij", "jullie", "hij", "zij (meervoud)"],
                    correct: 3,
                    explanation: "'Loro' betekent 'zij' (meervoud)."
                },
                {
                    question: "Wanneer gebruik je het voornaamwoord WEL expliciet?",
                    options: ["Altijd", "Nooit", "Voor nadruk of contrast", "Alleen in vragen"],
                    correct: 2,
                    explanation: "Je gebruikt het voornaamwoord voor nadruk, contrast, of na anche/neanche."
                },
                {
                    question: "'___ parlo italiano' - Welk voornaamwoord past hier voor 'ik'?",
                    options: ["Tu", "Io", "Lui", "Lei"],
                    correct: 1,
                    explanation: "'Io' betekent 'ik'."
                }
            ]
        },
        {
            id: "pronouns-direct",
            topic: "Lijdend voorwerp voornaamwoorden",
            summary: "mi, ti, lo/la, ci, vi, li/le",
            explanation: `Lijdend voorwerp voornaamwoorden vervangen het directe object in een zin.

<strong>De vormen:</strong>
• <strong>mi</strong> - mij
• <strong>ti</strong> - jou
• <strong>lo</strong> - hem/het (mannelijk)
• <strong>la</strong> - haar/het (vrouwelijk)
• <strong>La</strong> - u (formeel)
• <strong>ci</strong> - ons
• <strong>vi</strong> - jullie
• <strong>li</strong> - hen (mannelijk meervoud)
• <strong>le</strong> - hen (vrouwelijk meervoud)

<strong>Positie:</strong>
Het voornaamwoord komt VOOR het vervoegde werkwoord:
• Ti amo. (Ik hou van jou.)
• Lo vedo. (Ik zie hem.)
• La conosco. (Ik ken haar.)

<strong>Met infinitief:</strong>
Achter de infinitief (samengevoegd):
• Voglio vederti. (Ik wil je zien.)
• Posso aiutarla? (Kan ik u helpen?)`,
            examples: [
                "Mi chiami? (Bel je mij?)",
                "Ti aspetto. (Ik wacht op je.)",
                "Lo compro. (Ik koop het.) - mannelijk object",
                "La mangio. (Ik eet het op.) - vrouwelijk object (bijv. la pizza)",
                "Li vedo domani. (Ik zie hen morgen.) - mannelijk mv"
            ],
            exercises: [
                {
                    question: "'Io ___ vedo.' (Ik zie hem.) - Welk voornaamwoord?",
                    options: ["lo", "la", "li", "le"],
                    correct: 0,
                    explanation: "'Lo' is het lijdend voorwerp voor 'hem' of een mannelijk enkelvoudig object."
                },
                {
                    question: "Waar staat het lijdend voorwerp voornaamwoord normaal?",
                    options: ["Na het werkwoord", "Voor het werkwoord", "Aan het einde", "Maakt niet uit"],
                    correct: 1,
                    explanation: "Het lijdend voorwerp voornaamwoord staat VOOR het vervoegde werkwoord."
                },
                {
                    question: "'Mangio la pizza' wordt met voornaamwoord:",
                    options: ["Lo mangio", "La mangio", "Li mangio", "Le mangio"],
                    correct: 1,
                    explanation: "'Pizza' is vrouwelijk, dus gebruiken we 'la': La mangio."
                },
                {
                    question: "Hoe zeg je 'Ik wacht op jullie'?",
                    options: ["Ti aspetto", "Vi aspetto", "Li aspetto", "Ci aspetto"],
                    correct: 1,
                    explanation: "'Vi' is het lijdend voorwerp voor 'jullie': Vi aspetto."
                }
            ]
        },
        {
            id: "possessives",
            topic: "Bezittelijke voornaamwoorden",
            summary: "mio, tuo, suo, nostro, vostro, loro",
            explanation: `Bezittelijke voornaamwoorden geven bezit aan en passen zich aan naar geslacht en getal.

<strong>De vormen:</strong>
| Bezitter | Mann. enk. | Vrouw. enk. | Mann. mv. | Vrouw. mv. |
|----------|------------|-------------|-----------|------------|
| mijn | mio | mia | miei | mie |
| jouw | tuo | tua | tuoi | tue |
| zijn/haar | suo | sua | suoi | sue |
| ons | nostro | nostra | nostri | nostre |
| jullie | vostro | vostra | vostri | vostre |
| hun | loro | loro | loro | loro |

<strong>Met lidwoord:</strong>
Meestal staat er een lidwoord voor:
• il mio libro (mijn boek)
• la tua casa (jouw huis)
• i nostri amici (onze vrienden)

<strong>Uitzondering - familie enkelvoud:</strong>
Geen lidwoord bij familieleden in enkelvoud (behalve loro):
• mia madre (mijn moeder) - NIET: la mia madre
• tuo fratello (jouw broer)
• MAAR: la mia mamma (informeel), i miei genitori (meervoud)`,
            examples: [
                "Il mio cane è grande. (Mijn hond is groot.)",
                "Dov'è la tua macchina? (Waar is jouw auto?)",
                "Mia sorella abita a Milano. (Mijn zus woont in Milaan.) - geen lidwoord",
                "I suoi libri sono interessanti. (Zijn/haar boeken zijn interessant.)",
                "La loro casa è bella. (Hun huis is mooi.) - loro verandert niet"
            ],
            exercises: [
                {
                    question: "Hoe zeg je 'mijn boek' (boek = il libro)?",
                    options: ["mio libro", "il mio libro", "la mia libro", "il mia libro"],
                    correct: 1,
                    explanation: "'Libro' is mannelijk, dus: il mio libro."
                },
                {
                    question: "Hoe zeg je 'mijn moeder'?",
                    options: ["la mia madre", "mia madre", "il mio madre", "mio madre"],
                    correct: 1,
                    explanation: "Bij familieleden enkelvoud geen lidwoord: mia madre."
                },
                {
                    question: "Hoe zeg je 'onze vrienden' (amici = mannelijk mv)?",
                    options: ["nostro amici", "i nostri amici", "le nostre amici", "nostri amici"],
                    correct: 1,
                    explanation: "'Amici' is mannelijk meervoud: i nostri amici."
                },
                {
                    question: "Wat is bijzonder aan 'loro'?",
                    options: ["Heeft geen lidwoord", "Verandert niet naar geslacht/getal", "Wordt niet gebruikt", "Staat altijd achteraan"],
                    correct: 1,
                    explanation: "'Loro' verandert nooit: la loro casa, i loro libri, le loro amiche."
                }
            ]
        },
        {
            id: "comparatives",
            topic: "Vergelijkingen",
            summary: "più, meno, come, quanto",
            explanation: `In het Italiaans maak je vergelijkingen met più (meer), meno (minder), en andere constructies.

<strong>Vergrotende trap:</strong>
• più + bijvoeglijk naamwoord + di: più alto di me (groter dan ik)
• meno + bijvoeglijk naamwoord + di: meno alto di te (kleiner dan jij)

<strong>Gelijkheid:</strong>
• così... come: così alto come te (net zo groot als jij)
• tanto... quanto: tanto bello quanto intelligente (even mooi als intelligent)
• come: grande come una casa (groot als een huis)

<strong>Overtreffende trap:</strong>
• il/la più + bijvoeglijk naamwoord: il più alto (de grootste)
• il/la meno + bijvoeglijk naamwoord: il meno caro (de minst dure)

<strong>Onregelmatige vormen:</strong>
• buono → migliore (beter) / il migliore (de beste)
• cattivo → peggiore (slechter) / il peggiore (de slechtste)
• grande → maggiore (groter) / il maggiore (de grootste)
• piccolo → minore (kleiner) / il minore (de kleinste)`,
            examples: [
                "Maria è più alta di Luca. (Maria is groter dan Luca.)",
                "Questo libro è meno interessante di quello. (Dit boek is minder interessant dan dat.)",
                "Sono stanco come te. (Ik ben net zo moe als jij.)",
                "Roma è la città più bella d'Italia. (Rome is de mooiste stad van Italië.)",
                "Questo vino è migliore. (Deze wijn is beter.)"
            ],
            exercises: [
                {
                    question: "Hoe zeg je 'groter dan'?",
                    options: ["più grande che", "più grande di", "grande più di", "di più grande"],
                    correct: 1,
                    explanation: "Vergrotende trap: più + bijvoeglijk naamwoord + di."
                },
                {
                    question: "Wat is de onregelmatige vergrotende trap van 'buono'?",
                    options: ["più buono", "migliore", "meglio", "bene"],
                    correct: 1,
                    explanation: "'Buono' wordt 'migliore' (beter). 'Meglio' is het bijwoord."
                },
                {
                    question: "Hoe zeg je 'net zo mooi als'?",
                    options: ["più bello come", "bello come", "così bello come", "meno bello di"],
                    correct: 2,
                    explanation: "Voor gelijkheid: così + bijv.nw. + come."
                },
                {
                    question: "'Roma è ___ città più grande d'Italia.' Wat ontbreekt?",
                    options: ["il", "la", "una", "niets"],
                    correct: 1,
                    explanation: "Overtreffende trap: la più grande (città is vrouwelijk)."
                }
            ]
        },
        {
            id: "reflexive",
            topic: "Wederkerend werkwoorden",
            summary: "mi, ti, si, ci, vi, si + werkwoord",
            explanation: `Wederkerend werkwoorden beschrijven acties die op jezelf terugslaan. Ze worden vervoegd met wederkerend voornaamwoorden.

<strong>Wederkerend voornaamwoorden:</strong>
• mi - mezelf (io)
• ti - jezelf (tu)
• si - zichzelf (lui/lei/Lei)
• ci - onszelf (noi)
• vi - jullie zelf (voi)
• si - zichzelf (loro)

<strong>Vervoeging voorbeeld - chiamarsi (heten):</strong>
• io mi chiamo - ik heet
• tu ti chiami - jij heet
• lui/lei si chiama - hij/zij heet
• noi ci chiamiamo - wij heten
• voi vi chiamate - jullie heten
• loro si chiamano - zij heten

<strong>Veelgebruikte wederkerend werkwoorden:</strong>
• svegliarsi - wakker worden
• alzarsi - opstaan
• lavarsi - zich wassen
• vestirsi - zich aankleden
• sentirsi - zich voelen
• divertirsi - zich vermaken
• annoiarsi - zich vervelen`,
            examples: [
                "Mi chiamo Marco. (Ik heet Marco.)",
                "A che ora ti svegli? (Hoe laat word je wakker?)",
                "Lei si veste elegantemente. (Zij kleedt zich elegant.)",
                "Ci divertiamo molto. (We vermaken ons erg.)",
                "Come vi sentite oggi? (Hoe voelen jullie je vandaag?)"
            ],
            exercises: [
                {
                    question: "Hoe zeg je 'Ik heet Anna'?",
                    options: ["Io chiamo Anna", "Mi chiamo Anna", "Ti chiami Anna", "Si chiama Anna"],
                    correct: 1,
                    explanation: "'Chiamarsi' is wederkerende: Mi chiamo Anna."
                },
                {
                    question: "Wat is het wederkerend voornaamwoord voor 'noi'?",
                    options: ["mi", "ti", "ci", "vi"],
                    correct: 2,
                    explanation: "'Ci' is het wederkerend voornaamwoord voor 'noi' (wij/ons)."
                },
                {
                    question: "'Marco ___ alza alle sette.' - Welk voornaamwoord?",
                    options: ["mi", "ti", "si", "ci"],
                    correct: 2,
                    explanation: "Marco (lui) gebruikt 'si': Marco si alza."
                },
                {
                    question: "Wat betekent 'divertirsi'?",
                    options: ["zich vergissen", "zich vermaken", "zich verstoppen", "zich verdelen"],
                    correct: 1,
                    explanation: "'Divertirsi' betekent 'zich vermaken/plezier hebben'."
                }
            ]
        },
        {
            id: "condizionale",
            topic: "Condizionale (Voorwaardelijke wijs)",
            summary: "zou/zouden - vorrei, potrei, dovresti",
            explanation: `De condizionale wordt gebruikt voor beleefd verzoeken, wensen, en hypothetische situaties.

<strong>Vorming regelmatige werkwoorden:</strong>
Infinitief + uitgangen: -ei, -esti, -ebbe, -emmo, -este, -ebbero

<strong>Voorbeeld - parlare:</strong>
• io parlerei - ik zou spreken
• tu parleresti - jij zou spreken
• lui/lei parlerebbe - hij/zij zou spreken
• noi parleremmo - wij zouden spreken
• voi parlereste - jullie zouden spreken
• loro parlerebbero - zij zouden spreken

<strong>Onregelmatige stammen:</strong>
• essere → sar- (sarei, saresti...)
• avere → avr- (avrei, avresti...)
• fare → far- (farei, faresti...)
• potere → potr- (potrei, potresti...)
• volere → vorr- (vorrei, vorresti...)
• dovere → dovr- (dovrei, dovresti...)

<strong>Gebruik:</strong>
• Beleefde verzoeken: Vorrei un caffè. (Ik zou graag een koffie willen.)
• Advies: Dovresti studiare. (Je zou moeten studeren.)
• Wensen: Mi piacerebbe viaggiare. (Ik zou graag willen reizen.)`,
            examples: [
                "Vorrei un bicchiere d'acqua, per favore. (Ik zou graag een glas water willen.)",
                "Potresti aiutarmi? (Zou je me kunnen helpen?)",
                "Dovremmo partire presto. (We zouden vroeg moeten vertrekken.)",
                "Sarebbe bello! (Dat zou mooi zijn!)",
                "Cosa faresti al mio posto? (Wat zou jij doen in mijn plaats?)"
            ],
            exercises: [
                {
                    question: "Hoe zeg je beleefd 'Ik wil een koffie'?",
                    options: ["Voglio un caffè", "Vorrei un caffè", "Volevo un caffè", "Vorrò un caffè"],
                    correct: 1,
                    explanation: "'Vorrei' (condizionale van volere) is beleefd: Vorrei un caffè."
                },
                {
                    question: "Wat is de condizionale van 'potere' voor 'tu'?",
                    options: ["puoi", "potevi", "potresti", "potrai"],
                    correct: 2,
                    explanation: "De condizionale van 'potere' voor 'tu' is 'potresti'."
                },
                {
                    question: "'Noi ___ andare al cinema.' (Wij zouden naar de bioscoop willen gaan.)",
                    options: ["vogliamo", "volevamo", "vorremmo", "vorremo"],
                    correct: 2,
                    explanation: "'Vorremmo' is de condizionale van 'volere' voor 'noi'."
                },
                {
                    question: "Wanneer gebruik je de condizionale?",
                    options: ["Voor feiten", "Voor beleefde verzoeken en wensen", "Voor het verleden", "Voor bevelen"],
                    correct: 1,
                    explanation: "De condizionale wordt gebruikt voor beleefde verzoeken, wensen, en hypothetische situaties."
                }
            ]
        },
        {
            id: "imperfetto-vs-passato",
            topic: "Imperfetto vs Passato Prossimo",
            summary: "Wanneer welke verleden tijd?",
            explanation: `Het Italiaans heeft twee veelgebruikte verleden tijden. Het kiezen van de juiste is essentieel.

<strong>Passato Prossimo - Voltooide acties:</strong>
• Eenmalige, afgeronde acties: Ieri ho mangiato una pizza. (Gisteren heb ik een pizza gegeten.)
• Acties met een specifiek begin/einde: Sono arrivato alle tre. (Ik ben om drie uur aangekomen.)
• Reeks van opeenvolgende acties: Mi sono svegliato, ho fatto colazione e sono uscito.

<strong>Imperfetto - Onvoltooide/voortdurende acties:</strong>
• Gewoontes in het verleden: Da bambino giocavo sempre. (Als kind speelde ik altijd.)
• Beschrijvingen: Era una bella giornata. (Het was een mooie dag.)
• Voortdurende acties: Mentre dormivo... (Terwijl ik sliep...)
• Leeftijd/tijd/weer: Avevo dieci anni. (Ik was tien jaar.)

<strong>Samen in één zin:</strong>
• Achtergrond (imperfetto) + actie (passato prossimo):
• Mentre dormivo, è arrivato Marco. (Terwijl ik sliep, kwam Marco aan.)
• Faceva freddo quando siamo usciti. (Het was koud toen we vertrokken.)`,
            examples: [
                "Ieri ho comprato un libro. (Gisteren kocht/heb ik een boek gekocht.) - eenmalige actie",
                "Da giovane leggevo molto. (Als jongere las ik veel.) - gewoonte",
                "Mentre cucinavo, ha telefonato Maria. (Terwijl ik kookte, belde Maria.)",
                "Il sole splendeva e gli uccelli cantavano. (De zon scheen en de vogels zongen.) - beschrijving",
                "Stamattina mi sono alzato alle sette. (Vanmorgen ben ik om zeven uur opgestaan.) - specifiek moment"
            ],
            exercises: [
                {
                    question: "'Quando ___ bambino, ___ sempre al parco.' (Als kind speelde ik altijd in het park.)",
                    options: ["sono stato / ho giocato", "ero / giocavo", "ero / ho giocato", "sono stato / giocavo"],
                    correct: 1,
                    explanation: "Beide imperfetto: 'ero' (beschrijving) en 'giocavo' (gewoonte)."
                },
                {
                    question: "'Ieri ___ una pizza.' Welke tijd?",
                    options: ["mangiavo", "ho mangiato", "mangio", "mangerò"],
                    correct: 1,
                    explanation: "'Ieri' + eenmalige actie = passato prossimo: ho mangiato."
                },
                {
                    question: "'Mentre ___, è arrivato il treno.' Welke tijd voor 'aspettare'?",
                    options: ["ho aspettato", "aspettavo", "aspetto", "aspetterò"],
                    correct: 1,
                    explanation: "'Mentre' + voortdurende actie = imperfetto: aspettavo."
                },
                {
                    question: "Welke tijd gebruik je voor beschrijvingen in het verleden?",
                    options: ["Passato prossimo", "Imperfetto", "Presente", "Futuro"],
                    correct: 1,
                    explanation: "Voor beschrijvingen (weer, uiterlijk, gevoelens) gebruik je de imperfetto."
                }
            ]
        }
    ],

    // Verbs and conjugations
    verbs: {
        regular: {
            are: [
                // Basis werkwoorden
                { infinitive: "parlare", meaning: "spreken", level: 1 },
                { infinitive: "mangiare", meaning: "eten", level: 1 },
                { infinitive: "lavorare", meaning: "werken", level: 1 },
                { infinitive: "abitare", meaning: "wonen", level: 1 },
                { infinitive: "studiare", meaning: "studeren", level: 1 },
                { infinitive: "amare", meaning: "houden van", level: 1 },
                { infinitive: "comprare", meaning: "kopen", level: 1 },
                { infinitive: "guardare", meaning: "kijken", level: 1 },
                { infinitive: "ascoltare", meaning: "luisteren", level: 1 },
                { infinitive: "giocare", meaning: "spelen", level: 1 },
                // Gevorderd -are werkwoorden
                { infinitive: "chiamare", meaning: "bellen/noemen", level: 2 },
                { infinitive: "trovare", meaning: "vinden", level: 2 },
                { infinitive: "pensare", meaning: "denken", level: 2 },
                { infinitive: "cercare", meaning: "zoeken", level: 2 },
                { infinitive: "aspettare", meaning: "wachten", level: 2 },
                { infinitive: "camminare", meaning: "lopen/wandelen", level: 2 },
                { infinitive: "cantare", meaning: "zingen", level: 2 },
                { infinitive: "cucinare", meaning: "koken", level: 2 },
                { infinitive: "pagare", meaning: "betalen", level: 2 },
                { infinitive: "tornare", meaning: "terugkeren", level: 2 },
                // Moeilijkere -are werkwoorden
                { infinitive: "provare", meaning: "proberen", level: 3 },
                { infinitive: "lasciare", meaning: "verlaten/laten", level: 3 },
                { infinitive: "portare", meaning: "dragen/brengen", level: 3 },
                { infinitive: "raccontare", meaning: "vertellen", level: 3 },
                { infinitive: "ricordare", meaning: "herinneren", level: 3 },
                { infinitive: "dimenticare", meaning: "vergeten", level: 3 },
                { infinitive: "cominciare", meaning: "beginnen", level: 3 },
                { infinitive: "cambiare", meaning: "veranderen", level: 3 },
                { infinitive: "viaggiare", meaning: "reizen", level: 3 },
                { infinitive: "arrivare", meaning: "aankomen", level: 3 },
                // Gevorderde -are werkwoorden
                { infinitive: "innamorarsi", meaning: "verliefd worden", level: 4, reflexive: true },
                { infinitive: "preoccuparsi", meaning: "zich zorgen maken", level: 4, reflexive: true },
                { infinitive: "svegliarsi", meaning: "wakker worden", level: 4, reflexive: true },
                { infinitive: "alzarsi", meaning: "opstaan", level: 4, reflexive: true },
                { infinitive: "lavarsi", meaning: "zich wassen", level: 4, reflexive: true },
                { infinitive: "sposarsi", meaning: "trouwen", level: 4, reflexive: true },
                { infinitive: "rilassarsi", meaning: "ontspannen", level: 4, reflexive: true },
                { infinitive: "arrabbiarsi", meaning: "boos worden", level: 4, reflexive: true }
            ],
            ere: [
                // Basis werkwoorden
                { infinitive: "vedere", meaning: "zien", level: 1 },
                { infinitive: "leggere", meaning: "lezen", level: 1 },
                { infinitive: "scrivere", meaning: "schrijven", level: 1 },
                { infinitive: "credere", meaning: "geloven", level: 1 },
                { infinitive: "vivere", meaning: "leven", level: 1 },
                { infinitive: "prendere", meaning: "nemen/pakken", level: 1 },
                { infinitive: "mettere", meaning: "zetten/leggen", level: 1 },
                { infinitive: "vendere", meaning: "verkopen", level: 1 },
                // Gevorderd -ere werkwoorden
                { infinitive: "correre", meaning: "rennen", level: 2 },
                { infinitive: "cadere", meaning: "vallen", level: 2 },
                { infinitive: "chiedere", meaning: "vragen", level: 2 },
                { infinitive: "rispondere", meaning: "antwoorden", level: 2 },
                { infinitive: "perdere", meaning: "verliezen", level: 2 },
                { infinitive: "ricevere", meaning: "ontvangen", level: 2 },
                { infinitive: "conoscere", meaning: "kennen/leren kennen", level: 2 },
                { infinitive: "decidere", meaning: "beslissen", level: 2 },
                // Moeilijkere -ere werkwoorden
                { infinitive: "spendere", meaning: "uitgeven (geld)", level: 3 },
                { infinitive: "accendere", meaning: "aanzetten/aansteken", level: 3 },
                { infinitive: "spegnere", meaning: "uitzetten/uitdoen", level: 3 },
                { infinitive: "promettere", meaning: "beloven", level: 3 },
                { infinitive: "permettere", meaning: "toestaan", level: 3 },
                { infinitive: "discutere", meaning: "discussiëren", level: 3 },
                { infinitive: "nascondere", meaning: "verbergen", level: 3 },
                { infinitive: "succedere", meaning: "gebeuren", level: 3 },
                // Gevorderde -ere werkwoorden
                { infinitive: "dipendere", meaning: "afhangen van", level: 4 },
                { infinitive: "insistere", meaning: "aandringen", level: 4 },
                { infinitive: "consistere", meaning: "bestaan uit", level: 4 },
                { infinitive: "esistere", meaning: "bestaan", level: 4 }
            ],
            ire: [
                // Basis werkwoorden (zonder -isc-)
                { infinitive: "dormire", meaning: "slapen", level: 1 },
                { infinitive: "partire", meaning: "vertrekken", level: 1 },
                { infinitive: "aprire", meaning: "openen", level: 1 },
                { infinitive: "sentire", meaning: "horen/voelen", level: 1 },
                { infinitive: "servire", meaning: "dienen/bedienen", level: 2 },
                { infinitive: "seguire", meaning: "volgen", level: 2 },
                { infinitive: "coprire", meaning: "bedekken", level: 2 },
                { infinitive: "offrire", meaning: "aanbieden", level: 2 },
                { infinitive: "soffrire", meaning: "lijden", level: 3 },
                { infinitive: "scoprire", meaning: "ontdekken", level: 3 },
                // Werkwoorden met -isc- (basis)
                { infinitive: "capire", meaning: "begrijpen", isc: true, level: 1 },
                { infinitive: "finire", meaning: "eindigen", isc: true, level: 1 },
                { infinitive: "preferire", meaning: "prefereren", isc: true, level: 1 },
                { infinitive: "spedire", meaning: "versturen", isc: true, level: 2 },
                // Werkwoorden met -isc- (gevorderd)
                { infinitive: "pulire", meaning: "schoonmaken", isc: true, level: 2 },
                { infinitive: "costruire", meaning: "bouwen", isc: true, level: 2 },
                { infinitive: "unire", meaning: "verenigen", isc: true, level: 3 },
                { infinitive: "colpire", meaning: "raken/slaan", isc: true, level: 3 },
                { infinitive: "guarire", meaning: "genezen", isc: true, level: 3 },
                { infinitive: "proibire", meaning: "verbieden", isc: true, level: 3 },
                { infinitive: "suggerire", meaning: "suggereren", isc: true, level: 3 },
                { infinitive: "dimagrire", meaning: "afvallen", isc: true, level: 4 },
                { infinitive: "ingrassare", meaning: "aankomen (gewicht)", isc: true, level: 4 },
                // Wederkerende -ire werkwoorden
                { infinitive: "vestirsi", meaning: "zich aankleden", level: 3, reflexive: true },
                { infinitive: "divertirsi", meaning: "zich vermaken", level: 3, reflexive: true }
            ]
        },
        irregular: [
            {
                infinitive: "essere",
                meaning: "zijn",
                level: 1,
                presente: { io: "sono", tu: "sei", lui: "è", noi: "siamo", voi: "siete", loro: "sono" },
                passatoProssimo: { auxiliary: "essere", participle: "stato" },
                imperfetto: { io: "ero", tu: "eri", lui: "era", noi: "eravamo", voi: "eravate", loro: "erano" },
                futuro: { io: "sarò", tu: "sarai", lui: "sarà", noi: "saremo", voi: "sarete", loro: "saranno" },
                condizionale: { io: "sarei", tu: "saresti", lui: "sarebbe", noi: "saremmo", voi: "sareste", loro: "sarebbero" }
            },
            {
                infinitive: "avere",
                meaning: "hebben",
                level: 1,
                presente: { io: "ho", tu: "hai", lui: "ha", noi: "abbiamo", voi: "avete", loro: "hanno" },
                passatoProssimo: { auxiliary: "avere", participle: "avuto" },
                imperfetto: { io: "avevo", tu: "avevi", lui: "aveva", noi: "avevamo", voi: "avevate", loro: "avevano" },
                futuro: { io: "avrò", tu: "avrai", lui: "avrà", noi: "avremo", voi: "avrete", loro: "avranno" },
                condizionale: { io: "avrei", tu: "avresti", lui: "avrebbe", noi: "avremmo", voi: "avreste", loro: "avrebbero" }
            },
            {
                infinitive: "fare",
                meaning: "doen/maken",
                level: 1,
                presente: { io: "faccio", tu: "fai", lui: "fa", noi: "facciamo", voi: "fate", loro: "fanno" },
                passatoProssimo: { auxiliary: "avere", participle: "fatto" },
                imperfetto: { io: "facevo", tu: "facevi", lui: "faceva", noi: "facevamo", voi: "facevate", loro: "facevano" },
                futuro: { io: "farò", tu: "farai", lui: "farà", noi: "faremo", voi: "farete", loro: "faranno" },
                condizionale: { io: "farei", tu: "faresti", lui: "farebbe", noi: "faremmo", voi: "fareste", loro: "farebbero" }
            },
            {
                infinitive: "andare",
                meaning: "gaan",
                level: 1,
                presente: { io: "vado", tu: "vai", lui: "va", noi: "andiamo", voi: "andate", loro: "vanno" },
                passatoProssimo: { auxiliary: "essere", participle: "andato" },
                imperfetto: { io: "andavo", tu: "andavi", lui: "andava", noi: "andavamo", voi: "andavate", loro: "andavano" },
                futuro: { io: "andrò", tu: "andrai", lui: "andrà", noi: "andremo", voi: "andrete", loro: "andranno" },
                condizionale: { io: "andrei", tu: "andresti", lui: "andrebbe", noi: "andremmo", voi: "andreste", loro: "andrebbero" }
            },
            {
                infinitive: "venire",
                meaning: "komen",
                level: 1,
                presente: { io: "vengo", tu: "vieni", lui: "viene", noi: "veniamo", voi: "venite", loro: "vengono" },
                passatoProssimo: { auxiliary: "essere", participle: "venuto" },
                imperfetto: { io: "venivo", tu: "venivi", lui: "veniva", noi: "venivamo", voi: "venivate", loro: "venivano" },
                futuro: { io: "verrò", tu: "verrai", lui: "verrà", noi: "verremo", voi: "verrete", loro: "verranno" },
                condizionale: { io: "verrei", tu: "verresti", lui: "verrebbe", noi: "verremmo", voi: "verreste", loro: "verrebbero" }
            },
            {
                infinitive: "stare",
                meaning: "zijn (toestand)/blijven",
                level: 1,
                presente: { io: "sto", tu: "stai", lui: "sta", noi: "stiamo", voi: "state", loro: "stanno" },
                passatoProssimo: { auxiliary: "essere", participle: "stato" },
                imperfetto: { io: "stavo", tu: "stavi", lui: "stava", noi: "stavamo", voi: "stavate", loro: "stavano" },
                futuro: { io: "starò", tu: "starai", lui: "starà", noi: "staremo", voi: "starete", loro: "staranno" },
                condizionale: { io: "starei", tu: "staresti", lui: "starebbe", noi: "staremmo", voi: "stareste", loro: "starebbero" }
            },
            {
                infinitive: "potere",
                meaning: "kunnen",
                level: 2,
                presente: { io: "posso", tu: "puoi", lui: "può", noi: "possiamo", voi: "potete", loro: "possono" },
                passatoProssimo: { auxiliary: "avere", participle: "potuto" },
                imperfetto: { io: "potevo", tu: "potevi", lui: "poteva", noi: "potevamo", voi: "potevate", loro: "potevano" },
                futuro: { io: "potrò", tu: "potrai", lui: "potrà", noi: "potremo", voi: "potrete", loro: "potranno" },
                condizionale: { io: "potrei", tu: "potresti", lui: "potrebbe", noi: "potremmo", voi: "potreste", loro: "potrebbero" }
            },
            {
                infinitive: "volere",
                meaning: "willen",
                level: 2,
                presente: { io: "voglio", tu: "vuoi", lui: "vuole", noi: "vogliamo", voi: "volete", loro: "vogliono" },
                passatoProssimo: { auxiliary: "avere", participle: "voluto" },
                imperfetto: { io: "volevo", tu: "volevi", lui: "voleva", noi: "volevamo", voi: "volevate", loro: "volevano" },
                futuro: { io: "vorrò", tu: "vorrai", lui: "vorrà", noi: "vorremo", voi: "vorrete", loro: "vorranno" },
                condizionale: { io: "vorrei", tu: "vorresti", lui: "vorrebbe", noi: "vorremmo", voi: "vorreste", loro: "vorrebbero" }
            },
            {
                infinitive: "dovere",
                meaning: "moeten",
                level: 2,
                presente: { io: "devo", tu: "devi", lui: "deve", noi: "dobbiamo", voi: "dovete", loro: "devono" },
                passatoProssimo: { auxiliary: "avere", participle: "dovuto" },
                imperfetto: { io: "dovevo", tu: "dovevi", lui: "doveva", noi: "dovevamo", voi: "dovevate", loro: "dovevano" },
                futuro: { io: "dovrò", tu: "dovrai", lui: "dovrà", noi: "dovremo", voi: "dovrete", loro: "dovranno" },
                condizionale: { io: "dovrei", tu: "dovresti", lui: "dovrebbe", noi: "dovremmo", voi: "dovreste", loro: "dovrebbero" }
            },
            {
                infinitive: "sapere",
                meaning: "weten/kunnen",
                level: 2,
                presente: { io: "so", tu: "sai", lui: "sa", noi: "sappiamo", voi: "sapete", loro: "sanno" },
                passatoProssimo: { auxiliary: "avere", participle: "saputo" },
                imperfetto: { io: "sapevo", tu: "sapevi", lui: "sapeva", noi: "sapevamo", voi: "sapevate", loro: "sapevano" },
                futuro: { io: "saprò", tu: "saprai", lui: "saprà", noi: "sapremo", voi: "saprete", loro: "sapranno" },
                condizionale: { io: "saprei", tu: "sapresti", lui: "saprebbe", noi: "sapremmo", voi: "sapreste", loro: "saprebbero" }
            },
            {
                infinitive: "dare",
                meaning: "geven",
                level: 2,
                presente: { io: "do", tu: "dai", lui: "dà", noi: "diamo", voi: "date", loro: "danno" },
                passatoProssimo: { auxiliary: "avere", participle: "dato" },
                imperfetto: { io: "davo", tu: "davi", lui: "dava", noi: "davamo", voi: "davate", loro: "davano" },
                futuro: { io: "darò", tu: "darai", lui: "darà", noi: "daremo", voi: "darete", loro: "daranno" },
                condizionale: { io: "darei", tu: "daresti", lui: "darebbe", noi: "daremmo", voi: "dareste", loro: "darebbero" }
            },
            {
                infinitive: "dire",
                meaning: "zeggen",
                level: 2,
                presente: { io: "dico", tu: "dici", lui: "dice", noi: "diciamo", voi: "dite", loro: "dicono" },
                passatoProssimo: { auxiliary: "avere", participle: "detto" },
                imperfetto: { io: "dicevo", tu: "dicevi", lui: "diceva", noi: "dicevamo", voi: "dicevate", loro: "dicevano" },
                futuro: { io: "dirò", tu: "dirai", lui: "dirà", noi: "diremo", voi: "direte", loro: "diranno" },
                condizionale: { io: "direi", tu: "diresti", lui: "direbbe", noi: "diremmo", voi: "direste", loro: "direbbero" }
            },
            {
                infinitive: "bere",
                meaning: "drinken",
                level: 2,
                presente: { io: "bevo", tu: "bevi", lui: "beve", noi: "beviamo", voi: "bevete", loro: "bevono" },
                passatoProssimo: { auxiliary: "avere", participle: "bevuto" },
                imperfetto: { io: "bevevo", tu: "bevevi", lui: "beveva", noi: "bevevamo", voi: "bevevate", loro: "bevevano" },
                futuro: { io: "berrò", tu: "berrai", lui: "berrà", noi: "berremo", voi: "berrete", loro: "berranno" },
                condizionale: { io: "berrei", tu: "berresti", lui: "berrebbe", noi: "berremmo", voi: "berreste", loro: "berrebbero" }
            },
            {
                infinitive: "uscire",
                meaning: "uitgaan/naar buiten gaan",
                level: 2,
                presente: { io: "esco", tu: "esci", lui: "esce", noi: "usciamo", voi: "uscite", loro: "escono" },
                passatoProssimo: { auxiliary: "essere", participle: "uscito" },
                imperfetto: { io: "uscivo", tu: "uscivi", lui: "usciva", noi: "uscivamo", voi: "uscivate", loro: "uscivano" },
                futuro: { io: "uscirò", tu: "uscirai", lui: "uscirà", noi: "usciremo", voi: "uscirete", loro: "usciranno" },
                condizionale: { io: "uscirei", tu: "usciresti", lui: "uscirebbe", noi: "usciremmo", voi: "uscireste", loro: "uscirebbero" }
            },
            {
                infinitive: "tenere",
                meaning: "houden/vasthouden",
                level: 3,
                presente: { io: "tengo", tu: "tieni", lui: "tiene", noi: "teniamo", voi: "tenete", loro: "tengono" },
                passatoProssimo: { auxiliary: "avere", participle: "tenuto" },
                imperfetto: { io: "tenevo", tu: "tenevi", lui: "teneva", noi: "tenevamo", voi: "tenevate", loro: "tenevano" },
                futuro: { io: "terrò", tu: "terrai", lui: "terrà", noi: "terremo", voi: "terrete", loro: "terranno" },
                condizionale: { io: "terrei", tu: "terresti", lui: "terrebbe", noi: "terremmo", voi: "terreste", loro: "terrebbero" }
            },
            {
                infinitive: "rimanere",
                meaning: "blijven",
                level: 3,
                presente: { io: "rimango", tu: "rimani", lui: "rimane", noi: "rimaniamo", voi: "rimanete", loro: "rimangono" },
                passatoProssimo: { auxiliary: "essere", participle: "rimasto" },
                imperfetto: { io: "rimanevo", tu: "rimanevi", lui: "rimaneva", noi: "rimanevamo", voi: "rimanevate", loro: "rimanevano" },
                futuro: { io: "rimarrò", tu: "rimarrai", lui: "rimarrà", noi: "rimarremo", voi: "rimarrete", loro: "rimarranno" },
                condizionale: { io: "rimarrei", tu: "rimarresti", lui: "rimarrebbe", noi: "rimarremmo", voi: "rimarreste", loro: "rimarrebbero" }
            },
            {
                infinitive: "salire",
                meaning: "stijgen/omhooggaan",
                level: 3,
                presente: { io: "salgo", tu: "sali", lui: "sale", noi: "saliamo", voi: "salite", loro: "salgono" },
                passatoProssimo: { auxiliary: "essere", participle: "salito" },
                imperfetto: { io: "salivo", tu: "salivi", lui: "saliva", noi: "salivamo", voi: "salivate", loro: "salivano" },
                futuro: { io: "salirò", tu: "salirai", lui: "salirà", noi: "saliremo", voi: "salirete", loro: "saliranno" },
                condizionale: { io: "salirei", tu: "saliresti", lui: "salirebbe", noi: "saliremmo", voi: "salireste", loro: "salirebbero" }
            },
            {
                infinitive: "scegliere",
                meaning: "kiezen",
                level: 3,
                presente: { io: "scelgo", tu: "scegli", lui: "sceglie", noi: "scegliamo", voi: "scegliete", loro: "scelgono" },
                passatoProssimo: { auxiliary: "avere", participle: "scelto" },
                imperfetto: { io: "sceglievo", tu: "sceglievi", lui: "sceglieva", noi: "sceglievamo", voi: "sceglievate", loro: "sceglievano" },
                futuro: { io: "sceglierò", tu: "sceglierai", lui: "sceglierà", noi: "sceglieremo", voi: "sceglierete", loro: "sceglieranno" },
                condizionale: { io: "sceglierei", tu: "sceglieresti", lui: "sceglierebbe", noi: "sceglieremmo", voi: "scegliereste", loro: "sceglierebbero" }
            },
            {
                infinitive: "morire",
                meaning: "sterven",
                level: 3,
                presente: { io: "muoio", tu: "muori", lui: "muore", noi: "moriamo", voi: "morite", loro: "muoiono" },
                passatoProssimo: { auxiliary: "essere", participle: "morto" },
                imperfetto: { io: "morivo", tu: "morivi", lui: "moriva", noi: "morivamo", voi: "morivate", loro: "morivano" },
                futuro: { io: "morirò", tu: "morirai", lui: "morirà", noi: "moriremo", voi: "morirete", loro: "moriranno" },
                condizionale: { io: "morirei", tu: "moriresti", lui: "morirebbe", noi: "moriremmo", voi: "morireste", loro: "morirebbero" }
            },
            {
                infinitive: "nascere",
                meaning: "geboren worden",
                level: 3,
                presente: { io: "nasco", tu: "nasci", lui: "nasce", noi: "nasciamo", voi: "nascete", loro: "nascono" },
                passatoProssimo: { auxiliary: "essere", participle: "nato" },
                imperfetto: { io: "nascevo", tu: "nascevi", lui: "nasceva", noi: "nascevamo", voi: "nascevate", loro: "nascevano" },
                futuro: { io: "nascerò", tu: "nascerai", lui: "nascerà", noi: "nasceremo", voi: "nascerete", loro: "nasceranno" },
                condizionale: { io: "nascerei", tu: "nasceresti", lui: "nascerebbe", noi: "nasceremmo", voi: "nascereste", loro: "nascerebbero" }
            },
            {
                infinitive: "piacere",
                meaning: "bevallen/leuk vinden",
                level: 3,
                note: "Gebruikt met indirect object: Mi piace = Ik vind het leuk",
                presente: { io: "piaccio", tu: "piaci", lui: "piace", noi: "piacciamo", voi: "piacete", loro: "piacciono" },
                passatoProssimo: { auxiliary: "essere", participle: "piaciuto" },
                imperfetto: { io: "piacevo", tu: "piacevi", lui: "piaceva", noi: "piacevamo", voi: "piacevate", loro: "piacevano" },
                futuro: { io: "piacerò", tu: "piacerai", lui: "piacerà", noi: "piaceremo", voi: "piacerete", loro: "piaceranno" },
                condizionale: { io: "piacerei", tu: "piaceresti", lui: "piacerebbe", noi: "piaceremmo", voi: "piacereste", loro: "piacerebbero" }
            },
            {
                infinitive: "ridere",
                meaning: "lachen",
                level: 2,
                presente: { io: "rido", tu: "ridi", lui: "ride", noi: "ridiamo", voi: "ridete", loro: "ridono" },
                passatoProssimo: { auxiliary: "avere", participle: "riso" },
                imperfetto: { io: "ridevo", tu: "ridevi", lui: "rideva", noi: "ridevamo", voi: "ridevate", loro: "ridevano" },
                futuro: { io: "riderò", tu: "riderai", lui: "riderà", noi: "rideremo", voi: "riderete", loro: "rideranno" },
                condizionale: { io: "riderei", tu: "rideresti", lui: "riderebbe", noi: "rideremmo", voi: "ridereste", loro: "riderebbero" }
            },
            {
                infinitive: "piangere",
                meaning: "huilen",
                level: 2,
                presente: { io: "piango", tu: "piangi", lui: "piange", noi: "piangiamo", voi: "piangete", loro: "piangono" },
                passatoProssimo: { auxiliary: "avere", participle: "pianto" },
                imperfetto: { io: "piangevo", tu: "piangevi", lui: "piangeva", noi: "piangevamo", voi: "piangevate", loro: "piangevano" },
                futuro: { io: "piangerò", tu: "piangerai", lui: "piangerà", noi: "piangeremo", voi: "piangerete", loro: "piangeranno" },
                condizionale: { io: "piangerei", tu: "piangeresti", lui: "piangerebbe", noi: "piangeremmo", voi: "piangereste", loro: "piangerebbero" }
            },
            {
                infinitive: "sedere",
                meaning: "zitten",
                level: 2,
                presente: { io: "siedo", tu: "siedi", lui: "siede", noi: "sediamo", voi: "sedete", loro: "siedono" },
                passatoProssimo: { auxiliary: "essere", participle: "seduto" },
                imperfetto: { io: "sedevo", tu: "sedevi", lui: "sedeva", noi: "sedevamo", voi: "sedevate", loro: "sedevano" },
                futuro: { io: "sederò", tu: "sederai", lui: "sederà", noi: "sederemo", voi: "sederete", loro: "sederanno" },
                condizionale: { io: "sederei", tu: "sederesti", lui: "sederebbe", noi: "sederemmo", voi: "sedereste", loro: "sederebbero" }
            },
            {
                infinitive: "tradurre",
                meaning: "vertalen",
                level: 4,
                presente: { io: "traduco", tu: "traduci", lui: "traduce", noi: "traduciamo", voi: "traducete", loro: "traducono" },
                passatoProssimo: { auxiliary: "avere", participle: "tradotto" },
                imperfetto: { io: "traducevo", tu: "traducevi", lui: "traduceva", noi: "traducevamo", voi: "traducevate", loro: "traducevano" },
                futuro: { io: "tradurrò", tu: "tradurrai", lui: "tradurrà", noi: "tradurremo", voi: "tradurrete", loro: "tradurranno" },
                condizionale: { io: "tradurrei", tu: "tradurresti", lui: "tradurrebbe", noi: "tradurremmo", voi: "tradurreste", loro: "tradurrebbero" }
            },
            {
                infinitive: "produrre",
                meaning: "produceren",
                level: 4,
                presente: { io: "produco", tu: "produci", lui: "produce", noi: "produciamo", voi: "producete", loro: "producono" },
                passatoProssimo: { auxiliary: "avere", participle: "prodotto" },
                imperfetto: { io: "producevo", tu: "producevi", lui: "produceva", noi: "producevamo", voi: "producevate", loro: "producevano" },
                futuro: { io: "produrrò", tu: "produrrai", lui: "produrrà", noi: "produrremo", voi: "produrrete", loro: "produrranno" },
                condizionale: { io: "produrrei", tu: "produrresti", lui: "produrrebbe", noi: "produrremmo", voi: "produrreste", loro: "produrrebbero" }
            },
            {
                infinitive: "porre",
                meaning: "plaatsen/stellen",
                level: 4,
                presente: { io: "pongo", tu: "poni", lui: "pone", noi: "poniamo", voi: "ponete", loro: "pongono" },
                passatoProssimo: { auxiliary: "avere", participle: "posto" },
                imperfetto: { io: "ponevo", tu: "ponevi", lui: "poneva", noi: "ponevamo", voi: "ponevate", loro: "ponevano" },
                futuro: { io: "porrò", tu: "porrai", lui: "porrà", noi: "porremo", voi: "porrete", loro: "porranno" },
                condizionale: { io: "porrei", tu: "porresti", lui: "porrebbe", noi: "porremmo", voi: "porreste", loro: "porrebbero" }
            },
            {
                infinitive: "trarre",
                meaning: "trekken/halen",
                level: 4,
                presente: { io: "traggo", tu: "trai", lui: "trae", noi: "traiamo", voi: "traete", loro: "traggono" },
                passatoProssimo: { auxiliary: "avere", participle: "tratto" },
                imperfetto: { io: "traevo", tu: "traevi", lui: "traeva", noi: "traevamo", voi: "traevate", loro: "traevano" },
                futuro: { io: "trarrò", tu: "trarrai", lui: "trarrà", noi: "trarremo", voi: "trarrete", loro: "trarranno" },
                condizionale: { io: "trarrei", tu: "trarresti", lui: "trarrebbe", noi: "trarremmo", voi: "trarreste", loro: "trarrebbero" }
            }
        ],
        // Conjugation patterns for regular verbs
        patterns: {
            presente: {
                are: { io: "o", tu: "i", lui: "a", noi: "iamo", voi: "ate", loro: "ano" },
                ere: { io: "o", tu: "i", lui: "e", noi: "iamo", voi: "ete", loro: "ono" },
                ire: { io: "o", tu: "i", lui: "e", noi: "iamo", voi: "ite", loro: "ono" },
                ire_isc: { io: "isco", tu: "isci", lui: "isce", noi: "iamo", voi: "ite", loro: "iscono" }
            },
            imperfetto: {
                are: { io: "avo", tu: "avi", lui: "ava", noi: "avamo", voi: "avate", loro: "avano" },
                ere: { io: "evo", tu: "evi", lui: "eva", noi: "evamo", voi: "evate", loro: "evano" },
                ire: { io: "ivo", tu: "ivi", lui: "iva", noi: "ivamo", voi: "ivate", loro: "ivano" }
            },
            futuro: {
                are: { io: "erò", tu: "erai", lui: "erà", noi: "eremo", voi: "erete", loro: "eranno" },
                ere: { io: "erò", tu: "erai", lui: "erà", noi: "eremo", voi: "erete", loro: "eranno" },
                ire: { io: "irò", tu: "irai", lui: "irà", noi: "iremo", voi: "irete", loro: "iranno" }
            },
            passatoProssimo: {
                are: "ato",
                ere: "uto",
                ire: "ito"
            }
        },
        // Person labels
        persons: {
            io: "io (ik)",
            tu: "tu (jij)",
            lui: "lui/lei (hij/zij)",
            noi: "noi (wij)",
            voi: "voi (jullie)",
            loro: "loro (zij)"
        },
        // Tense labels and descriptions
        tenses: {
            presente: {
                name: "Presente",
                dutch: "Tegenwoordige tijd",
                description: "Gebruikt voor huidige acties en gewoontes"
            },
            passatoProssimo: {
                name: "Passato Prossimo",
                dutch: "Voltooide tijd",
                description: "Gebruikt voor voltooide acties in het verleden"
            },
            imperfetto: {
                name: "Imperfetto",
                dutch: "Onvoltooid verleden tijd",
                description: "Gebruikt voor voortdurende of herhaalde acties in het verleden"
            },
            futuro: {
                name: "Futuro Semplice",
                dutch: "Toekomende tijd",
                description: "Gebruikt voor toekomstige acties"
            }
        }
    },

    // Speaking phrases - organized by category and difficulty
    speaking: {
        greetings: {
            name: "Begroetingen",
            icon: "👋",
            phrases: [
                // Niveau 1 - Basis
                { it: "Ciao!", nl: "Hallo!", level: 1 },
                { it: "Buongiorno!", nl: "Goedemorgen!", level: 1 },
                { it: "Buonasera!", nl: "Goedenavond!", level: 1 },
                { it: "Come stai?", nl: "Hoe gaat het?", level: 1 },
                { it: "Sto bene, grazie.", nl: "Het gaat goed, bedankt.", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "E tu?", nl: "En jij?", level: 2 },
                { it: "Piacere di conoscerti.", nl: "Aangenaam kennis te maken.", level: 2 },
                { it: "Mi chiamo...", nl: "Ik heet...", level: 2 },
                { it: "Arrivederci!", nl: "Tot ziens!", level: 2 },
                { it: "A presto!", nl: "Tot snel!", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "Come sta, signore?", nl: "Hoe gaat het met u, meneer?", level: 3 },
                { it: "Molto bene, e Lei?", nl: "Heel goed, en u?", level: 3 },
                { it: "Da dove vieni?", nl: "Waar kom je vandaan?", level: 3 },
                { it: "Vengo dall'Olanda.", nl: "Ik kom uit Nederland.", level: 3 },
                { it: "Sono olandese.", nl: "Ik ben Nederlands.", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "È un piacere rivederti!", nl: "Leuk om je weer te zien!", level: 4 },
                { it: "Quanto tempo!", nl: "Lang niet gezien!", level: 4 },
                { it: "Come va la vita?", nl: "Hoe gaat het leven?", level: 4 },
                { it: "Non posso lamentarmi.", nl: "Ik kan niet klagen.", level: 4 },
                { it: "Ci vediamo presto, spero!", nl: "Hopelijk tot snel!", level: 4 }
            ]
        },
        phrases: {
            name: "Veelgebruikte zinnen",
            icon: "💬",
            phrases: [
                // Niveau 1 - Basis
                { it: "Grazie mille!", nl: "Heel erg bedankt!", level: 1 },
                { it: "Prego.", nl: "Graag gedaan.", level: 1 },
                { it: "Per favore.", nl: "Alstublieft.", level: 1 },
                { it: "Mi scusi.", nl: "Pardon. / Sorry.", level: 1 },
                { it: "Va bene.", nl: "Oké. / Het is goed.", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "Non capisco.", nl: "Ik begrijp het niet.", level: 2 },
                { it: "Può ripetere, per favore?", nl: "Kunt u dat herhalen, alstublieft?", level: 2 },
                { it: "Parla più lentamente, per favore.", nl: "Spreek alstublieft langzamer.", level: 2 },
                { it: "D'accordo.", nl: "Akkoord. / Mee eens.", level: 2 },
                { it: "Di niente.", nl: "Graag gedaan. / Niets te danken.", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "Come si dice... in italiano?", nl: "Hoe zeg je... in het Italiaans?", level: 3 },
                { it: "Che cosa significa...?", nl: "Wat betekent...?", level: 3 },
                { it: "Non lo so.", nl: "Ik weet het niet.", level: 3 },
                { it: "Penso di sì.", nl: "Ik denk van wel.", level: 3 },
                { it: "Penso di no.", nl: "Ik denk van niet.", level: 3 },
                { it: "Hai ragione.", nl: "Je hebt gelijk.", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "Mi dispiace, non parlo bene l'italiano.", nl: "Sorry, ik spreek niet goed Italiaans.", level: 4 },
                { it: "Sto imparando l'italiano.", nl: "Ik ben Italiaans aan het leren.", level: 4 },
                { it: "Potrebbe aiutarmi?", nl: "Zou u mij kunnen helpen?", level: 4 },
                { it: "Non fa niente.", nl: "Het geeft niet.", level: 4 },
                { it: "Che bello!", nl: "Wat mooi!/Geweldig!", level: 4 }
            ]
        },
        restaurant: {
            name: "Restaurant & Eten",
            icon: "🍽️",
            phrases: [
                // Niveau 1 - Basis
                { it: "Un tavolo per due, per favore.", nl: "Een tafel voor twee, alstublieft.", level: 1 },
                { it: "Il menù, per favore.", nl: "Het menu, alstublieft.", level: 1 },
                { it: "Vorrei...", nl: "Ik zou graag willen...", level: 1 },
                { it: "Un caffè, per favore.", nl: "Een koffie, alstublieft.", level: 1 },
                { it: "Il conto, per favore.", nl: "De rekening, alstublieft.", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "Cosa mi consiglia?", nl: "Wat raadt u mij aan?", level: 2 },
                { it: "Per me una pizza margherita.", nl: "Voor mij een pizza margherita.", level: 2 },
                { it: "Un bicchiere di vino rosso.", nl: "Een glas rode wijn.", level: 2 },
                { it: "L'acqua naturale o frizzante?", nl: "Plat of bruisend water?", level: 2 },
                { it: "Naturale, grazie.", nl: "Plat, bedankt.", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "Avete un tavolo libero?", nl: "Heeft u een vrije tafel?", level: 3 },
                { it: "Posso prenotare un tavolo per stasera?", nl: "Kan ik een tafel reserveren voor vanavond?", level: 3 },
                { it: "Siamo in quattro.", nl: "We zijn met z'n vieren.", level: 3 },
                { it: "Qual è il piatto del giorno?", nl: "Wat is het dagmenu?", level: 3 },
                { it: "È possibile avere il menù vegetariano?", nl: "Is het mogelijk om het vegetarische menu te krijgen?", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "Sono allergico/a alle noci.", nl: "Ik ben allergisch voor noten.", level: 4 },
                { it: "Questo piatto contiene glutine?", nl: "Bevat dit gerecht gluten?", level: 4 },
                { it: "Era tutto delizioso!", nl: "Het was allemaal heerlijk!", level: 4 },
                { it: "I miei complimenti allo chef!", nl: "Mijn complimenten aan de chef!", level: 4 },
                { it: "Posso pagare con la carta?", nl: "Kan ik met kaart betalen?", level: 4 }
            ]
        },
        shopping: {
            name: "Winkelen",
            icon: "🛍️",
            phrases: [
                // Niveau 1 - Basis
                { it: "Quanto costa?", nl: "Hoeveel kost dit?", level: 1 },
                { it: "È troppo caro.", nl: "Het is te duur.", level: 1 },
                { it: "Va bene, lo prendo.", nl: "Oké, ik neem het.", level: 1 },
                { it: "Posso pagare in contanti?", nl: "Kan ik contant betalen?", level: 1 },
                { it: "Dov'è la cassa?", nl: "Waar is de kassa?", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "Cerco una gonna.", nl: "Ik zoek een rok.", level: 2 },
                { it: "Ce l'avete in blu?", nl: "Heeft u het in het blauw?", level: 2 },
                { it: "Che taglia è?", nl: "Welke maat is het?", level: 2 },
                { it: "Posso provarlo?", nl: "Mag ik het passen?", level: 2 },
                { it: "Dov'è il camerino?", nl: "Waar is de paskamer?", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "Mi sta bene?", nl: "Staat het mij goed?", level: 3 },
                { it: "È troppo grande/piccolo.", nl: "Het is te groot/klein.", level: 3 },
                { it: "Avete una taglia più piccola?", nl: "Heeft u een kleinere maat?", level: 3 },
                { it: "Sto solo guardando, grazie.", nl: "Ik kijk alleen even rond, bedankt.", level: 3 },
                { it: "Accettate carte di credito?", nl: "Accepteert u creditcards?", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "C'è uno sconto su questo articolo?", nl: "Is er korting op dit artikel?", level: 4 },
                { it: "Posso restituirlo se non va bene?", nl: "Kan ik het terugbrengen als het niet goed is?", level: 4 },
                { it: "Vorrei cambiare questo prodotto.", nl: "Ik zou dit product willen ruilen.", level: 4 },
                { it: "Ha qualcosa di simile ma meno caro?", nl: "Heeft u iets vergelijkbaars maar goedkoper?", level: 4 },
                { it: "Mi può fare un pacchetto regalo?", nl: "Kunt u het als cadeau inpakken?", level: 4 }
            ]
        },
        directions: {
            name: "Richting & Vervoer",
            icon: "🗺️",
            phrases: [
                // Niveau 1 - Basis
                { it: "Dov'è...?", nl: "Waar is...?", level: 1 },
                { it: "Dov'è la stazione?", nl: "Waar is het station?", level: 1 },
                { it: "A destra.", nl: "Naar rechts.", level: 1 },
                { it: "A sinistra.", nl: "Naar links.", level: 1 },
                { it: "Sempre dritto.", nl: "Rechtdoor.", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "È lontano?", nl: "Is het ver?", level: 2 },
                { it: "È vicino.", nl: "Het is dichtbij.", level: 2 },
                { it: "Come arrivo a...?", nl: "Hoe kom ik bij...?", level: 2 },
                { it: "Può indicarmi la strada?", nl: "Kunt u mij de weg wijzen?", level: 2 },
                { it: "Quanto tempo ci vuole?", nl: "Hoeveel tijd kost het?", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "Vorrei un biglietto per Roma.", nl: "Ik zou graag een kaartje naar Rome willen.", level: 3 },
                { it: "Andata e ritorno, per favore.", nl: "Retour, alstublieft.", level: 3 },
                { it: "Solo andata.", nl: "Enkele reis.", level: 3 },
                { it: "A che ora parte il treno?", nl: "Hoe laat vertrekt de trein?", level: 3 },
                { it: "Da quale binario parte?", nl: "Van welk perron vertrekt hij?", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "C'è un treno diretto o devo cambiare?", nl: "Is er een directe trein of moet ik overstappen?", level: 4 },
                { it: "Dove devo cambiare?", nl: "Waar moet ik overstappen?", level: 4 },
                { it: "Il treno è in ritardo?", nl: "Is de trein vertraagd?", level: 4 },
                { it: "Dov'è la fermata dell'autobus?", nl: "Waar is de bushalte?", level: 4 },
                { it: "Vorrei noleggiare una macchina.", nl: "Ik zou graag een auto willen huren.", level: 4 }
            ]
        },
        hotel: {
            name: "Hotel & Accommodatie",
            icon: "🏨",
            phrases: [
                // Niveau 1 - Basis
                { it: "Ho una prenotazione.", nl: "Ik heb een reservering.", level: 1 },
                { it: "A che nome?", nl: "Op welke naam?", level: 1 },
                { it: "Per quante notti?", nl: "Voor hoeveel nachten?", level: 1 },
                { it: "La colazione è inclusa?", nl: "Is ontbijt inbegrepen?", level: 1 },
                { it: "Dov'è la mia camera?", nl: "Waar is mijn kamer?", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "Vorrei una camera singola.", nl: "Ik zou graag een eenpersoonskamer willen.", level: 2 },
                { it: "Vorrei una camera doppia.", nl: "Ik zou graag een tweepersoonskamer willen.", level: 2 },
                { it: "C'è il wifi gratuito?", nl: "Is er gratis wifi?", level: 2 },
                { it: "Qual è la password del wifi?", nl: "Wat is het wifi-wachtwoord?", level: 2 },
                { it: "A che ora è la colazione?", nl: "Hoe laat is het ontbijt?", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "Avete camere disponibili?", nl: "Heeft u kamers beschikbaar?", level: 3 },
                { it: "Quanto costa per notte?", nl: "Hoeveel kost het per nacht?", level: 3 },
                { it: "Posso vedere la camera prima?", nl: "Mag ik de kamer eerst zien?", level: 3 },
                { it: "La camera è troppo rumorosa.", nl: "De kamer is te lawaaierig.", level: 3 },
                { it: "Potrei avere un'altra camera?", nl: "Zou ik een andere kamer kunnen krijgen?", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "L'aria condizionata non funziona.", nl: "De airconditioning werkt niet.", level: 4 },
                { it: "Potrebbe mandare qualcuno a ripararla?", nl: "Zou u iemand kunnen sturen om het te repareren?", level: 4 },
                { it: "A che ora devo lasciare la camera?", nl: "Hoe laat moet ik de kamer verlaten?", level: 4 },
                { it: "È possibile prolungare il soggiorno?", nl: "Is het mogelijk om het verblijf te verlengen?", level: 4 },
                { it: "Potrei lasciare i bagagli qui dopo il check-out?", nl: "Zou ik mijn bagage hier kunnen laten na het uitchecken?", level: 4 }
            ]
        },
        emergencies: {
            name: "Noodgevallen",
            icon: "🆘",
            phrases: [
                // Niveau 1 - Basis
                { it: "Aiuto!", nl: "Help!", level: 1 },
                { it: "Chiamate la polizia!", nl: "Bel de politie!", level: 1 },
                { it: "Chiamate un'ambulanza!", nl: "Bel een ambulance!", level: 1 },
                { it: "Ho bisogno di un medico.", nl: "Ik heb een dokter nodig.", level: 1 },
                { it: "Dov'è l'ospedale?", nl: "Waar is het ziekenhuis?", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "Mi fa male la testa.", nl: "Ik heb hoofdpijn.", level: 2 },
                { it: "Mi fa male lo stomaco.", nl: "Ik heb buikpijn.", level: 2 },
                { it: "Non mi sento bene.", nl: "Ik voel me niet lekker.", level: 2 },
                { it: "Dov'è la farmacia?", nl: "Waar is de apotheek?", level: 2 },
                { it: "Ho perso il passaporto.", nl: "Ik ben mijn paspoort kwijt.", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "Mi hanno rubato il portafoglio.", nl: "Mijn portemonnee is gestolen.", level: 3 },
                { it: "Vorrei denunciare un furto.", nl: "Ik wil een diefstal aangeven.", level: 3 },
                { it: "Sono allergico/a a...", nl: "Ik ben allergisch voor...", level: 3 },
                { it: "Ho bisogno di questa medicina.", nl: "Ik heb dit medicijn nodig.", level: 3 },
                { it: "Dov'è l'ambasciata olandese?", nl: "Waar is de Nederlandse ambassade?", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "Potrebbe chiamare il mio assicuratore?", nl: "Zou u mijn verzekeraar kunnen bellen?", level: 4 },
                { it: "Ho bisogno di un interprete.", nl: "Ik heb een tolk nodig.", level: 4 },
                { it: "Vorrei contattare la mia famiglia.", nl: "Ik zou graag contact opnemen met mijn familie.", level: 4 },
                { it: "Qual è il numero di emergenza?", nl: "Wat is het alarmnummer?", level: 4 },
                { it: "La mia macchina si è guastata.", nl: "Mijn auto is kapot gegaan.", level: 4 }
            ]
        },
        socializing: {
            name: "Sociaal & Vrijetijd",
            icon: "🎉",
            phrases: [
                // Niveau 1 - Basis
                { it: "Che lavoro fai?", nl: "Wat voor werk doe je?", level: 1 },
                { it: "Sono studente/studentessa.", nl: "Ik ben student.", level: 1 },
                { it: "Quanti anni hai?", nl: "Hoe oud ben je?", level: 1 },
                { it: "Ho venticinque anni.", nl: "Ik ben vijfentwintig jaar oud.", level: 1 },
                { it: "Sei sposato/a?", nl: "Ben je getrouwd?", level: 1 },
                // Niveau 2 - Eenvoudig
                { it: "Cosa ti piace fare?", nl: "Wat doe je graag?", level: 2 },
                { it: "Mi piace viaggiare.", nl: "Ik hou van reizen.", level: 2 },
                { it: "Mi piace leggere.", nl: "Ik hou van lezen.", level: 2 },
                { it: "Che sport pratichi?", nl: "Welke sport beoefen je?", level: 2 },
                { it: "Gioco a calcio.", nl: "Ik voetbal.", level: 2 },
                // Niveau 3 - Gemiddeld
                { it: "Ti va di prendere un caffè?", nl: "Heb je zin om een koffie te drinken?", level: 3 },
                { it: "Vuoi uscire stasera?", nl: "Wil je vanavond uitgaan?", level: 3 },
                { it: "Dove ci incontriamo?", nl: "Waar spreken we af?", level: 3 },
                { it: "A che ora?", nl: "Hoe laat?", level: 3 },
                { it: "Mi sono divertito/a molto!", nl: "Ik heb me erg vermaakt!", level: 3 },
                // Niveau 4 - Gevorderd
                { it: "Da quanto tempo vivi qui?", nl: "Hoe lang woon je hier al?", level: 4 },
                { it: "Vivo qui da tre anni.", nl: "Ik woon hier al drie jaar.", level: 4 },
                { it: "Cosa ne pensi dell'Italia?", nl: "Wat vind je van Italië?", level: 4 },
                { it: "Mi piace molto la cultura italiana.", nl: "Ik hou erg van de Italiaanse cultuur.", level: 4 },
                { it: "Possiamo scambiarci i numeri di telefono?", nl: "Kunnen we telefoonnummers uitwisselen?", level: 4 }
            ]
        },
        numbers: {
            name: "Getallen",
            icon: "🔢",
            phrases: [
                { it: "uno", nl: "een", level: 1 },
                { it: "due", nl: "twee", level: 1 },
                { it: "tre", nl: "drie", level: 1 },
                { it: "quattro", nl: "vier", level: 1 },
                { it: "cinque", nl: "vijf", level: 1 },
                { it: "sei", nl: "zes", level: 1 },
                { it: "sette", nl: "zeven", level: 1 },
                { it: "otto", nl: "acht", level: 1 },
                { it: "nove", nl: "negen", level: 1 },
                { it: "dieci", nl: "tien", level: 1 },
                { it: "venti", nl: "twintig", level: 2 },
                { it: "trenta", nl: "dertig", level: 2 },
                { it: "quaranta", nl: "veertig", level: 2 },
                { it: "cinquanta", nl: "vijftig", level: 2 },
                { it: "cento", nl: "honderd", level: 2 },
                { it: "mille", nl: "duizend", level: 3 }
            ]
        },
        vocabulary: {
            name: "Basiswoorden",
            icon: "📚",
            phrases: [
                { it: "il cane", nl: "de hond", level: 1 },
                { it: "il gatto", nl: "de kat", level: 1 },
                { it: "la casa", nl: "het huis", level: 1 },
                { it: "il libro", nl: "het boek", level: 1 },
                { it: "l'acqua", nl: "het water", level: 1 },
                { it: "il pane", nl: "het brood", level: 1 },
                { it: "la mela", nl: "de appel", level: 1 },
                { it: "il sole", nl: "de zon", level: 1 },
                { it: "la luna", nl: "de maan", level: 1 },
                { it: "il cielo", nl: "de hemel/lucht", level: 1 },
                { it: "la città", nl: "de stad", level: 2 },
                { it: "il paese", nl: "het land/dorp", level: 2 },
                { it: "la strada", nl: "de straat/weg", level: 2 },
                { it: "il tempo", nl: "de tijd/het weer", level: 2 },
                { it: "la vita", nl: "het leven", level: 2 }
            ]
        }
    }
};

// Make data globally available
window.AppData = AppData;
