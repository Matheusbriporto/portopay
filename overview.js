// Logout
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

// Preencher números e extrato de teste
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("saldo").textContent = "R$ 5.200";
    document.getElementById("entradasHoje").textContent = "R$ 1.200";
    document.getElementById("saidasHoje").textContent = "R$ 450";
    document.getElementById("totalMes").textContent = "R$ 12.500";

    const extratoList = document.getElementById("extratoList");
    const extratoItens = [
        {descricao: "Aluguel", valor: "- R$ 1.200"},
        {descricao: "Freelance", valor: "+ R$ 2.000"},
        {descricao: "Supermercado", valor: "- R$ 350"},
        {descricao: "Investimento", valor: "+ R$ 1.000"}
    ];

    extratoItens.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("extrato-item-vertical");
        div.innerHTML = `<p>${item.descricao}</p><p>${item.valor}</p>`;
        extratoList.appendChild(div);
    });

    // Mini gráfico animado
    const ctx = document.getElementById("miniChart").getContext("2d");
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan','Fev','Mar','Abr','Mai','Jun'],
            datasets: [{
                label: 'Saldo',
                data: [5000, 5500, 6000, 5800, 6200, 6500],
                borderColor: '#ff7a00',
                backgroundColor: 'rgba(255,122,0,0.1)',
                tension: 0.4,
                fill: true,
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            responsive: true,
            animation: { duration: 1000 },
            scales: {
                y: { beginAtZero: false, display: false },
                x: { display: false }
            }
        }
    });
});