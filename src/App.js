import React, { Fragment, useState,useEffect } from "react";
import Formulario from "./components/formulario";
import Cita from "./components/ListadoCitas";
import "./index.css"


function App() {
//arreglo de citas

    //Citas en local storage

    let citasInciales = JSON.parse(localStorage.getItem('citas'));
     if (!citasInciales) {
       citasInciales =[];
     }

  
     const [citas,guardarCitas] = useState(citasInciales);
   //useEfect para realizar ciertas operaciones cuan el stete cambia
   useEffect(()=>{
    if (citasInciales) {
      localStorage.setItem("citas",JSON.stringify(citas))
    }else{
      localStorage.setItem("citas",JSON.stringify([]));
    }
     
   },[citas,citasInciales])

   //funcion que tome las citas actuales y agregue las nuevas
   const crearCita = cita =>{
     
    guardarCitas([//agregar la cita al arreglo
      ...citas,
      cita
    ])
     
   }

   //funcion que elimina una cita por id
   
   const eliminarCita = id =>{
    const nuevaCita = citas.filter(cita => cita.id !== id)
     guardarCitas(nuevaCita)
   }

//mensaje condicional
const titulo = citas.length === 0 ? 
<h2>No hay cita</h2> :  <h2>Administra tus Citas</h2>;
  return (
    <Fragment>
      <h1>Administrador de Paciente</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
             crearCita={crearCita}

            />
          </div>
          <div className="one-half column">
           {titulo}
            {citas.map(cita =>(
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
