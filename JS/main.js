
const form = document.getElementById('loginForm');

if (form) {
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('senha');
    const feedback = document.getElementById('feedbackMessage');
    const btnLogin = form.querySelector('button[type="submit"]');

    const passwordGroup = document.querySelector('.input-group.password-group');
    const passwordGroupUsuario = document.querySelector('.input-group');

    // const clearErrors = () => {
    //     if (passwordGroup) {
    //         passwordGroup.classList.remove('input-error');
    //     }

    // };
    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        debugger
        const nome = inputEmail.value;
        const senha = inputSenha.value;

        if (nome === '' || senha === '') {
            feedback.textContent = 'Por favor, preencha todos os campos!';
            feedback.className = 'mt-4 text-center text-red-500 font-bold';
            return;
        }


        btnLogin.disabled = true;
        btnLogin.textContent = 'Validando...';
        feedback.textContent = 'Validando credenciais...';
        feedback.className = 'mt-4 text-center text-blue-600';

        const url = new URL('http://localhost:8000/validar-credenciais');
        url.search = new URLSearchParams({
            nome: nome,
            senha: senha
        }).toString();

        try {
            debugger
            const response = await fetch(url)

            const data = await response.json();

            if (response.ok) {
                feedback.textContent = data.mensagem + ' Redirecionando...';
                feedback.className = 'mt-4 text-center text-green-600 font-bold';
                alert('Login realizado com sucesso')
                console.log('Login SUCESSO:', data);
                window.location.replace('paginaPrincipal.html');


            } else if (response.status === 401) {
                // alert('Usuário ou senha inválidos')
                if (passwordGroup) {
                    passwordGroup.classList.add('input-error');
                    passwordGroupUsuario.classList.add('input-error')
                }

                feedback.textContent = 'Usuário ou senha invalidos';
                console.error("Login FALHOU:", data.detail);

            } else {
                alert('Ocorreu um erro entre em contato com o administrador')
                console.error("Erro HTTP inesperado:", data);
            }

        } catch (error) {
            console.error('Erro de conexão com o Back-end:', error);
        } finally {

            btnLogin.disabled = false;
            btnLogin.textContent = 'Entrar';
        }
    });
}



const formCadastro = document.getElementById('form-cadastro')

if (formCadastro) {
    const feedback = document.getElementById('feedbackMessage');
    const nomeCadastro = document.getElementById('input-nome')
    const emailCadastro = document.getElementById('input-email')
    const idadeCadastro = document.getElementById('input-idade')
    const senhaCadastro = document.getElementById('input-senha')
    const btnCadastro = formCadastro.querySelector('button[type="submit"]')

    formCadastro.addEventListener('submit', async (e) => {

        e.preventDefault();

        const nome = nomeCadastro.value;
        const email = emailCadastro.value;
        const idade = idadeCadastro.value;
        const senha = senhaCadastro.value;
        if (nomeCadastro === '' || emailCadastro === '' || idadeCadastro === '' || senhaCadastro === '') {
            feedback.textContent = 'Por favor, preencha todos os campos!';
            feedback.className = 'mt-4 text-center text-red-500 font-bold';
            return;
        }

        btnCadastro.disabled = true;
        btnCadastro.textContent = 'Cadastrando...';
        feedback.textContent = 'Cadastrando novo usuário...';
        feedback.className = 'mt-4 text-center text-blue-600';
        const dadosCadastro = {
            nome: nome,
            idade: parseInt(idade),
            email: email,
            senha: senha
        }
        try {

            const resposta = await fetch('http://localhost:8000/cadastrar-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosCadastro)
            });
            const resultado = await resposta.json();

            if (resposta.ok) {
                // Se o status HTTP for 200-299 E o Back-end retornar sucesso:
                if (resultado.sucesso) {
                    alert(`Usuário "${nome}" cadastrado com sucesso! ID: ${resultado.id_usuario}`);
                    console.log("Resposta do Back-end:", resultado);
                    // renderUsers();
                    formCadastro.reset();

                } else {

                    alert(`Falha no cadastro: ${resultado.mensagem}`);
                    console.error("Erro lógico do servidor:", resultado);
                }
            } else {
                alert(`Erro no servidor: ${resultado.detail || 'Não foi possível cadastrar.'}`);
                console.error("Erro HTTP:", resposta.status, resultado);
            }

        } catch (erro) {
            console.error('Erro de conexão:', erro);
            alert('Erro de rede: O servidor Back-end está indisponível.');
        }

    });
}
// mostrar senha ao clicar no olho
const CLOSED_EYE_SRC = 'img/closed-eye1.png';
const OPENED_EYE_SRC = 'img/opened-eye.png';
const CLOSED_EYE_ALT = 'Mostrar Senha';
const OPENED_EYE_ALT = 'Ocultar Senha';

function mostrarSenha() {
    var inputPass = document.getElementById('senha')
    var btnShowPass = document.getElementById('toggle-senha')

    if (inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text')
        btnShowPass.setAttribute('src', OPENED_EYE_SRC)

    } else {
        inputPass.setAttribute('type', 'password')
        btnShowPass.setAttribute('src', CLOSED_EYE_SRC)
    }


}
// recupera elementos da pagina html
document.addEventListener('DOMContentLoaded', () => {

    debugger
    const toggleButton = document.getElementById('toggle-senha');

    if (toggleButton) {

        toggleButton.addEventListener('click', mostrarSenha);
    } else {
        console.error("Erro: Elemento #toggle-senha não encontrado no DOM.");
    }

    const loginForm = document.getElementById('loginForm');
    const feedbackMessage = document.getElementById('feedbackMessage');



});

