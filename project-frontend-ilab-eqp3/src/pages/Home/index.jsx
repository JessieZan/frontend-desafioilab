import React, {useState, useEffect} from 'react'
import './styles.css';
import IniciarTracking from '../../components/IniciarTracking';

export default function Home() {

  const [modalOpen, setModalOpen] = useState(false);
  const [idPedido, setIdPedido] = useState(0);
  const [pedidos, setPedidos] = useState([]);
  const [mostraSubTitulo, setMostraSubTitulo] = useState(false);
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
              Authorization: `Bearer ${testeToken}`
            }
          }
         );
         const data = await response.json();
         setPedidos(data);
         console.log(data);
         setMostraSubTitulo(true);
       } catch (error) {
           console.log(error.message);
    }
 };

  useEffect(() => {
    //quando receberem o token do login temos que passar por propin driling ou contexto até aqui para podermos valida-los.
    setTesteToken(`eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NWl0YWxvQGVtYWlsLmNvbSw3MTEyMzQ1Njc4OSIsImlzcyI6IkZvb2RMb3ZlcnMiLCJleHAiOjE2NDgzMjc1MzV9.dOy1MVKRwwVIRdG0RWK892nb1gEAH4ty67ePMvWbt6w`);

   if (testeToken) {
     //const { exp } = jwt_decode(testeToken)
       //console.log(exp)
     }
    handleMostraPedidosDisponiveis();
},[])
function formataData(data) {
  const formato = { year: 'numeric', month: 'numeric', day: 'numeric' ,hour:'numeric',minute:'numeric'};
  return data.toLocaleDateString('pt-BR', formato);
}
  return (
    <main className="main_app">
      <header>Pedidos</header>
      <h1 className="main_app_title">Tela Entregador</h1>
      <section className="main_app_section_pedidos">
        <button className='verPedidosButton'  onClick={handleMostraPedidosDisponiveis}>Ver Pedidos</button>
        {mostraSubTitulo?<h2 className="main_app_section_pedidos_title" > Pedidos disponíveis</h2>:null}
        <div className="main_app_section_pedidos_listagem">
        {pedidos.map((data) => {
          return(           
          <div className="pedido" onClick={(data)=>handleAbrirModalTracking(data.id)}>
            <span >{`ID #${data.id}`}</span>
            <span >{data.cliente.nome}</span>
            <span >{`R$ ${(data.valorTotal/100).toFixed(2)}`}</span>
            <span className='dataPedido'>{formataData(new Date(data.dataCriacao))}</span>
            <span >{data.status}</span>
          </div>

          );
        })
        }
        </div>
      </section>
      {modalOpen ? <IniciarTracking setModalOpen={setModalOpen} idPedido={idPedido} /> : null} 
    </main>
  )
}
