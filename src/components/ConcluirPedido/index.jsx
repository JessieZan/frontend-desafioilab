import React from "react";
import useLoginProvider from "../../hooks/useLoginProvider";
import Botao from "../Button";
import "./styles.css";

export default function ConcluirPedido({
  setModalOpen,
  idPedido,
  idClearWatch,
}) {
  const { token } = useLoginProvider();

  async function concluirPedido(params) {
    navigator.geolocation.clearWatch(idClearWatch);

    console.log(`encerrando pedido ${idPedido}`);
  }

  return (
    <main className="modal_iniciarTracking">
      <section className="modal_iniciarTracking_conteudo">
        <h1 className="modal_iniciarTracking_title">Concluir entrega?</h1>

        <div className="modal_iniciarTracking_botoes">
          <div
            className="modal_iniciarTracking_botoes_confirmar"
            onClick={concluirPedido}
          >
            <Botao texto={"Concluir"} />
          </div>
        </div>
      </section>
    </main>
  );
}
