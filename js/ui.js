// ui.js
// Controlador Maestro de la UI (Interfaz y Enrutamiento Pseudo-SPA)

document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar el Tema
    if(AppStorage.getTheme() === "light") {
        document.body.classList.add("light-theme");
    }

    // 2. Generar el Menú Lateral (Sidebar) Dinámico
    generateSidebarMenu();

    // 3. Renderizar el Dashboard principal inicialmente
    renderHome();

    // 4. Input Listener para busqueda
    document.getElementById("search-input").addEventListener("input", handleGlobalSearch);
});

// Renderizar el Navegador Lateral
function generateSidebarMenu() {
    const sidebarNav = document.getElementById("sidebar-nav");
    
    let html = `<li class="sidebar-item" onclick="renderHome()">🏠 Dashboard Principal</li>`;
    html += `<li class="sidebar-heading">📚 TEMARIO</li>`;
    
    // De data.js
    dataSecciones.forEach(sec => {
        // Marcamos como leído en storage "sec.id" si lo visita
        html += `<li class="sidebar-item" onclick="renderTheorySection('${sec.id}')">📘 ${sec.title.substring(0,20)}...</li>`;
    });
    dataHTMLBlocks.forEach(blk => {
        html += `<li class="sidebar-item" onclick="renderHTMLBlock('${blk.id}')">📙 ${blk.title.substring(0,20)}...</li>`;
    });

    html += `<li class="sidebar-heading">🛠️ ENTRENAMIENTO</li>`;
    html += `<li class="sidebar-item" onclick="renderCheatsheet()" style="color:var(--accent)">⚡ Cheatsheet Supremo</li>`;
    html += `<li class="sidebar-item" onclick="startQuizEngine()">🎯 Simulador Examen</li>`;
    html += `<li class="sidebar-item" onclick="renderFlashcardsApp()">🃏 Flashcards SRS</li>`;

    sidebarNav.innerHTML = html;
}

function setActiveSidebar(itemText) {
    // Basic active highlight (Omitido para simplificar tokens)
}

function toggleThemeUI() {
    const newTheme = AppStorage.toggleTheme();
    if(newTheme === "light") {
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.remove("light-theme");
    }
}

// =============================================
// ENRUTADOR DE VISTAS (RENDERERS)
// =============================================

function renderHome() {
    AppStorage.updateGlobalProgress();
    const mainArea = document.getElementById("main-content-area");
    
    let html = `
        <div class="header-section shadow-box">
            <h1>Bienvenido, Cloud Practitioner 🚀</h1>
            <p>Continúa tu entrenamiento basado en las mecánicas Anti-Confusión.</p>
            <div class="stats-cards" style="display:flex; gap:20px; margin-top:20px;">
                <div class="card" style="flex:1; background:var(--bg)">📝 Quizzes Jugados: <b style="color:var(--accent)">${AppStorage.state.quizzes.taken}</b></div>
                <div class="card" style="flex:1; background:var(--bg)">🏆 Max Score: <b style="color:var(--accent)">${AppStorage.state.quizzes.score}</b></div>
                <div class="card" style="flex:1; background:var(--bg)">📗 Temas Leídos: <b style="color:var(--accent)">${AppStorage.state.sectionsRead.length}</b></div>
            </div>
        </div>

        <h2 style="margin-top:40px">🧭 Mapa Rápido</h2>
        <div class="grid">
            <div class="card" onclick="startQuizEngine()" style="cursor:pointer; border-color:var(--accent); text-align:center">
                <h1 style="font-size:3rem; margin:0">🎯</h1>
                <h4>Ir al Simulador</h4>
                <p style="font-size:12px; color:var(--text-muted)">Ponte a prueba ahora</p>
            </div>
            <div class="card" onclick="renderFlashcardsApp()" style="cursor:pointer; border-color:var(--green); text-align:center">
                <h1 style="font-size:3rem; margin:0">🃏</h1>
                <h4>Rotar Flashcards</h4>
                <p style="font-size:12px; color:var(--text-muted)">Mejora tu memoria</p>
            </div>
            <div class="card" onclick="renderCheatsheet()" style="cursor:pointer; border-color:var(--blue); text-align:center">
                <h1 style="font-size:3rem; margin:0">⚡</h1>
                <h4>Cheatsheet</h4>
                <p style="font-size:12px; color:var(--text-muted)">Si ves esto, piensa esto</p>
            </div>
        </div>
    `;
    mainArea.innerHTML = html;
}

function renderTheorySection(id) {
    AppStorage.markSectionRead(id); // Registrar Progreso!
    const sec = dataSecciones.find(s => s.id === id);
    const mainArea = document.getElementById("main-content-area");
    
    let html = `<div class="header-section shadow-box"><h1>${sec.title}</h1>`;
    if (sec.intro) html += `<p>${sec.intro}</p>`;
    html += `</div>`;
    
    if (sec.cards) {
        html += `<div class="grid">`;
        sec.cards.forEach(c => {
            let badgeHTML = c.badge ? `<span class="badge">${c.badge}</span>` : '';
            html += `<div class="card">${badgeHTML}<h4>${c.title}</h4><p style="font-size:0.95rem; color:#cbd5e1">${c.desc}</p></div>`;
        });
        html += `</div>`;
    }
    mainArea.innerHTML = html;
}

function renderHTMLBlock(id) {
    AppStorage.markSectionRead(id);
    const blk = dataHTMLBlocks.find(b => b.id === id);
    const mainArea = document.getElementById("main-content-area");
    mainArea.innerHTML = `<div class="header-section shadow-box"><h1>${blk.title}</h1></div><div class="content-block" style="margin-top:20px">${blk.html}</div>`;
}

function renderCheatsheet() {
    AppStorage.markSectionRead('cheatsheet');
    const mainArea = document.getElementById("main-content-area");
    
    let html = `
        <div class="header-section shadow-box">
            <h1>⚡ Cheatsheet Dorado</h1>
            <p>La regla de asociasión rápida de palabras clave para el examen.</p>
        </div>
        <div style="background:var(--card); padding:10px; border-radius:12px; border:1px solid var(--border); margin-top:20px;">
    `;
    
    dataCheatsheet.forEach(item => {
        html += `<div class="tr"><span style="color:#e2e8f0; font-size:15px; flex:1">🔘 ${item[0]}</span> <b style="flex:1; text-align:right">${item[1]}</b></div>`;
    });
    
    html += `</div>`;
    mainArea.innerHTML = html;
}
