import React from "react";
import "./styles.css";

export default function ButtonRosa({ texto }) {
  return (
    <input
      type="submit"
      className="tela_login_direita_botao_login botao"
      value={texto}
    />
  );
}
