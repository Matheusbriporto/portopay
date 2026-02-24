function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const error = document.getElementById("error-message");

    // Simulação de usuários e senhas
    const users = {
        "Matheus": "Noah0210.",
        "Joana": "Senha123",
        "Pedro": "abc123"
    };

    if (users[user] && users[user] === pass) {
        error.style.color = "#28c840";
        error.innerText = "Login realizado com sucesso 🚀";

        // Abrir a tela de overview passando o nome do usuário
        window.api.openOverview(user);
    } else {
        error.style.color = "#ff5f57";
        error.innerText = "Usuário ou senha inválidos";
    }
}