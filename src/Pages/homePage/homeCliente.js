import React, { useEffect, useState } from "react";
import NavBar from '../../components/NavBar/navbar'
import Menu from '../../components/NavBar/menu';
import Card from '../../components/Card/card'
import Side from '../../components/Side/side';
import mate from '../../images/mate1.png';
import lupa from '../../images/navIconSearch.png';
import { useHistory } from 'react-router-dom';
import './homeCliente.css'

import useUser from '../../hook/useUser'

const HomeCliente = () => {

  const [ tipo, setTipo ] = useState(0);
  const history = useHistory();
  const {isLogged} = useUser();

  const getProductos = async () => {
    const response = await fetch(`http://localhost:5000/usuarios/productos/${tipo}`)
    const jsonData = await response.json();
  }

  useEffect(() => {
    if (!isLogged) {
      history.push('/');
    }
  }, [isLogged, history])

  return(
    <div className="Home">
      <NavBar/>        
      <div className="row">
        <div className="side">
          <Side/>
        </div>
      
        <div className="main">
          <Menu/>
          <div className="ofertas">
            <Card className="oferta"
              img={lupa}
            />
            <Card className="oferta"
              img={mate}
            />
          </div>
        </div>  
      </div>
    </div>
  )
}

export default HomeCliente;