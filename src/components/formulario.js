import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from "prop-types";

const Formulario = (props) => {
    //extraer los props
    const {crearCita} = props

  //crear state de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    dueño: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, actualizarError] = useState(false)

  //funcion que se ejecuta cada que el usuario escribe

  const actualizarState = (e)=>{  
     actualizarCita({
        ...cita,
        [e.target.name]: e.target.value
     })
     
     
  }

  //EXTRAER LOS VALORESD
  const {mascota,dueño,fecha,hora,sintomas} = cita;

  const submitcita = (e)=>{
     e.preventDefault();
    

     //validar formulario
     if (mascota.trim() === "" || dueño.trim() === ""|| fecha.trim() === "" || hora.trim() === ""|| sintomas.trim() === "") {
        actualizarError(true);
        return;
     }
     //eliminar el mensjae previo
     actualizarError(false)

     //asginar un id
     cita.id = uuidv4();
    
    //agregar ka cuita al arreglo
     crearCita(cita)
    ///reiniciar el form
    actualizarCita({
      mascota: "",
      dueño: "",
      fecha: "",
      hora: "",
      sintomas: "",
    })
  }
  

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error? <p className="alerta-error">todo los campos son obligatorio</p>: null}

      <form onSubmit={submitcita}>
        <label  htmlFor="mascota">Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label htmlFor="dueño">Dueño</label>
        <input
          type="text"
          name="dueño"
          className="u-full-width"
          placeholder="Nombre del Dueño"
          onChange={actualizarState}
          value={dueño}
        />

        <label htmlFor="fecha">Fecha</label>
        <input 
        type="date" 
        name="fecha" 
        className="u-full-width"
        onChange={actualizarState}
        value={fecha}
        />

        <label htmlFor="hora">Hora</label>
        <input 
        type="time" 
        name="hora" 
        className="u-full-width"
        onChange={actualizarState}
        value={hora} />

        <label htmlFor="sintomas">Sintomas</label>
        <textarea 
        className="u-full-width" 
        name="sintomas"
        onChange={actualizarState}
        value={sintomas}
        ></textarea>

        <button 
        className="u-full-width button-primary" 
        type="submit">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes ={
  crearCita : PropTypes.func.isRequired
}

export default Formulario;
