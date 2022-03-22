import React, {useState} from 'react'
import './styles.css';
import IniciarTracking from '../../components/IniciarTracking';

export default function Home() {

  const [modalOpen, setModalOpen] = useState(false);
  const [idPedido, setIdPedido] = useState(0);

  function handleAbrirModalTracking(e) {
    console.log(e.target);

    setModalOpen(true);
    setIdPedido(e.target.id)
    console.log(modalOpen)
  }

  return (
    <main className="main_app">
      <h1 className="main_app_title">Tela Entregador</h1>
      <section className="main_app_section_pedidos">
        <h2 className="main_app_section_pedidos_title">Todos os pedidos disponíveis:</h2>

        <div className="main_app_section_pedidos_listagem">
          <div className="pedido" onClick={handleAbrirModalTracking} id="1">
            <span id="1">Ovo frito cru</span>
            <span id="1">R$25.00</span>
            <span id="1">Av. Luis Viana</span>
          </div>
          <div className="pedido">
            <span>Pão com margarina</span>
            <span>R$25.00</span>
            <span>Av. Luis Viana</span>
          </div>
          <div className="pedido">
            <span>Acarajé DoceDoceDoceDoce</span>
            <span>R$25.00</span>
            <span>Av. Luis Viana</span>
          </div>
          <div className="pedido">
            <span>Suco de Mangaba</span>
            <span>R$25.00</span>
            <span>Av. Luis Viana</span>
          </div>
        </div>
      </section>
      {modalOpen ? <IniciarTracking setModalOpen={setModalOpen} idPedido={idPedido} /> : null} 
    </main>
  )
}
