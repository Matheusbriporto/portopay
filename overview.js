// ===================================================
// WINDOW CONTROLS
// ===================================================
const logoutButton = document.querySelector(".topbar button");

function logout() {
    // Fecha a overview e volta para login
    window.location.href = "login.html";
}

// ===================================================
// SAMPLE DASHBOARD DATA (substitua pelos dados reais)
// ===================================================
const saldo = document.getElementById("saldo");
const entradasHoje = document.getElementById("entradasHoje");
const saidasHoje = document.getElementById("saidasHoje");
const totalMes = document.getElementById("totalMes");
const extratoList = document.getElementById("extratoList");

// Dados fictícios
const extratos = [
    { descricao: "Compra A", valor: -50, hora: "09:30" },
    { descricao: "Venda B", valor: 120, hora: "10:15" },
    { descricao: "Pagamento C", valor: -30, hora: "11:00" },
];

// Atualiza cards
saldo.innerText = "1500";
entradasHoje.innerText = "300";
saidasHoje.innerText = "180";
totalMes.innerText = "3200";

// Atualiza extrato
extratoList.innerHTML = "";
extratos.forEach(e => {
    const div = document.createElement("div");
    div.classList.add("extrato-item-vertical");
    div.innerHTML = `<p>${e.hora} - ${e.descricao}</p><p>${e.valor < 0 ? '-' : '+'} R$ ${Math.abs(e.valor)}</p>`;
    extratoList.appendChild(div);
});

// ===================================================
// MINI CHART (Chart.js)
// ===================================================
const ctx = document.getElementById("miniChart").getContext("2d");
const miniChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Saldo Mensal',
            data: [1200, 1500, 1300, 1600],
            borderColor: '#ff7a00',
            backgroundColor: 'rgba(255,122,0,0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// ===================================================
// WINDOW BUTTONS - via preload.js
// ===================================================
const windowControls = {
    close: () => window.api.close(),
    minimize: () => window.api.minimize(),
    maximize: () => window.api.maximize()
};

document.querySelector(".window-btn.close").onclick = windowControls.close;
document.querySelector(".window-btn.minimize").onclick = windowControls.minimize;
document.querySelector(".window-btn.maximize").onclick = windowControls.maximize;