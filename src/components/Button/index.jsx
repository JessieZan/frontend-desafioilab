import React from "react";
import "./styles.css";

export default function ButtonRosa({ texto, classe  }) {
  return (
    <input
      type="submit"
      className={`botao ${classe}`}
      value={texto}
    />
  );
}
