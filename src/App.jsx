import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import useLoginProvider from "./hooks/useLoginProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pedido from "./pages/Pedido";

function App() {
  const { token } = useLoginProvider();

  //TODO: Apos ter a logica de login, refatorar para puxar o token e armazenar

  function RotasProtegidas(props) {
    return (
      <Route render={() => (token ? props.children : <Redirect to="/" />)} />
    );
  }

  React.useEffect(()=>{
    window.location.pathname === "/pedido" && console.log(window.location.replace("/"))
  },[])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={token ? Home : Login} />
        <Route path="/" exact component={token ? Home : Login} />
        <RotasProtegidas>
          <Route path="/home" component={Home} />
          <Route path="/pedido" component={Pedido} />
        </RotasProtegidas>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
