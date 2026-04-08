// Referencias Base de DOM y contenedores Principales Core
const mainDOM = document.getElementById("m");
const navDOM = document.getElementById("n");
const mapDOM = document.getElementById("map-grid");

function initApp() {
    renderSections();
    renderHTMLBlocks();
    renderCheatsheet();
    renderQuizzes();
    renderFlashcards();
}

// 1. Render de Nav y Map Grid dinámicos
function renderNavMap(id, text) {
    const minText = text.split(" ").slice(0, 2).join(" ");
    navDOM.innerHTML += `<a href="#${id}">${minText}</a>`;
    mapDOM.innerHTML += `<a href="#${id}" class="map-link">🔗 ${text.replace(/[🧱🎨💳🛡️⚡🗄️🧠👽🤖🎧🏗️💾📈📊]/g, "")}</a>`;
}

// 2. Insertar bloques de Secciones Textuales Data
function renderSections() {
    dataSecciones.forEach(sec => {
        renderNavMap(sec.id, sec.title);
        
        let htmlBase = `<section id="${sec.id}"><h2>${sec.title}</h2>`;
        if (sec.intro) htmlBase += `<p style="color:#aaa; font-size:1.05rem; margin-bottom:15px">${sec.intro}</p>`;
        
        if (sec.cards && sec.cards.length > 0) {
            htmlBase += `<div class="grid">`;
            sec.cards.forEach(card => {
                let badgeHTML = card.badge ? `<span class="badge">${card.badge}</span>` : '';
                htmlBase += `
                    <div class="card">
                        ${badgeHTML}
                        <h4>${card.title}</h4>
                        <p style="margin:5px 0 0 0; font-size:0.95rem; color:#cbd5e1">${card.desc}</p>
                    </div>`;
            });
            htmlBase += `</div>`;
        }
        htmlBase += `</section>`;
        mainDOM.innerHTML += htmlBase;
    });
}

// 3. Renderizar Bloques HTML estáticos / Tablas
function renderHTMLBlocks() {
    dataHTMLBlocks.forEach(blk => {
        renderNavMap(blk.id, blk.title);
        mainDOM.innerHTML += `<section id="${blk.id}"><h2>${blk.title}</h2>${blk.html}</section>`;
    });
}

// 4. Renderizar Cheatsheet Dorado Master
function renderCheatsheet() {
    let html = `
        <section id="ch">
            <h2>⚡ "Si ves esto en el examen... Piensa en esto"</h2>
            <p>El CheatSheet de Oro (Léelo 30 Minutos antes del Examen base garantizado).</p>
            <div style="background:var(--c); padding:5px; border-radius:12px; border:1px solid var(--border)">
    `;
    dataCheatsheet.forEach(item => {
        html += `<div class="tr"><span style="color:#e2e8f0; font-size:15px">🔘 ${item[0]}</span> <b>${item[1]}</b></div>`;
    });
    html += `</div></section>`;
    mainDOM.innerHTML += html;
    
    // Add it to map
    navDOM.innerHTML += `<a href="#ch">⚡ Cheatsheet</a>`;
}

// 5. Motor Interactivo Evaluaciones Rápidas Quizz
function renderQuizzes() {
    navDOM.innerHTML += `<a href="#qz">🎯 Simulador</a>`;
    let qhHTML = `<section id="qz"><h2>🎯 Simulador Táctico Corto y Furioso</h2>`;
    dataQuiz.forEach((q, idx) => {
        qhHTML += `
            <div class="quiz-box">
                <b style="font-size:18px; color:#fff">${q.q}</b>
                <div style="margin-top:20px" id="qb${idx}">
        `;
        q.options.forEach((opt, oi) => {
            let scHtml = opt.replace(/'/g, "\\'").replace(/"/g, '&quot;');
            qhHTML += `<button class="quiz-opt" onclick="checkQ(${idx}, ${oi}, ${q.answer}, '${q.reason.replace(/'/g, "\\'").replace(/"/g, '&quot;')}')">${opt}</button>`;
        });
        qhHTML += `</div><div class="quiz-f" id="qf${idx}"></div></div>`;
    });
    qhHTML += `</section>`;
    mainDOM.innerHTML += qhHTML;
}

// Global Validation Web Function Exposer a la Interfaz del Usuario para botones Quizz
window.checkQ = function(qid, oid, ans, reasonStr) {
    let optContainer = document.getElementById("qb" + qid);
    let feedbackPanel = document.getElementById("qf" + qid);
    
    optContainer.querySelectorAll("button").forEach(b => b.disabled = true);
    
    // Marcar el que clickeó
    optContainer.children[oid].classList.add(oid === ans ? 'c' : 'i');
    
    // Si se equivocó, mostrarle también cuál era el original correcto dibujando su borde visualmente
    if (oid !== ans) optContainer.children[ans].style.border = "2px dashed var(--green)";

    feedbackPanel.innerHTML = (oid === ans ? '✅ <b>Veredicto Perfecto al grano.</b> ' : '❌ <b>Anotación de trampa caída.</b> ') + reasonStr;
    feedbackPanel.style.background = oid === ans ? "rgba(46,160,67,0.15)" : "rgba(248,81,73,0.15)";
    feedbackPanel.style.borderLeft = oid === ans ? "4px solid var(--green)" : "4px solid var(--red)";
    feedbackPanel.style.color = "#fff";
    feedbackPanel.style.display = "block";
};

// 6. Controlador Animado De Tarjetas Mentales Evaluatorias (Flashcards)
let currentStateMem = 0;
function renderFlashcards() {
    navDOM.innerHTML += `<a href="#fc">🃏 Flashcards</a>`;
    let fcHT = `
        <section id="fc">
            <h2>🃏 Flashcards Interactivas Finales Master Memoria</h2>
            <p>Lee el enunciado y trata de responder en voz alta (Toca la tarjeta para validar dándola vuelta).</p>
            <div class="flashcard-wrapper">
                <div class="flashcard" id="fc-card" onclick="this.classList.toggle('flipped')">
                    <div class="fc-side fc-front">
                        <h2 id="fcq" style="font-size:24px; color:var(--accent); line-height:1.2; margin:0"></h2><br>
                        <p style="font-size:12px; opacity:0.6; margin:0">CLIC PARA VALIDAR RESPUESTA ↻</p>
                    </div>
                    <div class="fc-side fc-back">
                        <p id="fca" style="font-size:16px; font-weight:normal; color:#fff; margin:0"></p>
                    </div>
                </div>
                <div class="fc-controls">
                    <button class="btn" onclick="fcPlay(-1)">← Atrás Visual</button>
                    <span id="fcc" style="color:var(--title); margin:0; font-weight:bold; font-size:18px; font-family:monospace"></span>
                    <button class="btn" onclick="fcPlay(1)">Siguiente Ficha →</button>
                </div>
            </div>
        </section>
    `;
    mainDOM.innerHTML += fcHT;
    
    // Lanza carga gráfica
    fcPlay(0);
}

window.fcPlay = function(direction) {
    currentStateMem = (currentStateMem + direction + dataFlashcards.length) % dataFlashcards.length;
    let cardGraphicBase = document.getElementById('fc-card');
    cardGraphicBase.classList.remove('flipped');
    
    // Retrasar render para permitir ver la animación y reestablecerse mentalmente
    setTimeout(() => {
        document.getElementById("fcq").innerText = dataFlashcards[currentStateMem].q;
        document.getElementById("fca").innerText = dataFlashcards[currentStateMem].a;
        document.getElementById("fcc").innerText = (currentStateMem + 1) + " / " + dataFlashcards.length;
    }, 150);
};

// Start 
document.addEventListener("DOMContentLoaded", initApp);
