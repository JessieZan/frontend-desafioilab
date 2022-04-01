import React, { useEffect, useState } from "react";
import useLoginProvider from "../../hooks/useLoginProvider";
import Botao from "../Button";
import ConcluirPedido from "../ConcluirPedido";
import "./styles.css";
import { useHistory } from "react-router-dom";

export default function IniciarTracking({ setModalOpen, idPedido, idLogado }) {
  const { token } = useLoginProvider();
  const history = useHistory();
  const [modalConcluirPedido, setModalConcluirPedido] = useState(false);
  const [dadosEntregador, setDadosCobranca] = useState({
    cliente_id: "",
    descricao: "",
    vencimento: "",
    valor: "",

    status: "",
  });


  async function handleIniciarTracking() {    
    history.push("/pedido", { id: idPedido });
  }



  return (
    <main className="modal_iniciarTracking">
      <section className="modal_iniciarTracking_conteudo">
        <h1 className="modal_iniciarTracking_title">
          Iniciar entrega do pedido?
        </h1>

        <div className="modal_iniciarTracking_botoes">
          <div
            className="modal_iniciarTracking_botoes_confirmar"
            onClick={handleIniciarTracking}
          >
            <Botao texto={"Iniciar"} classe={"tela_login_direita_botao_login"} />
          </div>
          <div
            className="modal_iniciarTracking_botoes_cancelar"
            onClick={() => setModalOpen(false)}
          >
            <Botao texto={"Cancelar"} />
          </div>
        </div>
      </section>

      {modalConcluirPedido ? (
        <ConcluirPedido idPedido={idPedido} idClearWatch={idClearWatch} />
      ) : null}
    </main>
  );
}
