import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import NavBar from '../../components/NavBar/navbar';
import Price from '../../components/Price/price'
import Button from '../../components/Button/button'

import useOptions from '../../hook/useOptions';
import useUser from '../../hook/useUser';
import useDescuento from '../../hook/useDescuento';
import useDate from '../../hook/useDate'

import getProduct from '../../services/getProduct';
import postProductInCart from '../../services/postProductInCart'
import getUser from '../../services/getUser'
import postCalification from '../../services/postCalification'

import './productPage.css'
import getBought from '../../services/getBought';


const ProductPage = () => {

    const history = useHistory()
    const {isLogged, email} = useUser()
    const {calcularDescuento} = useDescuento()
    const { prodId, combo } = useOptions()
    const {date, time} = useDate()
    const [info, setInfo] = useState(null)
    const [selected, setSelected] = useState('1')  


    const agregarAlCarrito = async () => {
        const cant = selected
        const prodId = info.codigo
        const opc = '0'
        console.log(opc)
        const user = await getUser({email})        
        const cartId = user.carritoactual
        await postProductInCart({ cant, opc , prodId, cartId } )
        alert('Agregado al carrito')
    }

    const handleChange = (e) => {
        setSelected(e.target.value);
    } 

    const handleClick = async (value) => {
        try {
            const resp = await getBought(email, prodId)
            if (resp.comprado) {
                postCalification(value, date, time, email, prodId)
            }
        }
        catch (err) { console.error(err.message)
        }
    }

  
    //Efectos    
    useEffect(() => {
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])

    useEffect(() => {
        const fetchData = async () => {
            const resp = await getProduct({prodId})
            const data = calcularDescuento(resp)
            setInfo(data)
        }
        fetchData() 
    }, [prodId, combo]);

       
    return(
        <div>
            <NavBar/>
            {info && 
                <div className='prodContent'>
                    <div className='prodImgContent'>
                        <div>
                            <img className='imgtam' src={info.imagen} alt='#'/>
                        </div>
                        <div className="rating rating2">
                            <a onClick={() => handleClick(5)} href="#5" title="Give 5 stars">★</a>
                            <a onClick={() => handleClick(4)} href="#4" title="Give 4 stars">★</a>
                            <a onClick={() => handleClick(3)} href="#3" title="Give 3 stars">★</a>
                            <a onClick={() => handleClick(2)} href="#2" title="Give 2 stars">★</a>
                            <a onClick={() => handleClick(1)} href="#1" title="Give 1 star">★</a>
                        </div>
                    </div>
                    <div className='prodInfoContent'>
                        <h1>{info.nombre}</h1>
                        <p>{info.descripcion}</p>
                        <p>Calificacion: {info.calificacion}</p>
                        <Price
                            precio={info.precio}
                            descuento={info.porcdescuento}
                        />
                        <p>Disponibles: {info.stock}</p>
                        <div className="btn-group">
                            Cantidad: 
                            <select onChange={handleChange}>
                                <option value="1" defaultValue>1 Unidad</option>
                                <option value="2">2 Unidades</option>
                                <option value="3">3 Unidades</option>
                                <option value="4">4 Unidades</option>
                                <option value="5">5 Unidades</option>
                                <option value="6">6 Unidades</option>
                                <option value="7">7 Unidades</option>
                                <option value="8">8 Unidades</option>
                                <option value="9">9 Unidades</option>
                                <option value="10">10 Unidades</option>
                            </select>
                        </div>               
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
