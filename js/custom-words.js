// Custom Words Module
// Manages user-defined vocabulary categories stored in localStorage

const CustomWords = {
    STORAGE_KEY: 'impara_custom_vocabulary',

    // Load all custom categories from localStorage
    getAll() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            return {};
        }
    },

    // Save all custom categories to localStorage
    save(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    // Add a new category, returns the generated key
    addCategory(name, icon) {
        const data = this.getAll();
        // Generate a unique key from the name
        const baseKey = 'custom_' + name.toLowerCase()
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '')
            .substring(0, 20) || 'categorie';
        let key = baseKey;
        let counter = 1;
        while (data[key]) {
            key = baseKey + '_' + counter;
            counter++;
        }
        data[key] = {
            name: name.trim(),
            icon: icon || '📝',
            words: [],
            custom: true
        };
        this.save(data);
        return key;
    },

    // Add a word to a category
    addWord(catKey, word) {
        const data = this.getAll();
        if (!data[catKey]) return false;
        data[catKey].words.push({
            it: (word.it || '').trim(),
            nl: (word.nl || '').trim(),
            note: (word.note || '').trim(),
            level: 1
        });
        this.save(data);
        return true;
    },

    // Delete a word from a category by index
    deleteWord(catKey, wordIndex) {
        const data = this.getAll();
        if (!data[catKey] || !data[catKey].words[wordIndex]) return false;
        data[catKey].words.splice(wordIndex, 1);
        this.save(data);
        return true;
    },

    // Delete an entire custom category
    deleteCategory(catKey) {
        const data = this.getAll();
        if (!data[catKey]) return false;
        delete data[catKey];
        this.save(data);
        return true;
    },

    // Update a category's name and/or icon
    updateCategory(catKey, name, icon) {
        const data = this.getAll();
        if (!data[catKey]) return false;
        if (name) data[catKey].name = name.trim();
        if (icon) data[catKey].icon = icon.trim();
        this.save(data);
        return true;
    },

    // -------------------------
    // UI Management
    // -------------------------

    currentCategory: null,

    init() {
        this.bindNavButton();
    },

    bindNavButton() {
        // The manage button in the vocabulary section
        document.addEventListener('click', (e) => {
            if (e.target.closest('#btn-manage-custom-words')) {
                this.showManageScreen();
            }
            if (e.target.closest('#btn-close-custom-words')) {
                this.hideManageScreen();
            }
            if (e.target.closest('#btn-add-category')) {
                this.showAddCategoryForm();
            }
            if (e.target.closest('#btn-cancel-add-category')) {
                this.hideAddCategoryForm();
            }
            if (e.target.closest('#btn-save-new-category')) {
                this.saveNewCategory();
            }
            if (e.target.closest('.custom-cat-open')) {
                const key = e.target.closest('.custom-cat-open').dataset.key;
                this.showCategoryDetail(key);
            }
            if (e.target.closest('.custom-cat-delete')) {
                const key = e.target.closest('.custom-cat-delete').dataset.key;
                this.confirmDeleteCategory(key);
            }
            if (e.target.closest('#btn-back-to-categories')) {
                this.showManageScreen();
            }
            if (e.target.closest('#btn-add-word')) {
                this.showAddWordForm();
            }
            if (e.target.closest('#btn-cancel-add-word')) {
                this.hideAddWordForm();
            }
            if (e.target.closest('#btn-save-new-word')) {
                this.saveNewWord();
            }
            if (e.target.closest('.custom-word-delete')) {
                const key = e.target.closest('.custom-word-delete').dataset.key;
                const idx = parseInt(e.target.closest('.custom-word-delete').dataset.index);
                this.confirmDeleteWord(key, idx);
            }
        });
    },

    showManageScreen() {
        this.currentCategory = null;
        const screen = document.getElementById('custom-words-screen');
        if (screen) screen.classList.remove('hidden');
        document.getElementById('custom-words-list').classList.remove('hidden');
        document.getElementById('custom-category-detail').classList.add('hidden');
        this.renderCategoryList();
    },

    hideManageScreen() {
        const screen = document.getElementById('custom-words-screen');
        if (screen) screen.classList.add('hidden');
        // Refresh vocabulary list so new categories appear
        if (window.Vocabulary) Vocabulary.renderCategories();
    },

    renderCategoryList() {
        const container = document.getElementById('custom-categories-container');
        if (!container) return;
        const data = this.getAll();
        const keys = Object.keys(data);
        if (keys.length === 0) {
            container.innerHTML = '<p class="custom-empty">Je hebt nog geen eigen categorieën. Voeg er een toe!</p>';
            return;
        }
        container.innerHTML = keys.map(key => {
            const cat = data[key];
            return `
            <div class="custom-cat-item">
                <span class="custom-cat-icon">${cat.icon}</span>
                <div class="custom-cat-info">
                    <strong>${this.escape(cat.name)}</strong>
                    <span>${cat.words.length} woord${cat.words.length !== 1 ? 'en' : ''}</span>
                </div>
                <div class="custom-cat-actions">
                    <button class="btn btn-small custom-cat-open" data-key="${key}">✏️ Beheren</button>
                    <button class="btn btn-small btn-danger custom-cat-delete" data-key="${key}">🗑️</button>
                </div>
            </div>`;
        }).join('');
    },

    showAddCategoryForm() {
        document.getElementById('add-category-form').classList.remove('hidden');
        document.getElementById('new-cat-name').focus();
    },

    hideAddCategoryForm() {
        document.getElementById('add-category-form').classList.add('hidden');
        document.getElementById('new-cat-name').value = '';
        document.getElementById('new-cat-icon').value = '';
    },

    saveNewCategory() {
        const name = document.getElementById('new-cat-name').value.trim();
        const icon = document.getElementById('new-cat-icon').value.trim() || '📝';
        if (!name) {
            document.getElementById('new-cat-name').focus();
            return;
        }
        this.addCategory(name, icon);
        this.hideAddCategoryForm();
        this.renderCategoryList();
    },

    confirmDeleteCategory(key) {
        const data = this.getAll();
        const cat = data[key];
        if (!cat) return;
        if (confirm(`Categorie "${cat.name}" verwijderen? Alle ${cat.words.length} woorden gaan ook weg.`)) {
            this.deleteCategory(key);
            this.renderCategoryList();
        }
    },

    showCategoryDetail(key) {
        const data = this.getAll();
        const cat = data[key];
        if (!cat) return;
        this.currentCategory = key;
        document.getElementById('custom-words-list').classList.add('hidden');
        const detail = document.getElementById('custom-category-detail');
        detail.classList.remove('hidden');
        document.getElementById('detail-cat-title').textContent = cat.icon + ' ' + cat.name;
        this.renderWordList(key);
    },

    renderWordList(key) {
        const data = this.getAll();
        const cat = data[key];
        if (!cat) return;
        const container = document.getElementById('custom-words-container');
        if (cat.words.length === 0) {
            container.innerHTML = '<p class="custom-empty">Nog geen woorden in deze categorie.</p>';
            return;
        }
        container.innerHTML = cat.words.map((w, i) => `
            <div class="custom-word-item">
                <div class="custom-word-pair">
                    <span class="custom-word-it">${this.escape(w.it)}</span>
                    <span class="custom-word-arrow">→</span>
                    <span class="custom-word-nl">${this.escape(w.nl)}</span>
                    ${w.note ? `<span class="custom-word-note">${this.escape(w.note)}</span>` : ''}
                </div>
                <button class="btn btn-small btn-danger custom-word-delete" data-key="${key}" data-index="${i}">🗑️</button>
            </div>`
        ).join('');
    },

    showAddWordForm() {
        document.getElementById('add-word-form').classList.remove('hidden');
        document.getElementById('new-word-it').focus();
    },

    hideAddWordForm() {
        document.getElementById('add-word-form').classList.add('hidden');
        document.getElementById('new-word-it').value = '';
        document.getElementById('new-word-nl').value = '';
        document.getElementById('new-word-note').value = '';
    },

    saveNewWord() {
        const it = document.getElementById('new-word-it').value.trim();
        const nl = document.getElementById('new-word-nl').value.trim();
        const note = document.getElementById('new-word-note').value.trim();
        if (!it || !nl) {
            if (!it) document.getElementById('new-word-it').focus();
            else document.getElementById('new-word-nl').focus();
            return;
        }
        this.addWord(this.currentCategory, { it, nl, note });
        this.hideAddWordForm();
        this.renderWordList(this.currentCategory);
    },

    confirmDeleteWord(key, index) {
        if (confirm('Dit woord verwijderen?')) {
            this.deleteWord(key, index);
            this.renderWordList(key);
        }
    },

    escape(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }
};
