import {useState} from 'react';
import './styles.css';
import useLoginProvider from "../../hooks/useLoginProvider";
import iconeSair from "../../assets/perfilUsuario/sair.svg"
export default function PerfilUsuario() {
    const  {
        handleLogout,
        idLogado,
        nomeLogado,
        emailLogado,
        telefoneLogado
      } = useLoginProvider();

return (
  <div className={`containerPerfilUsuario`}>
    <span className="imagemPerfil">
    </span>
    <p className="nomeUsuario">{nomeLogado}</p>
    <div className="contemOpcoesPerfil">
      <img
        //src={setaOpcoes}
        alt="seta modal editar e sair"
        className="abreOpcoesPerfil"
        // onClick={() => setOpcoesPerfilAberta(!opcoesPerfilAberta)}
      />
      <div className="opcoesPerfil">
        <img
          className="separa16"
          //src={btnEditarCadastro}

          alt="botão de edição"
          //onClick={handleAbreEdicao}
        />
        <img
          src={iconeSair}
          alt="botão de sair"
          onClick={(e)=>handleLogout(e)}
        />
      </div>
    </div>
  </div>
);
}
