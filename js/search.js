// search.js
// Pequeño motor de búsqueda de texto

function handleGlobalSearch() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const mainArea = document.getElementById("main-content-area");
    
    // Si limpia, restaurar home
    if(query.trim() === "") {
        renderHome();
        return;
    }

    let resultsHTML = `
        <div class="header-section" style="margin-bottom:30px">
            <h2>🔍 Resultados para: "${query}"</h2>
        </div>
        <div class="grid">
    `;

    let found = 0;

    // Buscar en secciones (data.js)
    dataSecciones.forEach(sec => {
        sec.cards.forEach(c => {
            if (c.title.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query)) {
                let badgeHTML = c.badge ? `<span class="badge" style="float:right">${c.badge}</span>` : '';
                resultsHTML += `
                    <div class="card" style="border-color:var(--accent)">
                        ${badgeHTML}
                        <h4>${c.title}</h4>
                        <p style="margin:5px 0 0 0; font-size:0.95rem; color:#cbd5e1">${c.desc}</p>
                        <small style="color:var(--accent); display:block; margin-top:10px">Sección: ${sec.title}</small>
                    </div>`;
                found++;
            }
        });
    });

    // Buscar en Cheatsheet
    dataCheatsheet.forEach(ch => {
        if (ch[0].toLowerCase().includes(query) || ch[1].toLowerCase().includes(query)) {
            resultsHTML += `
                <div class="card" style="border-color:var(--blue)">
                    <h4 style="color:var(--blue)"><span style="font-size:12px; margin-right:5px">CHEATSHEET</span><br>${ch[1]}</h4>
                    <p style="margin:5px 0 0 0; font-size:0.95rem; color:#cbd5e1">${ch[0]}</p>
                </div>`;
            found++;
        }
    });

    resultsHTML += `</div>`;

    if(found === 0) {
        resultsHTML += `<div style="text-align:center; color:var(--text-muted); margin-top:40px;">No se encontraron resultados para "${query}". Intenta con "S3", "Database" o "Security".</div>`;
    }

    mainArea.innerHTML = resultsHTML;
}
