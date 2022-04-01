import React from "react";
import Botao from "../Button";
import "./styles.css";

export default function ConcluirPedido({ setModalOpen, idPedido }) {
  async function concluirPedido(params) {
    window.alert("CONCLUIU");
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
            <Botao texto={"Concluir"} classe={"tela_login_direita_botao_login"} />
          </div>
        </div>
      </section>
    </main>
  );
}
