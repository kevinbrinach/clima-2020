import React, { Fragment, useState, useEffect } from 'react';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Clima from './Components/Clima';
import Error from './Components/Error';

function App() {

  //state del formulario
  const [ busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [ consultar, guardarConsultar ] = useState(false)
  const [ resultado, guardarResultado ] = useState({})
  const [ error, guardarError ] = useState(false)

  //extraer ciudad y pais
  const { ciudad, pais } = busqueda

  useEffect( () => {
    const consultarApi = async () => {
      if (consultar) {
        const appId = '4a75a664b930859da1a0e3416d80ee8f';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

        const respuesta = await fetch(url);
        const resultado = await respuesta.json()
        guardarResultado(resultado);
        guardarConsultar(false)

        //Detecta si hubo resultados correctos
        if(resultado.cod === '404') {
          guardarError(true)
        } else {
          guardarError(false)
        }
      }
    }
    consultarApi()
  }, [consultar])

  let componente
  if(error) {
    componente = <Error mensaje="No Hay Resultados"/>
  } else {
    componente = <Clima 
                  resultado={resultado}
                />
  }


  return (
    <Fragment>
      <Header
        titulo='Clima React App'
      ></Header>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
