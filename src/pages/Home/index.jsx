import React, { useEffect, useState } from "react";
import IniciarTracking from "../../components/IniciarTracking";
import PerfilUsuario from "../../components/PerfilUsuario";
import useLoginProvider from "../../hooks/useLoginProvider";
import "./styles.css";

export default function Home() {
  const {
    token,
    handleLogout,
    setDadosLogado,
    nomeLogado,
    idLogado,
    emailLogado,
    telefoneLogado,
    update,
  } = useLoginProvider();

  const [modalOpen, setModalOpen] = useState(false);
  const [idPedido, setIdPedido] = useState("");
  const [pedidos, setPedidos] = useState([]);

  function handleAbrirModalTracking(pedidoID) {
    // console.log(pedidoID);

    setModalOpen(true);
    setIdPedido(pedidoID);
  }

  const handleMostraPedidosDisponiveis = async () => {
    try {
      const status = "em_aberto";

      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/pedidos?status=${status}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setPedidos(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    update();
    setDadosLogado(token);
    const carregarDados = async () => {
      if (token) {
        await handleMostraPedidosDisponiveis();
      }
    };
    carregarDados();
  }, []);
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
    <>
      <main className="main_app">
        <header>Pedidos</header>
        <PerfilUsuario
          nome={nomeLogado}
          id={idLogado}
          email={emailLogado}
          telefone={telefoneLogado}
        />
        <h1 className="main_app_title">Portal do Entregador</h1>
        <section className="main_app_section_pedidos">
          <button
            className="verPedidosButton"
            onClick={handleMostraPedidosDisponiveis}
          >
            Atualizar Pedidos Disponiveis
          </button>
          <h2 className="main_app_section_pedidos_title">
            {" "}
            Pedidos disponíveis
          </h2>
          <div className="main_app_section_pedidos_listagem">
            {pedidos.map((data) => {
              return (
                <div
                  key={data.id}
                  className="pedido"
                  onClick={() => handleAbrirModalTracking(data.id)}
                >
                  <span>{`ID #${data.id}`}</span>
                  <span>{data.cliente.nome}</span>
                  <span className="enderecoPedido">{`${
                    data.enderecoEntrega.split(",")[0]
                  } - ${data.enderecoEntrega.split(",")[3]}`}</span>
                  <span className="dataPedido">
                    {formataData(new Date(data.dataCriacao))}
                  </span>
                  <span className="statusPedido">
                    {data.status[0].toUpperCase() +
                      data.status.substr(1).replace("_", " ")}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
        {modalOpen ? (
          <IniciarTracking
            setModalOpen={setModalOpen}
            idPedido={idPedido}
            idLogado={idLogado}
          />
        ) : null}
      </main>
    </>
  );
}
