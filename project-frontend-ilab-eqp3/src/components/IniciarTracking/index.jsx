import React, {useState} from 'react'
import './styles.css'
import Botao from '../Button'
import ConcluirPedido from '../ConcluirPedido'

export default function IniciarTracking({setModalOpen, idPedido}) {

  const [modalConcluirPedido, setModalConcluirPedido] = useState(false);
  const [dadosEntregador, setDadosCobranca] = useState({
    cliente_id: "",
    descricao: "",
    vencimento: "",
    valor: "",
    status: ""
  });

  async function handleIniciarTracking(params) {
    //handleEditaUsuario(idPedido);
    console.log("pedido iniciado", idPedido);

    setModalConcluirPedido(true);
  }
  // const handleEditaUsuario = async (idPedido) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/pedidos/atribuir/${idPedido}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(              {
              //   id: 1,
              //   nome: "",
              //   email: "",
              //   telefone: "",
              //   emEntrega: false 
              // }),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //       console.log(error.message);
  //   }
  // };

  return (
    <main className="modal_iniciarTracking">
      <section className="modal_iniciarTracking_conteudo">
        <h1 className="modal_iniciarTracking_title">Iniciar entrega do pedido?</h1>

        <div className="modal_iniciarTracking_botoes">
          <div className="modal_iniciarTracking_botoes_confirmar" onClick={handleIniciarTracking}>
            <Botao />
          </div>
          <div className="modal_iniciarTracking_botoes_cancelar" onClick={() => setModalOpen(false)}>
            <Botao texto={"Cancelar"} />
          </div>
        </div>
      </section>

      {modalConcluirPedido ? <ConcluirPedido /> : null}
      
    </main>
  )
}
