import React, { useState } from "react";
import NavBar from '../../components/NavBar/navbar'
import Menu from '../../components/NavBar/menu';
import Card from '../../components/Card/card'
import Side from '../../components/Side/side';
import mate from '../../images/mate1.png';
import lupa from '../../images/navIconSearch.png';
import './homeCliente.css'

const HomeCliente = () => {

  const [ tipo, setTipo ] = useState(0);

  const getProductos = async () => {
    const response = await fetch(`http://localhost:5000/usuarios/productos/${tipo}`)
    const jsonData = await response.json();
  }

 

/*
  const getUsuarios = async (param) => {
    let jsonData;
    if(param.email.length > 0 && param.password.length > 0) {
      try {
        const response = await fetch(`http://localhost:5000/usuarios/${param.email}`)
        jsonData = await response.json();
        if(jsonData.email.length > 0){
          console.log(jsonData.email)
          setWrongEmail(false);
          if(jsonData.contrasenia === param.password){
            setWrongPassword(false);
            setIsLogin(true);
          } else {
            setWrongPassword(true);
            setIsLogin(false);
          }
        }
      } catch (err) {
        setWrongEmail(true);
        setWrongPassword(false);
        setIsLogin(false);
        console.error(err.message);
      }
    } else {
      setIsLogin(false);
      setWrongPassword(false);
    }
  }
*/

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