
const form = document.getElementById('loginForm');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const feedback = document.getElementById('feedbackMessage'); 

const btnLogin = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {

    e.preventDefault(); 

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
            


        } else if (response.status === 401) {
            alert('Usuário ou senha inválidos')
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
