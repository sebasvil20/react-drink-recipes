import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

//crear el context

export const ModalContext = createContext();

const ModalProvider = (props) => {
  // state del provider

  const [idreceta, guardarIdReceta] = useState(null);
  const [inforeceta, guardarReceta] = useState({});

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const resultado = await axios.get(url);
      guardarReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();
  }, [idreceta]);

  return (
    <ModalContext.Provider
      value={{ guardarIdReceta, inforeceta, guardarReceta }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
