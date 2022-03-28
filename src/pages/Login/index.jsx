import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Button";
import useLoginProvider from "../../hooks/useLoginProvider";
import "./styles.css";

function Login() {
  const { setToken } = useLoginProvider();

  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioNaoExiste, setUsuarioNaoExiste] = useState(false);
  //TODO: Implementar logica para buscar se o email e senha existem

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    if (usuarioNaoExiste) {
      return toast.error("Usuário não existe!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }

    const promise = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        telefone: telefone,
        senha: senha,
      }),
    });

    const response = await promise.json();
    const credenciais = response.token.replace("Bearer ", "");
    setToken(credenciais);

    history.push("/home");
    document.location.reload(true);
  }

  return (
    <main className="tela_login">
      <ToastContainer
        className="toast-error"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />

      <section className="tela_login_direita">
        <h2 className="tela_login_direita_titulo">Faça seu login!</h2>

        <form onSubmit={handleLogin}>
          <div className="form_input email_login">
            <label htmlFor="input-email" className="form_label_login">
              E-mail ou telefone
            </label>
            <input
              className="input_login"
              type="text"
              name="input-email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form_input senha_login botao">
            <label htmlFor="input-senha" className="form_label_login">
              Senha
            </label>
            <input
              className="input_login"
              type="password"
              name="input-senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="tela_login_direita_div_botao">
            <Button texto={"Entrar"} />
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
