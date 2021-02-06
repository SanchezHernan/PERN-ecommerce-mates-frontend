import React, { useEffect, useState } from "react";
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

  const getProductos = async () => {
    const response = await fetch(`http://localhost:5000/productos/${option}`)
    const jsonData = await response.json();
    return jsonData;
  }

  useEffect(() => {
    const fetchData = async () => {
      const request = await getProductos();
      const imgs = request.map((reqImg) => reqImg.imagen);
      setCardImg(imgs);
    }
    fetchData()
  }, [option]);

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
                {cardImg.map((imagen, i) => 
                  <Card className='oferta'
                    key={i}
                    img={imagen}
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