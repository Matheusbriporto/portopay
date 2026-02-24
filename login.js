function login() {
  const user = document.getElementById("username").value
  const pass = document.getElementById("password").value
  const error = document.getElementById("error-message")

  if (user === "matheus" && pass === "Noah0225") {
    error.style.color = "#28c840"
    error.innerText = "Login realizado com sucesso 🚀"
  } else {
    error.style.color = "#ff5f57"
    error.innerText = "Usuário ou senha inválidos"
  }
}