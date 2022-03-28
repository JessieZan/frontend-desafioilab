import React from 'react';
import Botao from '../Button';
import './styles.css';

export default function ConcluirPedido({setModalOpen, idPedido}) {

  async function concluirPedido(params) {
    try {
      const response = await fetch(
        `${process.env}/pedidos/finalizado/${idPedido}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <main className="modal_iniciarTracking">
      <section className="modal_iniciarTracking_conteudo">        
        <h1 className="modal_iniciarTracking_title">Concluir entrega?</h1>

        <div className="modal_iniciarTracking_botoes">
          <div className="modal_iniciarTracking_botoes_confirmar" onClick={concluirPedido}>
            <Botao texto={"Concluir"} />
          </div>
        </div>
      </section>
    </main>
  )
}
