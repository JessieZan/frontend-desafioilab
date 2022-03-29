import {useEffect, useState} from 'react';
import './styles.css';
import iconeSair from "../../assets/perfilUsuario/sair.svg"
import setaOpcoes from "../../assets/perfilUsuario/setaParaBaixo.svg"
export default function PerfilUsuario({nome, id , email, telefone}) {

return (
  <>
  <div className="card">
    <div className='column'>
      <p><b>ID:</b> #{id}</p>
      <p><b>Nome:</b> {nome.replace("_"," ")}</p>
    </div>
    <img src={iconeSair} 
    className="logout" 
    alt ="Log-out"
    onClick={(e)=>handleLogout(e)}
    />
  </div>

</>
);
}
