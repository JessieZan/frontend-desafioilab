import React, {useState} from 'react'
import './styles.css'
import Botao from '../Button'
import ConcluirPedido from '../ConcluirPedido'

export default function IniciarTracking({setModalOpen, idPedido}) {

  const [modalConcluirPedido, setModalConcluirPedido] = useState(false);

  async function handleIniciarTracking(params) {
    console.log("pedido iniciado", idPedido);

    setModalConcluirPedido(true);
  }

  return (
    <main className="modal_iniciarTracking">
      <section className="modal_iniciarTracking_conteudo">
        <h1 className="modal_iniciarTracking_title">Iniciar entrega do pedido?</h1>

        <div className="modal_iniciarTracking_botoes">
          <div className="modal_iniciarTracking_botoes_confirmar" onClick={handleIniciarTracking}>
            <Botao />
          </div>
          <div className="modal_iniciarTracking_botoes_cancelar" onClick={() => setModalOpen(false)}>
            <Botao texto={"Cancelar"} />
          </div>
        </div>
      </section>

      {modalConcluirPedido ? <ConcluirPedido /> : null}
      
    </main>
  )
}
