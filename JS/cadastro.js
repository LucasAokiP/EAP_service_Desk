const nome = document.getElementById('input-nome');
const idade = document.getElementById('input-idade');
const email = document.getElementById('input-email');
const senha = document.getElementById('input-senha');
const botaoCadastrar = document.getElementById('btn-cadastrar');

botaoCadastrar.addEventListener('submit', (e) => {
    if (nome.value === '' || idade.value === '' || email.value === '' || senha.value === '') {
        alert('Por favor, preencha todos os campos.');
        e.preventDefault();
        return;
        }
        else{

    }
    e.preventDefault();
})
