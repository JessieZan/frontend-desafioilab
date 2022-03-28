import React, {useState, useEffect} from 'react'
import './styles.css';
import IniciarTracking from '../../components/IniciarTracking';

import useLoginProvider from "../../hooks/useLoginProvider";
export default function Home() {
  const  {
    token
  } = useLoginProvider();

  const [modalOpen, setModalOpen] = useState(false);
  const [idPedido, setIdPedido] = useState(0);
  const [pedidos, setPedidos] = useState([]);
  const [testeToken, setTesteToken] = useState(0);
  
  function handleAbrirModalTracking(pedidoID) {
    setModalOpen(true);
    setIdPedido(pedidoID);
    console.log(modalOpen)
  }

  const handleMostraPedidosDisponiveis = async () => {
        try {
          const response = await fetch(
          `http://localhost:8080/pedidos/em-aberto`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`
            }
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
    // if (token) {
    //   const { exp } = jwt_decode(token)
    //    console.log(exp)
    //   }
      const carregarDados = async () => {
       if (token) {
         await handleMostraPedidosDisponiveis();
       }
     }
     carregarDados();
 },[])
function formataData(data) {
  const formato = { year: 'numeric', month: 'numeric', day: 'numeric' ,hour:'numeric',minute:'numeric'};
  return data.toLocaleDateString('pt-BR', formato);
}
  return (
    <>
      <header>Pedidos</header>
    <main className="main_app">
      <h1 className="main_app_title">Tela Entregador</h1>
      <section className="main_app_section_pedidos">
        <button className='verPedidosButton'  onClick={handleMostraPedidosDisponiveis}>Atualizar Pedidos Disponiveis</button>
        <h2 className="main_app_section_pedidos_title" > Pedidos disponíveis</h2>
        <div className="main_app_section_pedidos_listagem">
        {pedidos.map((data) => {
          return(           
          <div className="pedido" onClick={(data)=>handleAbrirModalTracking(data.id)}>
            <span >{`ID #${data.id}`}</span>
            <span >{data.cliente.nome}</span>
            <span >{`R$ ${(data.valorTotal/100).toFixed(2)}`}</span>
            <span className='dataPedido'>{formataData(new Date(data.dataCriacao))}</span>
            <span className='statusPedido'>{data.status}</span>
          </div>

          );
        })
        }
        </div>
      </section>
      {modalOpen ? <IniciarTracking setModalOpen={setModalOpen} idPedido={idPedido} /> : null} 
    </main>
    </>
  )
}