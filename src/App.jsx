import React, { useState } from 'react'
import Toucan from './assets/noText-logo.png'
import { useNavigate } from 'react-router-dom';
import Home from './pages/Home'

function App() {


  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Função de login
  const loginUser = async (
    loginEmail = email,
    loginPassword = password
  ) => {
    try {
      //Envia request
      const response = await fetch(
        "http://localhost:6050/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        }
      );

      //Aguarda resposta
      const data = await response.json();

      //Erros
      if (!response.ok) {
        throw new Error(
          data.message || "Erro ao realizar login"
        );
      }

      navigate('/home')
    } catch (error) {
      setMessage(error.message);
    }
  };

  //Função de registro
  const handleRegister = async (e) => {
    e.preventDefault();

    //Confirma senhas iguais antes de envia-las para a API
    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);

      //A request de registro em si
      //===============================================
      const response = await fetch(
        "http://localhost:6050/auth/cadastrarUsuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            numero: phone,
          }),
        }
      );
      //===============================================

      //Aguarda fetch e transforma em JSON
      const data = await response.json();

      //Se der errado, retorna erro.
      if (!response.ok) {
        setMessage(
          `
Status: ${data.status}
Erro: ${data.error}
Mensagem: ${data.message}
        `
        );
        return;
      }

      //Guarda informações não sensíveis para LGPD dentro do localstorage
      localStorage.setItem("role", data.role);
      localStorage.setItem(
        "username",
        data.username
      );

      setMessage(
        data.message || "Usuário registrado."
      );
      //Atraso para evitar login falho
      await new Promise(resolve => setTimeout(resolve, 300));

      await loginUser(email, password);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
    navigate('/home')
  };

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-linear-135 from-black to-purple-800'>
      <div
        id="login-container"
        className="w-full max-w-xl 
        bg-linear-to-br from-black to-blue-950
        border-2 border-purple-900 rounded-3xl
    shadow-2xl
    px-6
    sm:px-8
    py-10
  "
      >
        <div className="flex flex-col items-center">
          <img
            src={Toucan}
            alt="Logo"
            className="h-24 sm:h-32 md:h-40"
          />

          <h2
            className="
      text-2xl
      sm:text-3xl
      md:text-4xl
      font-bold
      text-white
      mt-4
      text-center
    "
          >
            {isRegister
              ? "Criar Conta"
              : "Faça Login"}
          </h2>
        </div>

        {!isRegister ? (
          <form
            onSubmit={handleRegister}
            className="mt-8 flex flex-col gap-5"
          >
            <div>
              <label className="block text-white font-bold mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="
            w-full p-3 rounded-lg bg-black/30
            border border-purple-600 text-white
          "
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">
                Senha
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="
            w-full
            p-3
            rounded-lg
            bg-black/30
            border
            border-purple-600
            text-white
          "
              />
            </div>

            <button
              type="submit"
              className="
          bg-purple-700
          hover:bg-purple-600
          py-3
          rounded-lg
          font-bold
          text-white
        "
            >
              Entrar
            </button>
          </form>
        ) : (
          <form
            id="Register"
            onSubmit={handleRegister}
            className="mt-8 flex flex-col gap-5"
          >
            <div>
              <label className="block text-white font-bold mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
                className="
            w-full
            p-3
            rounded-lg
            bg-black/30
            border
            border-purple-600
            text-white
          "
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="
            w-full
            p-3
            rounded-lg
            bg-black/30
            border
            border-purple-600
            text-white
          "
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">
                Número de Telefone
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                required
                className="
            w-full
            p-3
            rounded-lg
            bg-black/30
            border
            border-purple-600
            text-white
          "
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">
                Senha
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="
            w-full
            p-3
            rounded-lg
            bg-black/30
            border
            border-purple-600
            text-white
          "
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">
                Confirmar Senha
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
                className="
            w-full
            p-3
            rounded-lg
            bg-black/30
            border
            border-purple-600
            text-white
          "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
          bg-purple-700
          hover:bg-purple-600
          py-3
          rounded-lg
          font-bold
          text-white
        "
            >
              {loading
                ? "Registrando..."
                : "Registrar"}
            </button>
          </form>
        )}

        {message && (
          <div
            className="
      mt-5
      p-3
      rounded-lg
      bg-black/40
      border
      border-purple-700
      text-white
      text-center
    "
          >
            {message}
          </div>
        )}

        <div className="mt-8 text-center text-white">
          {!isRegister ? (
            <>
              Não tem uma conta?
              <button
                type="button"
                onClick={() =>
                  setIsRegister(true)

                }
                className="
            block
            mx-auto
            mt-2
            text-purple-400
            text-xl
            font-bold
            hover:text-purple-300
          "
              >
                Registre-se
              </button>
            </>
          ) : (
            <>
              Já possui uma conta?
              <button
                type="button"
                onClick={() =>
                  setIsRegister(false)
                }
                className="
            block
            mx-auto
            mt-2
            text-purple-400
            text-xl
            font-bold
            hover:text-purple-300
          "
              >
                Fazer Login
              </button>
            </>
          )}
        </div>
      </div>
      <button onClick={() => {
        navigate('/home')
      }}>

      </button>
    </div>
  )
}

export default App;