const nome = document.getElementById("input-nome");
const idade = document.getElementById("input-idade");
const email = document.getElementById("input-email");
const senha = document.getElementById("input-senha");
const confSenha = document.getElementById("input-confirmar-senha");
const form = document.getElementById("form-cadastro");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let valNome = true;
  let valIdade = true;
  let valEmail = true;
  let valSenha = true;
  let valConfSenha = true;

  nome.style.borderColor = "initial";
  idade.style.borderColor = "initial";
  email.style.borderColor = "initial";
  senha.style.borderColor = "initial";
  confSenha.style.borderColor = "initial";

  if (!nome.value.trim()) {
    nome.style.borderColor = "red";
    valNome = false;
  }
  else{
    nome.style.borderColor = "green";
  }

  if (!idade.value || Number(idade.value) <= 0) {
    idade.style.borderColor = "red";
    valIdade = false;
  }
  else{
    idade.style.borderColor = "green";
  }

  if (!email.value.trim()) {
    email.style.borderColor = "red";
    valEmail = false;
  }
    else{
    email.style.borderColor = "green";
  }
  
  if (!senha.value || !confSenha.value) {
    if (!senha.value) senha.style.borderColor = "red";
    if (!confSenha.value) confSenha.style.borderColor = "red";
    valSenha = false;
    valConfSenha = false;
  } else if (senha.value !== confSenha.value) {
    senha.style.borderColor = "red";
    confSenha.style.borderColor = "red";
    valSenha = false;
    valConfSenha = false;
  }
  else{
    senha.style.borderColor = "green";
    confSenha.style.borderColor = "green";
  }
 
  if (valNome && valIdade && valEmail && valSenha && valConfSenha) {
    alert("Cadastro realizado com sucesso!");
    window.location.href = "../index.html";
  } else {
    alert("Por favor, preencha todos os campos em vermelho!");
  }
});
