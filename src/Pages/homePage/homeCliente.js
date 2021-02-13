import React, { useCallback, useEffect, useState } from "react";
import NavBar from '../../components/NavBar/navbar'
import Menu from '../../components/NavBar/menu';
import Card from '../../components/Card/card'
import Side from '../../components/Side/side';
import mate from '../../images/mate1.png';
import lupa from '../../images/navIconSearch.png';
import { useHistory } from 'react-router-dom';
import useOptions from '../../hook/useOptions'
import useUser from '../../hook/useUser'
import './homeCliente.css'


const HomeCliente = () => {
  
  const history = useHistory();
  const {isLogged} = useUser();
  const {option} = useOptions();
  const [cardImg, setCardImg] = useState([]);


  const calcularDescuento = (p) => {
    const prod = p;
    if (p.porcdescuento !== 0){
      prod.porcdescuento = (p.precio - (p.precio * p.porcdescuento / 100));
    }
    return prod;
  }


  const getProductos = useCallback(async () => {
    const response = await fetch(`http://localhost:5000/productos/${option}`)
    const jsonData = await response.json();
    return jsonData;
  }, [option])

  const getOfertas = async () => {
    const response = await fetch(`http://localhost:5000/ofertas`)
    const jsonData = await response.json();
    return jsonData;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (option !== '0') {
        const request = await getProductos();
        const info = request.map((producto) => calcularDescuento(producto));
        setCardImg(info)
      } else {
        const request = await getOfertas();
        const info = request.map((producto) => calcularDescuento(producto));
        setCardImg(info);
      }
    }
    fetchData()
  }, [option, getProductos]);

  useEffect(() => {
    if (!isLogged) {
      history.push('/');
    }
  }, [isLogged, history])

 

  return(
      <div className="Home">
        <NavBar/>        
        <div className="fila">
          <div className="side">
            <Side/>
          </div>
        
          <div className="main">
            <Menu/>
            {
              option === 0 ?
              <div className='ofertas'>
                <Card className="oferta"
                  img={lupa}
                />
                <Card className="oferta"
                  img={mate}
                />
              </div>
              :
              <div className='ofertas'>
                {cardImg.map((elemento, i) => 
                  <Card className='oferta'
                    key={i}
                    img={elemento.imagen}
                    nombre={elemento.nombre}
                    precio={elemento.precio}
                    descuento={elemento.porcdescuento}
                  />
                )}
              </div>
            }
          </div>  
        </div>
      </div>
  )
}

export default HomeCliente;