// Criando usuário admin automaticamente
const adminUser = {
    email: "admin@admin.com",
    password: "123456",
    name: "Administrador"
};

localStorage.setItem("adminUser", JSON.stringify(adminUser));

const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    const storedUser = JSON.parse(localStorage.getItem("adminUser"));

    if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("loggedUser", JSON.stringify(storedUser));
        window.location.href = "overview.html";
    } else {
        errorMessage.textContent = "Email ou senha inválidos!";
    }
});