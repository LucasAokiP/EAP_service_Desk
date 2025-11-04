const nome = document.getElementById('input-nome');
const idade = document.getElementById('input-idade');
const email = document.getElementById('input-email');
const senha = document.getElementById('input-senha');
const confSenha = document.getElementById('input-confirmar-senha');
const form = document.getElementById('form-cadastro');

form.addEventListener('submit', function(e) {
    if (!nome.value || !idade.value || !email.value) {
        alert("Por favor, preencha todos os campos!");
        e.preventDefault();
        return;
    }
    if(senha.value !== confSenha.value){
        alert("As senhas não coincidem!");
        e.preventDefault();
        return;
    }
    
    alert("Cadastro realizado com sucesso!");
    window.location.href = "./login.html";
});

/*
Fazer um validador para cada campo para caso de erro no campo pinta ele de vermelho
document.getElementById("input-nome").style.borderColor = "Red";
*/