import { useState } from "react";
import { useLocalStorage } from "react-use";

function useLoginProvider() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [idEntregador, setIdEntregador, removeIdEntregador] = useLocalStorage(
    "idEntregador",
    ""
  );
  const [pedidoCache, setPedidoCache, removePedidoCache] = useLocalStorage(
    "pedidoCache",
    ""
  );
  const [idLogado, setIdLogado] = useState("");
  const [nomeLogado, setNomeLogado] = useState();

  async function update() {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}`);
    const data = await response.json();
  }

  function handleLogout(e) {
    e.preventDefault();
    //removeDadosUsuario('dados', '');
    removeToken("token", "");
    console.log("Entrei no longout login");
    removeIdEntregador("idEntregador", "")
    document.location.reload(true);
    history.push("/login");
  }

  function getDadosToken(token) {
    var payload = token.split(".")[1]; //pegar a segunda parte do token
    return JSON.parse(window.atob(payload)); //atob decodifica uma string base64
  }
  function setDadosLogado(token) {
    const dadosToken = getDadosToken(token);
    const { sub } = dadosToken;
    setNomeLogado(sub.split(",")[0]);
    setIdLogado(sub.split(",")[1]);
    // setEmailLogado(sub.split(",")[2]);
    // setTelefoneLogado(sub.split(",")[3]);
    setIdEntregador(sub.split(",")[1]);
  }

  return {
    token,
    setToken,
    handleLogout,
    setDadosLogado,
    idLogado,
    idEntregador,
    nomeLogado,
    update,
    pedidoCache,
    setPedidoCache,
    removePedidoCache,
    removeIdEntregador
  };
}

export default useLoginProvider;
