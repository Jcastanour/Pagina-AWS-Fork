// storage.js
// Maneja el guardado y extracción de datos en localStorage para funcionar 100% offline

const STORAGE_KEY = "awsTrainingProgress";

// Estructura de datos por defecto
const defaultState = {
    theme: "dark",
    flashcardsStats: {
        mastered: [], // IDs de tarjetas 'Fáciles'
        learning: []  // IDs de tarjetas 'Difíciles'
    },
    quizzes: {
        score: 0,
        taken: 0,
        mistakes: {}  // Guarda track de errores
    },
    sectionsRead: [] // Guarda secciones vistas
};

class StorageSystem {
    constructor() {
        this.load();
    }

    load() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            this.state = { ...defaultState, ...JSON.parse(stored) };
        } else {
            this.state = { ...defaultState };
            this.save();
        }
    }

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        this.updateGlobalProgress();
    }

    // Progreso
    markSectionRead(sectionId) {
        if (!this.state.sectionsRead.includes(sectionId)) {
            this.state.sectionsRead.push(sectionId);
            this.save();
        }
    }

    getGlobalProgress() {
        // Cálculo tonto: asumiendo 15 secciones teóricas en total
        const MAX_SECTIONS = 10; 
        let pct = (this.state.sectionsRead.length / MAX_SECTIONS) * 100;
        return Math.min(100, Math.round(pct));
    }

    updateGlobalProgress() {
        const el = document.getElementById("progress-bar-fill");
        const txt = document.getElementById("progress-text");
        if(el && txt) {
            const p = this.getGlobalProgress();
            el.style.width = p + "%";
            txt.innerText = p + "%";
        }
    }

    // Tema
    toggleTheme() {
        this.state.theme = this.state.theme === "dark" ? "light" : "dark";
        this.save();
        return this.state.theme;
    }
    getTheme() {
        return this.state.theme;
    }

    // Flashcards
    markFlashcard(cardIndex, isEasy) {
        // Remover de ambos
        this.state.flashcardsStats.mastered = this.state.flashcardsStats.mastered.filter(i => i !== cardIndex);
        this.state.flashcardsStats.learning = this.state.flashcardsStats.learning.filter(i => i !== cardIndex);
        
        if (isEasy) {
            this.state.flashcardsStats.mastered.push(cardIndex);
        } else {
            this.state.flashcardsStats.learning.push(cardIndex);
        }
        this.save();
    }

    getFlashcardsStats() {
        return this.state.flashcardsStats;
    }

    // Quizzes
    saveQuizResult(score, total) {
        this.state.quizzes.taken += 1;
        // Solo guardar el mejor score acumulativo "tonto" para motivar
        this.state.quizzes.score += score;
        this.save();
    }
}

// Instancia Global
const AppStorage = new StorageSystem();
