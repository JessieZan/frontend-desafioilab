import iconeSair from "../../assets/perfilUsuario/sair.svg";
import "./styles.css";
import useLoginProvider from "../../hooks/useLoginProvider.jsx"

export default function PerfilUsuario({ nome, id, email, telefone }) {

  const {handleLogout} = useLoginProvider();
  const nomes = typeof nome === "string" ? nome.replace("_", " ") : "";

  return (
    <>
      <div className="card">
        <div className="column">
          <p>
            <b>ID:</b> #{id}
          </p>
          <p>
            <b>Nome:</b> {nomes}
          </p>
        </div>
        <img
          src={iconeSair}
          className="logout"
          alt="Log-out"
          onClick={(e) => handleLogout(e)}
        />
      </div>
    </>
  );
}
