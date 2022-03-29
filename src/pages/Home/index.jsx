import React, { useState } from "react";
import IniciarTracking from "../../components/IniciarTracking";
import useLoginProvider from "../../hooks/useLoginProvider";
import "./styles.css";

export default function Home() {
  const { token } = useLoginProvider();
  const [modalOpen, setModalOpen] = useState(false);
  const [idPedido, setIdPedido] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [mostraSubTitulo, setMostraSubTitulo] = useState(false);
  const [testeToken, setTesteToken] = useState(0);

  function handleAbrirModalTracking(pedidoID) {
    console.log(pedidoID);
    setModalOpen(true);
    setIdPedido(pedidoID);
  }

  const handleMostraPedidosDisponiveis = async () => {
    try {
      const response = await fetch(`http://localhost:8080/pedidos/em-aberto`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setPedidos(data);
      setMostraSubTitulo(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  function formataData(data) {
    const formato = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return data.toLocaleDateString("pt-BR", formato);
  }

  return (
    <main className="main_app">
      <header>Pedidos</header>
      <h1 className="main_app_title">Tela Entregador</h1>
      <section className="main_app_section_pedidos">
        <button
          className="verPedidosButton"
          onClick={handleMostraPedidosDisponiveis}
        >
          Ver Pedidos
        </button>
        {mostraSubTitulo ? (
          <h2 className="main_app_section_pedidos_title">
            {" "}
            Pedidos disponíveis
          </h2>
        ) : null}
        <div className="main_app_section_pedidos_listagem">
          {pedidos.map((data) => {
            return (
              <div
                className="pedido"
                onClick={() => handleAbrirModalTracking(data.id)}
              >
                <span>{`ID #${data.id}`}</span>
                <span>{data.cliente.nome}</span>
                <span>{`R$ ${(data.valorTotal / 100).toFixed(2)}`}</span>
                <span className="dataPedido">
                  {formataData(new Date(data.dataCriacao))}
                </span>
                <span className="statusPedido">{data.status}</span>
              </div>
            );
          })}
        </div>
      </section>
      {modalOpen ? (
        <IniciarTracking setModalOpen={setModalOpen} idPedido={idPedido} />
      ) : null}
    </main>
  );
}
