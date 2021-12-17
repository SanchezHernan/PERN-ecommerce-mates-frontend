import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'

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
import { getBought } from '../../services/getServices'
import getCalificationExists from '../../services/getCalificationExists'
import getProdCalificable from '../../services/getProdCalificable';

import './productPage.css'
import 'react-toastify/dist/ReactToastify.css'


const ProductPage = () => {

    const history = useHistory()
    const {isLogged, email} = useUser()
    const {calcularDescuento} = useDescuento()
    const { prodId } = useOptions()
    const {date, time} = useDate()
    const [info, setInfo] = useState(null)
    const [selected, setSelected] = useState('1')
    const [calificable, setCalificable] = useState(false)
    const [calificado, setCalificado] = useState(false) 

    const agregarAlCarrito = async () => {
        const cant = selected
        const prodId = info.codigo
        const opc = '0'
        const user = await getUser(email)        
        const cartId = user.carritoactual
        postProductInCart({ cant, opc , prodId, cartId } )
        toast.success('Agregado al carrito', {
            theme: 'dark',
            pauseOnHover: true,
            draggable: true,
        })
    }

    const handleChange = (e) => setSelected(e.target.value)

    const handleClick = async (value) => {
        try {
            const resp = await getBought(email, prodId, 'FINALIZADA')
            if (resp.comprado) {
                postCalification(value, date, time, email, prodId)
                setCalificado(true)
            } else
                toast('Debes comprar el producto antes de calificarlo', {
                    theme: 'dark',
                    pauseOnHover: true,
                    draggable: true,
                })
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
            const cal = await getProdCalificable(prodId, email)
            if (cal.calificable) {
                setCalificable(true)
                const calif = await getCalificationExists(prodId, email)
                if (calif.existe) setCalificado(true) 
            }    
            setInfo(data)
        }
        fetchData() 
    }, [prodId]);

       
    return(
        <div>
            <NavBar/>
            {info && 
                <div className='prodContent'>
                    <div className='prodImgContent'>
                        <div className='imagen'>
                            <img className='imgtam' src={info.imagen} alt='#'/>
                        </div>
                        {calificado ?
                            <h3>Calificado</h3>
                        : (calificable &&
                            <div className="rating rating2">
                            <a onClick={() => handleClick(5)} href="#5" title="Give 5 stars">★</a>
                            <a onClick={() => handleClick(4)} href="#4" title="Give 4 stars">★</a>
                            <a onClick={() => handleClick(3)} href="#3" title="Give 3 stars">★</a>
                            <a onClick={() => handleClick(2)} href="#2" title="Give 2 stars">★</a>
                            <a onClick={() => handleClick(1)} href="#1" title="Give 1 star">★</a>
                        </div>
                        )}
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
                        <div className='card-button'>            
                            <Button
                                atr={{
                                    text: 'Agregar al carrito',
                                    type: 'button',
                                    className: 'btn btn-outline-dark mt5'
                                }}
                                handleClick = { agregarAlCarrito }
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default ProductPage;
