function cadastrarUsuario() {
  const nome = document.getElementById("nome").value;
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  const confirmSenha = document.getElementById("confirmSenha").value;
  const role = document.getElementById("role").value;
  const msg = document.getElementById("msg-status");

  if (!nome || !usuario || !senha || !confirmSenha) {
    msg.style.color = "#ff5f57";
    msg.innerText = "Preencha todos os campos.";
    return;
  }

  if (senha !== confirmSenha) {
    msg.style.color = "#ff5f57";
    msg.innerText = "Senhas não conferem.";
    return;
  }

  // Aqui você salva no banco ou arquivo
  // Exemplo:
  // saveUser({ nome, usuario, senha, role })

  msg.style.color = "#28c840";
  msg.innerText = `Usuário ${usuario} cadastrado com sucesso como ${role}!`;

  // Limpar campos
  document.getElementById("nome").value = "";
  document.getElementById("usuario").value = "";
  document.getElementById("senha").value = "";
  document.getElementById("confirmSenha").value = "";
  document.getElementById("role").value = "admin";
}