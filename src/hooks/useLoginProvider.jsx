import { useLocalStorage } from "react-use";

function useLoginProvider() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");

  function handleLogout(e) {
    e.preventDefault();
    removeDadosUsuario("dados", "");
    return removeToken("token", "");
  }

  return {
    token,
    setToken,
    handleLogout,
  };
}

export default useLoginProvider;
