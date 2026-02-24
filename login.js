function login() {
    const user = document.getElementById("username").value
    const pass = document.getElementById("password").value
    const error = document.getElementById("error-message")

    // Aqui você define seu usuário e senha corretos
    if (user === "Matheus" && pass === "Noah0210.") {
        error.style.color = "#28c840"
        error.innerText = "Login realizado com sucesso 🚀"

        // Pequeno delay para mostrar mensagem antes de abrir o overview
        setTimeout(() => {
            window.location.href = "overview.html"
        }, 800)

    } else {
        error.style.color = "#ff5f57"
        error.innerText = "Usuário ou senha inválidos"
    }
}