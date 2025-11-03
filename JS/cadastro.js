const nome = document.getElementById('input-nome');
const idade = document.getElementById('input-idade');
const email = document.getElementById('input-email');
const senha = document.getElementById('input-senha');
const confSenha = document.getElementById('input-confirmar-senha');
const form = document.getElementById('form-cadastro');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!nome.value || !idade.value || !email.value) {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    
    if(senha.value !== confSenha.value){
        alert("As senhas não coincidem!");
        return;
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "./login.html";
});
