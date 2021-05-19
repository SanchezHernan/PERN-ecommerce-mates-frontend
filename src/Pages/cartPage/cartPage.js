import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import NavBar from '../../components/NavBar/navbar'
import Button from '../../components/Button/button'
import useUser from '../../hook/useUser'
import useDate from '../../hook/useDate'
import useDescuento from '../../hook/useDescuento'
import cancel2 from '../../images/cancel2.png'
import getCartProducts from '../../services/getCartProducts'
import getUser from '../../services/getUser'
import { deleteCartProduct } from '../../services/deleteServices'
import emptyCart from '../../services/emptyCart'
import postCompra from '../../services/postCompra'
import postCart from '../../services/postCart'
import { putUserCart } from '../../services/putServices'

import './cartPage.css'


const CartPage = () => {

    const history = useHistory()
    const {isLogged, email } = useUser()
    const {date, time} = useDate()
    const [productList, setProductList] = useState([])
    const [carrito, setCarrito] = useState(null)
    const { calcularDescuento } = useDescuento()
    const [total, setTotal] = useState(0)
    const [show, setShow] = useState(false)
    const [numtarj, setNumtarj] = useState(null)
    const [tipotarj, setTipotarj] = useState('NO')
  
    const handleContinuar = () => setShow(!show)

    const handleVaciar = () => {
        emptyCart(carrito)
        setProductList([])
    }

    const handleTipotarj = (e) => {
        if (e.target.value !== 'no')
            setTipotarj(e.target.value)
        else setTipotarj(null)
    }

    const handleNumtarj = (e) => setNumtarj(e.target.value)

    const quitarDelCarrito = async (lcod) => {
        await deleteCartProduct(lcod)
        setProductList(productList.filter(prod => prod.codigo !== lcod))
        setTotal(0)
    }

    const handleComprar = async () => {
        if (numtarj && tipotarj !== 'NO'){
            postCompra(total, date, time, numtarj, tipotarj, carrito, email)
            const cartId = await postCart()
            const resp = await putUserCart(email, cartId[0].codigo)
            setCarrito(cartId[0].codigo)
            setTotal(0)
            setProductList([])
            alert('Compra realizada con exito')
            setShow(false)
        }
        else alert('Datos Faltantes') 
    }


    //Efectos
    useEffect(() => {
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])
    
    useEffect(() => {
        const fetchData = async() => {
            const user = await getUser(email)
            const cartId = user.carritoactual
            const resp = await getCartProducts(cartId)
            const prods = resp.map((prod) => calcularDescuento(prod)) 
            setProductList(prods)
            setCarrito(cartId)
        }
        fetchData()
    }, [])

    useEffect(() => {
        let sum = 0
        if (productList){
        productList.map((product) => {
                if (product.porcdescuento === 0){
                    sum = sum + (product.precio * product.cantidadproducto)
                } else {
                    sum = sum + (product.porcdescuento * product.cantidadproducto)
                }
            })
            setTotal(sum)
        }
    }, [productList])

     
    return(
        <div>
            <NavBar/> 
            <div className='cartContainer'>
                <h3>Articulos en su Carrito</h3>
                <ul className='cartContent1 list-group'>
                    {productList.map((product) =>
                        <li className='listContent list-group-item' key={product.codigo}>
                            <h5 className='listed-content-1'>{product.nombre}</h5>
                            <span className='listed-content-2'>{product.cantidadproducto} unidad/es</span>
                            { product.porcdescuento === 0 ?
                                <span className='listed-content-2'>precio/u: ${product.precio}</span>
                                :
                                <span className='listed-content-2'>precio/u: ${product.porcdescuento}</span>
                            }
                            <a href='#' onClick={() => quitarDelCarrito(product.codigo)}>
                                <img className='icon' src={cancel2} alt='#'/>
                            </a>
                        </li>
                    )}
                </ul>
                <div className='cartContent2'>
                    <h3 className='cart-price'>Precio Total: ${total}</h3>
                    {!show ? 
                        <div className='buttonsContainer'>
                            <h4>Metodo de Pago: </h4>
                            <div className='cart-button'>
                                <Button
                                    atr={{
                                        text: 'Continuar',
                                        type: 'button',
                                        className: 'btn btn-outline-dark'
                                    }}
                                    handleClick = {handleContinuar}
                                />
                            </div>
                            <div className='cart-button'>
                                <Button
                                    atr={{
                                        text: 'Vaciar Carrito',
                                        type: 'button',
                                        className: 'btn btn-outline-dark',
                                        disabled: productList.length === 0
                                    }}
                                    handleClick = {handleVaciar}
                                />
                            </div>
                        </div>
                    :
                        <form className='hidden'>
                            <div className='hidden-cont-1 mb-2'>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="">Numero de Tarjeta</span>
                                    </div>
                                    <input type='number' className='form-control' onChange={handleNumtarj}/>
                                </div>
                            </div>
                            <div className='input-group hidden-cont-2 mb-1'>
                                <select className="custom-select mb-1" onChange={handleTipotarj}>
                                    <option value='NO' defaultValue>Tipo Tarjeta...</option>
                                    <option value="VISA">VISA</option>
                                    <option value="MASTERCARD">MASTERCARD</option>
                                    <option value="NARANJA">NARANJA</option>
                                </select>
                            </div>
                            <Button
                                atr={{
                                    text: 'Finalizar Compra',
                                    type: 'button',
                                    className: 'btn btn-outline-dark mb-2'
                                }}
                                handleClick = {handleComprar}
                            />
                            <Button
                                atr={{
                                    text: 'Cancelar',
                                    type: 'button',
                                    className: 'btn btn-outline-dark'
                                }}
                                handleClick = {handleContinuar}
                            />
                        </form>
                    }
                </div>
            </div>
        </div>
        
    )
}


export default CartPage;
