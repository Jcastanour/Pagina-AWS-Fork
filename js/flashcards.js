// flashcards.js
// Sistema interactivo de Flashcards

let curCardIdx = 0;
let fcDeck = [];

// Construye el mazo a partir de dataFlashcards (data-flashcards.js).
// Mezcla aleatoria para variedad en cada sesión.
function buildFlashcardsDeck() {
    const source = (typeof dataFlashcards !== 'undefined' && Array.isArray(dataFlashcards)) ? dataFlashcards : [];
    fcDeck = source.slice();
    for (let i = fcDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fcDeck[i], fcDeck[j]] = [fcDeck[j], fcDeck[i]];
    }
}

function renderFlashcardsApp() {
    buildFlashcardsDeck();
    const mainArea = document.getElementById("main-content-area");
    
    let html = `
        <div class="header-section">
            <h1 style="font-size:2rem"><span style="color:var(--accent)">🃏</span> Flashcards Memory</h1>
            <p style="color:var(--text-muted)">Repasa las preguntas trampa. Marca "Fácil" si la sabías, o "Difícil" para repetirla.</p>
        </div>
        
        <div class="stats-cards" style="display:flex; gap:20px; justify-content:center; margin-bottom:30px;">
            <div style="background:var(--panel); padding:10px 20px; border-radius:8px; border:1px solid var(--border)">🟢 Dominadas: <b id="fc-stat-easy" style="color:var(--green)">0</b></div>
            <div style="background:var(--panel); padding:10px 20px; border-radius:8px; border:1px solid var(--border)">🔴 Por Repasar: <b id="fc-stat-hard" style="color:var(--red)">0</b></div>
        </div>

        <div class="flashcard-wrapper">
            <div class="flashcard" id="fc-card" onclick="this.classList.toggle('flipped')">
                <div class="fc-side fc-front">
                    <h2 id="fcq" style="font-size:1.8rem; color:var(--accent); line-height:1.3; margin:0"></h2><br>
                    <p style="font-size:12px; opacity:0.6; margin:0; position:absolute; bottom:20px;">CLIC PARA REVELAR RESPUESTA ↻</p>
                </div>
                <div class="fc-side fc-back">
                    <p id="fca" style="font-size:1.1rem; font-weight:normal; color:var(--title); margin:0"></p>
                </div>
            </div>
            
            <div style="display:flex; justify-content:center; gap:15px; margin-top:30px;">
                <button class="fc-opt-btn" style="background:rgba(248,81,73,0.1); border-color:var(--red); color:var(--red)" onclick="scoreCard(false)">🔴 No la sabía (Difícil)</button>
                <div id="fcc" style="padding:10px; font-weight:bold; font-family:monospace; color:var(--text)"></div>
                <button class="fc-opt-btn" style="background:rgba(46,160,67,0.1); border-color:var(--green); color:var(--green)" onclick="scoreCard(true)">🟢 La sabía (Fácil)</button>
            </div>
        </div>
    `;
    mainArea.innerHTML = html;
    
    curCardIdx = 0;
    updateFcUI();
}

function updateFcUI() {
    const cardEl = document.getElementById('fc-card');
    cardEl.classList.remove('flipped');
    
    setTimeout(() => {
        document.getElementById("fcq").innerText = fcDeck[curCardIdx].q;
        document.getElementById("fca").innerText = fcDeck[curCardIdx].a;
        document.getElementById("fcc").innerText = (curCardIdx + 1) + " / " + fcDeck.length;
        
        // Actualizar métricas visuales
        const stats = AppStorage.getFlashcardsStats();
        document.getElementById("fc-stat-easy").innerText = stats.mastered.length;
        document.getElementById("fc-stat-hard").innerText = stats.learning.length;
    }, 150);
}

function scoreCard(isEasy) {
    AppStorage.markFlashcard(curCardIdx, isEasy);
    
    // Moverse al siguiente
    curCardIdx++;
    if(curCardIdx >= fcDeck.length) {
        // En un SRS real acá se calcularían las fechas, aquí solo damos un alert y reiniciamos
        alert("¡Mazo Terminado! Volver a empezar.");
        curCardIdx = 0;
    }
    updateFcUI();
}
