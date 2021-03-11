import React, { useEffect, useState } from "react";
import NavBar from '../../components/NavBar/navbar'
import Menu from '../../components/NavBar/menu'
import Card from '../../components/Card/card'
import Side from '../../components/Side/side'
import { useHistory } from 'react-router-dom'
import useOptions from '../../hook/useOptions'
import useUser from '../../hook/useUser'
import useDescuento from "../../hook/useDescuento";
import './homePage.css'

import getProducts from "../../services/getProducts"
import getOffers from "../../services/getOffers"
import getCombos from "../../services/getCombos";



const HomePage = () => {

  //STATE
  const history = useHistory()
  const {isLogged} = useUser()
  const {option, orden, combo, isCombo} = useOptions()
  const {calcularDescuento} = useDescuento()

  const [prodInfo, setProdInfo] = useState([])
  const [contador, setContador] = useState(0)
  

  //FUNCIONES

  const ordenarPorMenorPrecio = (array) => {
    return (array.sort((a, b) => {
        if (a.precio < b.precio){
            return -1;
        }
        else if (a.precio > b.precio){
            return 1;
        }
        return 0;
    }))
  }

  const ordenarPorMayorPrecio = (array) => {
    return (array.sort((a, b) => {
        if (a.precio > b.precio){
            return -1;
        }
        else if (a.precio < b.precio){
            return 1;
        }
        return 0;
    }))
  }

  const ordenarPorCalificacion = (array) => {
    return (array.sort((a, b) => {
        if (a.calificacion > b.calificacion){
            return -1;
        }
        else if (a.calificacion < b.calificacion){
            return 1;
        }
        return 0;
    }))
  }


  //EFECTOS
  useEffect(() => {
    if (!isLogged) {
      history.push('/');
      console.log(contador)
    }
  }, [isLogged, history])


  useEffect(() => {
    const fetchData = async () => {
      if (option === '0') {
        isCombo(false)
        const request = await getOffers();
        const info = request.map((producto) => calcularDescuento(producto))
        setProdInfo(info)
      } else if (option === '5'){
        isCombo(true)
        const resp = await getCombos()
        setProdInfo(resp)
      } else {
        isCombo(false)
        const request = await getProducts({option})
        const info = request.map((producto) => calcularDescuento(producto))
        setProdInfo(info)        
      }
    }
    fetchData()
  }, [option])

  
  useEffect(() => {
    let porOrdenar = prodInfo
    if (orden === '1'){
      setProdInfo(ordenarPorMenorPrecio(porOrdenar));
    } else if (orden === '2') {
      setProdInfo(ordenarPorMayorPrecio(porOrdenar));
    }
    else if (orden === '3'){
      setProdInfo(ordenarPorCalificacion(porOrdenar));
    }
    console.log(prodInfo)
    setContador(contador + 1);
  }, [orden])



  return(
      <div className="Home">
        <NavBar/>        
        <div className="fila">
          <div className="side">
            <Side/>
          </div>
          <div className="main">
            <Menu/> 
              {combo ?
              <div className='ofertas'>
                {prodInfo.map((elemento) =>
                  <Card className='oferta'
                    key={elemento.codigo}
                    nombre={elemento.nombre}
                    precio={elemento.precio}
                    codigo={elemento.codigo}
                  />
                )}
              </div>
              :
              <div className='ofertas'> 
                {prodInfo.map((elemento) => 
                  <Card className='oferta'
                    key={elemento.codigo}
                    img={elemento.imagen}
                    nombre={elemento.nombre}
                    precio={elemento.precio}
                    descuento={elemento.porcdescuento}
                    codigo={elemento.codigo}
                  />
                )}
              </div>
              }
          </div>  
        </div>
      </div>
  )
}

export default HomePage;