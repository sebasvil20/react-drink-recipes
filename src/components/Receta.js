import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Receta = ({ receta }) => {
  //Configuracion del modal de material-ui

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // extraer valores del context
  const { inforeceta, guardarIdReceta, guardarReceta } = useContext(
    ModalContext
  );

  //muestra y formatea los ingredientes
  const mostrarIngredientes = (inforeceta) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (inforeceta[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {inforeceta[`strIngredient${i}`]} {inforeceta[`strMeasure${i}`]}
          </li>
        );
      }
    }
    console.log(ingredientes);
    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink} </h2>
        <img
          className="card-img-top"
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              guardarIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver Receta
          </button>
          <Modal
            open={open}
            onClose={() => {
              handleClose();
              guardarIdReceta(null);
              guardarReceta({});
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{inforeceta.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{inforeceta.strInstructions}</p>
              <img className="img-fluid my-4" src={inforeceta.strDrinkThumb} />
              <h3>Ingredientes y cantidades</h3>
              <ul>{mostrarIngredientes(inforeceta)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
