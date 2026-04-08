// quiz.js
// Motor de Exámenes Avanzado (Lectura de Fork de 600 Preguntas)

let currentQuizIndex = 0;
let quizScore = 0;
let quizMistakes = [];
let activeExamSession = []; // Mazo actual seleccionado (e.g. 65 aleatorias)
let currentSelection = [];  // Para tracking de opción múltiple
let quizSubmitted = false;

function startQuizEngine() {
    currentQuizIndex = 0;
    quizScore = 0;
    quizMistakes = [];
    quizSubmitted = false;
    currentSelection = [];
    
    // Validar de dónde sacamos la data (si dataExamsMaster existe, somos PRO)
    if (typeof dataExamsMaster !== 'undefined' && dataExamsMaster.length > 0) {
        // Mezclar y agarrar 65
        activeExamSession = [...dataExamsMaster].sort(() => 0.5 - Math.random()).slice(0, 65);
    } else {
        // Fallback a los 3 ejemplos por defecto
        activeExamSession = [...dataQuiz];
    }
    
    // Limpiar pantalla principal y mostrar solo el quiz
    const mainArea = document.getElementById("main-content-area");
    mainArea.innerHTML = `
        <div class="test-environment">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px">
                <h2 style="border-bottom:none; margin:0">⏱️ AWS Simulador Oficial (${activeExamSession.length} Preguntas)</h2>
                <span style="background:var(--accent); color:#fff; padding:5px 15px; border-radius:20px; font-weight:bold; font-size:0.9rem">Progreso: <span id="q-counter">1</span>/${activeExamSession.length}</span>
            </div>
            
            <div class="progress-container" style="margin-bottom:20px; width:100%; background:var(--border);">
                <div id="quiz-progress-fill" style="height:8px; width:0%; background:var(--green); border-radius:4px; transition:0.3s;"></div>
            </div>
            <div id="quiz-card-container"></div>
        </div>
    `;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const container = document.getElementById("quiz-card-container");
    const progressFill = document.getElementById("quiz-progress-fill");
    document.getElementById("q-counter").innerText = currentQuizIndex + 1;
    
    if (currentQuizIndex >= activeExamSession.length) {
        showQuizResults();
        return;
    }

    quizSubmitted = false;
    currentSelection = [];
    
    const q = activeExamSession[currentQuizIndex];
    // Formatear si es legacy (answer en int) o PRO (answers en array)
    const isMultiple = Array.isArray(q.answers) && q.answers.length > 1;
    const requiredAnswersStr = isMultiple ? `<span style="color:var(--accent); font-size:0.9rem; font-weight:bold; display:block; margin-bottom:15px">⚠️ Selecciona ${q.answers.length} opciones</span>` : `<span style="color:var(--text-muted); font-size:0.9rem; display:block; margin-bottom:15px">Selecciona 1 opción</span>`;
    
    let html = `
        <div class="card" style="box-shadow: 0 10px 25px rgba(0,0,0,0.5); padding:30px">
            <h3 style="font-size:1.3rem; margin-bottom:5px; line-height:1.4">${currentQuizIndex + 1}. ${q.q}</h3>
            ${requiredAnswersStr}
            
            <div class="quiz-options-grid" id="q_options_${currentQuizIndex}">
    `;

    q.options.forEach((opt, idx) => {
        html += `<button id="opt_${currentQuizIndex}_${idx}" class="quiz-opt-btn" onclick="toggleSelection(${currentQuizIndex}, ${idx}, ${isMultiple})">
                    <div style="display:flex; align-items:center;">
                        <div class="opt-checkbox" id="chk_${currentQuizIndex}_${idx}" style="min-width:20px; height:20px; border:2px solid var(--border); border-radius:${isMultiple?'4px':'50%'}; margin-right:15px; display:flex; justify-content:center; align-items:center;"></div>
                        <span style="flex:1">${opt}</span>
                    </div>
                 </button>`;
    });

    html += `
            </div>
            <div id="q_feedback_${currentQuizIndex}" class="quiz-feedback-box" style="display:none; margin-top:20px"></div>
            
            <div style="text-align:right; margin-top:20px; display:flex; justify-content:space-between; align-items:center">
                <button id="q_submit_${currentQuizIndex}" class="btn" style="background:var(--blue); color:#fff; border:none; display:none" onclick="submitMultiAnswer(${currentQuizIndex})">Validar Respuesta ✔️</button>
                <button id="q_next_${currentQuizIndex}" class="btn" style="display:none; background:var(--green); color:#fff; border:none; margin-left:auto" onclick="nextQuizQuestion()">Siguiente →</button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    progressFill.style.width = ((currentQuizIndex / activeExamSession.length) * 100) + "%";
}

function toggleSelection(qIndex, optIdx, isMultiple) {
    if (quizSubmitted) return;
    
    const maxAnswers = Array.isArray(activeExamSession[qIndex].answers) ? activeExamSession[qIndex].answers.length : 1;
    
    if (!isMultiple) {
        currentSelection = [optIdx];
        renderSelections(qIndex);
        // Si es opcion unica, validamos inmediatamente para agilizar
        submitMultiAnswer(qIndex);
    } else {
        const i = currentSelection.indexOf(optIdx);
        if (i > -1) {
            currentSelection.splice(i, 1);
        } else {
            if (currentSelection.length < maxAnswers) {
                currentSelection.push(optIdx);
            }
        }
        renderSelections(qIndex);
        
        // Mostrar boton de Validar si ya lleno el cupo
        if (currentSelection.length === maxAnswers) {
            document.getElementById(`q_submit_${qIndex}`).style.display = "inline-block";
        } else {
            document.getElementById(`q_submit_${qIndex}`).style.display = "none";
        }
    }
}

function renderSelections(qIndex) {
    const isMultiple = Array.isArray(activeExamSession[qIndex].answers) && activeExamSession[qIndex].answers.length > 1;
    const allOpts = document.querySelectorAll(`#q_options_${qIndex} .quiz-opt-btn`);
    const allChks = document.querySelectorAll(`#q_options_${qIndex} .opt-checkbox`);
    
    allChks.forEach((chk, idx) => {
        if (currentSelection.includes(idx)) {
            chk.style.background = "var(--accent)";
            chk.style.borderColor = "var(--accent)";
            allOpts[idx].style.borderColor = "var(--accent)";
        } else {
            chk.style.background = "transparent";
            chk.style.borderColor = "var(--border)";
            allOpts[idx].style.borderColor = "var(--border)";
        }
    });
}

function submitMultiAnswer(qIndex) {
    quizSubmitted = true;
    const q = activeExamSession[qIndex];
    let correctIndices = [];
    
    if (Array.isArray(q.answers)) {
         correctIndices = q.answers;
    } else {
         correctIndices = [q.answer]; // Modulo legacy
    }
    
    const feedback = document.getElementById(`q_feedback_${qIndex}`);
    const nextBtn = document.getElementById(`q_next_${qIndex}`);
    const submitBtn = document.getElementById(`q_submit_${qIndex}`);
    if(submitBtn) submitBtn.style.display = "none";
    
    // Check if fully correct (must match all array elements perfectly)
    const isCorrect = currentSelection.length === correctIndices.length && currentSelection.every(val => correctIndices.includes(val));
    
    const allOpts = document.querySelectorAll(`#q_options_${qIndex} .quiz-opt-btn`);
    allOpts.forEach((btn, i) => {
        btn.disabled = true;
        // Pintar respuesta real de verde
        if (correctIndices.includes(i)) {
            btn.classList.add("correct");
        }
        // Marcar de rojo si eligio una incorrecta
        if (currentSelection.includes(i) && !correctIndices.includes(i)) {
            btn.classList.add("wrong");
        }
    });
    
    // Fallback si no hay Reason explicitamente
    let reasonText = q.reason ? q.reason : "Repasa este tema en la guía principal de estudio (Pilar, Servicio o Configuración vinculada).";
    
    if (isCorrect) {
        quizScore++;
        feedback.innerHTML = `✅ <b>¡Correcto!</b> ${reasonText}`;
        feedback.className = "quiz-feedback-box success";
    } else {
        feedback.innerHTML = `❌ <b>Incorrecto.</b> ${reasonText}`;
        feedback.className = "quiz-feedback-box error";
        quizMistakes.push({q: q.q, correct: correctIndices.map(i => q.options[i]).join(" | ")});
    }
    
    feedback.style.display = "block";
    nextBtn.style.display = "inline-block";
}

function nextQuizQuestion() {
    currentQuizIndex++;
    renderQuizQuestion();
}

function showQuizResults() {
    const container = document.getElementById("quiz-card-container");
    const progressFill = document.getElementById("quiz-progress-fill");
    progressFill.style.width = "100%";
    
    AppStorage.saveQuizResult(quizScore, activeExamSession.length);
    const passScore = Math.ceil(activeExamSession.length * 0.70); // 70% to pass AWS
    const isPassed = quizScore >= passScore;
    
    let html = `
        <div class="card" style="text-align:center; padding:40px; border-color:${isPassed ? 'var(--green)' : 'var(--red)'}">
            <h2 style="border:none; margin:0; justify-content:center; font-size:2.5rem">${isPassed ? '🎉 ¡Aprobaste!' : '💔 No alcanzas el puntaje'}</h2>
            <div style="font-size:4rem; color:${isPassed ? 'var(--green)' : 'var(--red)'}; margin:20px 0;">${quizScore} / ${activeExamSession.length}</div>
            <p>Necesitas al menos <b>${passScore}</b> aciertos (70%) para asegurar el examen AWS.</p>
    `;
    
    if (quizMistakes.length > 0) {
        html += `<div style="text-align:left; background:var(--bg); border:1px solid var(--border); border-radius:12px; max-height:400px; overflow-y:auto; padding:20px; margin-top:30px;">
                    <h3 style="color:var(--red); margin-top:0">Errores cometidos (${quizMistakes.length}):</h3>`;
        quizMistakes.forEach(m => {
            html += `<div style="margin-bottom:15px; padding-bottom:15px; border-bottom:1px solid var(--border)">
                        <strong style="color:var(--title); display:block; font-size:1.05rem">${m.q}</strong>
                        <span style="color:var(--green); font-size:0.95rem; font-family:monospace">✓ Era: ${m.correct}</span>
                     </div>`;
        });
        html += `</div>`;
    }
    
    html += `
            <div style="margin-top:30px">
                <button class="btn" style="background:var(--accent); color:#fff; border:none" onclick="startQuizEngine()">🔄 Generar Nuevo Simulacro</button>
                <button class="btn" onclick="renderHome()" style="background:transparent; color:var(--title)">🏠 Volver al Inicio</button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}
