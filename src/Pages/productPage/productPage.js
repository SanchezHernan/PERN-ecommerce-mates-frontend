import NavBar from '../../components/NavBar/navbar';
import useOptions from '../../hook/useOptions';
import useUser from '../../hook/useUser';
import './productPage.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getProduct from '../../services/getProduct';
import Button from '../../components/Button/button';


const ProductPage = () => {

    const history = useHistory()
    const {isLogged, guardarEnCarrito} = useUser()
    const { prodId } = useOptions()
    const [info, setInfo] = useState(null)


    const agregarAlCarrito = () => {
        guardarEnCarrito(prodId)        
    }

    //Efectos
    useEffect(() => {
        console.log('efectos clean')
        const fetchData = async () => {
            if (prodId !== 0){
                const resp = await getProduct({prodId})
                setInfo(resp)
            }
        }
        fetchData()
    }, [prodId]);

    useEffect(() => {
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])
     
    return(
        <div>
            <NavBar/>
            {info &&
            <div className='prodContent'>
                
                <div className='prodImgContent'>
                
                    <img className='imgtam' src={info.imagen} alt='#'/>
                
                </div>
                <div className='prodInfoContent'>
                    <h1>{info.nombre}</h1>
                    <p>{info.descripcion}</p>
                    <p>Calificacion: {info.calificacion}</p>
                    <p>{info.precio}</p>
                    <p>Descuento: {info.porcdescuento}</p>
                    <Button
                        atr={{
                            text: 'Agregar al carrito',
                            type: 'button'
                        }}
                        handleClick = { agregarAlCarrito }
                    />
                </div>
            </div>
            }
             
        </div>
        
    )
}


export default ProductPage;
