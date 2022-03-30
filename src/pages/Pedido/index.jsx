import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Button";
import useLoginProvider from "../../hooks/useLoginProvider";
import "./styles.css";

function Pedido() {
  const history = useHistory();
  const { state } = useLocation();
  const { token } = useLoginProvider();
  const [pedido, setpedido] = useState([]);
  const [idpedido, setidpedido] = useState("");
  const [dataPedidoFormat, setdataFromat] = useState([]);
  const [horapedidoFormat, sethoradataFromat] = useState([]);
  const [valor, setvalor] = useState("");
  const [status, setstatus] = useState("");
  const [endereco, setendereco] = useState("");
  const [cliente, setcliente] = useState("");
  const [entregador, setentregador] = useState("");
  const id = state.id;

  const mostrarPedidoId = async (e) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/pedidos/${id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setpedido(data);
      setidpedido(data.id);

      let dataSplit = data.dataCriacao.split("T");
      let horaSplit = dataSplit[1].split(".");
      let enderecoPedido = data.enderecoEntrega.split(",");
      setcliente(data.cliente);
      setvalor(data.valorTotal);
      setendereco(enderecoPedido);
      setdataFromat(dataSplit);
      sethoradataFromat(horaSplit);
      setstatus(data.status);
      setentregador(data.entregador.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  async function handleCancelarPedido(e) {
    try {
      const acao = "cancelar";
      const idEntregador = 1;
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/pedidos/${id}?acao=${acao}&idEntregador=${idEntregador}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      history.push("/home");
      const data = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleFinalizarPedido(e) {
    try {
      const acao = "finalizar";
      const idEntregador = 1;
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/pedidos/${id}?acao=${acao}&idEntregador=${idEntregador}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      history.push("/home");
      const data = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const carregarDadosPedido = async () => {
      await mostrarPedidoId();
    };
    carregarDadosPedido();
  }, []);

  return (
    <main className="tela-pedido">
      <header>Pedido</header>
      <nav className="box pedidot">
        <h3 className="info">Id do pedido: #{idpedido}</h3>
        <h3>Data: {dataPedidoFormat[0]}</h3>
        <h3>Hora: {horapedidoFormat[0]}s</h3>
      </nav>
      <nav className="box">
        <h3 className="info">Cliente</h3>
        <h3> Id: {cliente.id}</h3>
        <h3> Nome: {cliente.nome}</h3>
      </nav>
      <nav className="box">
        <h3 className="info">Endereço da Entrega</h3>
        <h3> Rua: {endereco[0]}</h3>
        <h3> Numero: {endereco[1]}</h3>
        <h3> Bairro: {endereco[2]}</h3>
        <h3> Cidade: {endereco[3]}</h3>
      </nav>
      <nav className="box">
        <h3 className="info">Detalhes do pedido</h3>
        <h3> Valor: R$ {valor / 100},00</h3>
        {/* <h3> Status: {status === "em_aberto"? "Em andamento" : "Em Aberto" }</h3> */}
        <h3> Status: {status}</h3>
      </nav>
      <div className="botoes">
        <button className="btn green" onClick={handleFinalizarPedido}>
          {" "}
          Concluir{" "}
        </button>
        <button className="btn red" onClick={handleCancelarPedido}>
          {" "}
          Cancelar{" "}
        </button>
      </div>
    </main>
  );
}

export default Pedido;
