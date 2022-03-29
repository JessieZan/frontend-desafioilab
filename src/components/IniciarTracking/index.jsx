import React, { useEffect, useState } from "react";
import useLoginProvider from "../../hooks/useLoginProvider";
import Botao from "../Button";
import ConcluirPedido from "../ConcluirPedido";
import "./styles.css";

export default function IniciarTracking({ setModalOpen, idPedido }) {
  const { token } = useLoginProvider();
  const [modalConcluirPedido, setModalConcluirPedido] = useState(false);
  const [dadosEntregador, setDadosCobranca] = useState({
    cliente_id: "",
    descricao: "",
    vencimento: "",
    valor: "",
    status: "",
  });

  // GEOLOCATION  UTIL
  const [localizacao, setLocalizacao] = useState("");
  const [idClearWatch, setIdClearWatch] = useState("");
  const options = {
    enableHighAccuracy: true,
  };
  function transferCoords(pos) {
    const coords = pos.coords;
    setLocalizacao(`${coords.latitude} ${coords.longitude}`);
  }

  function errorTransferCoords(error) {
    console.warn("ERROR TO GET LOCALIZATION");
  }
  // GEOLOCATION  UTIL

  async function handleIniciarTracking() {
    console.log("pedido iniciado", idPedido);
    const gps = navigator.geolocation.watchPosition(
      transferCoords,
      errorTransferCoords,
      options
    );
    setIdClearWatch(gps);
    setModalConcluirPedido(true);
  }

  useEffect(async () => {
    if (localizacao.length === 0) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/pedidos/cadastrar-coordenada`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            idPedido: idPedido,
            idEntregador: 1,
            timestamp: new Date(),
            coordenada: localizacao,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, [localizacao]);

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
            <Botao texto={"Iniciar"} />
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
