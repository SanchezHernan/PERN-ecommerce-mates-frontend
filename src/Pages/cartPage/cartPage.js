import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import NavBar from '../../components/NavBar/navbar'
import Button from '../../components/Button/button'
import useUser from '../../hook/useUser'
import useDate from '../../hook/useDate'
import cancel2 from '../../images/cancel2.png'
import './cartPage.css'
import getCartProducts from '../../services/getCartProducts'
import getUser from '../../services/getUser'
import deleteCartProduct from '../../services/deleteCartProduct'
import emptyCart from '../../services/emptyCart'
import useDescuento from '../../hook/useDescuento'
import postCompra from '../../services/postCompra'
import postCart from '../../services/postCart'
import putUserCart from '../../services/putUserCart'

const CartPage = () => {

    const history = useHistory()
    const {isLogged, email } = useUser()
    const {date, time} = useDate()
    const [productList, setProductList] = useState(null)
    const [carrito, setCarrito] = useState(null)
    const { calcularDescuento } = useDescuento()
    const [total, setTotal] = useState(0)
    const [show, setShow] = useState(false)
    const [numtarj, setNumtarj] = useState(null)
    const [tipotarj, setTipotarj] = useState(null)
  
    const handleContinuar = () => { 
        setShow(!show)
            //postCompra(total, date, time, 5, 'VISA', carrito, email)
    }

    const handleVaciar = async () => {
        const resp = await emptyCart(carrito)
        setProductList(null)
    }

    const handleTipotarj = (e) => {
        if (e.target.value !== 'no')
            setTipotarj(e.target.value)
        else setTipotarj(null)
    }

    const handleNumtarj = (e) => {
        setNumtarj(e.target.value)
    }

    const quitarDelCarrito = async (lcod) => {
        await deleteCartProduct(lcod)
        setProductList(productList.filter(prod => prod.codigo !== lcod))
        setTotal(0)
    }

    const handleComprar = async () => {
        if (numtarj && tipotarj){
            postCompra(total, date, time, numtarj, tipotarj, carrito, email)
            const cartId = await postCart()
            const resp = await putUserCart(email, cartId[0].codigo)
            console.log(resp);
            setCarrito(cartId[0].codigo)
        }
        else alert('Datos Faltantes')
        setTotal(0)
        setProductList(null)
    }

    //Efectos
    useEffect(() => {
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])

    
    useEffect(() => {
        const fetchData = async() => {
            const user = await getUser({email})
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
                <div className='cartContent1'>
                    <h2>Precio Total: ${total}</h2>
                    <h4>Metodo de Pago: </h4>
                    <div className='buttonsContainer'>
                        <div className='button'>
                            <Button
                                atr={{
                                    text: 'Continuar',
                                    type: 'button'
                                }}
                                handleClick = {handleContinuar}
                            />
                            {show &&
                                <div className='hidden'>
                                    <div>
                                        Numero Tarjeta<input onChange={handleNumtarj}/>
                                    </div>
                                    <div>
                                        <select onChange={handleTipotarj}>
                                            <option value='NO' defaultValue>Tipo Tarjeta...</option>
                                            <option value="VISA" defaultValue>VISA</option>
                                            <option value="MASTERCARD">MASTERCARD</option>
                                            <option value="NARANJA">NARANJA</option>
                                        </select>
                                    </div>
                                    <Button
                                        atr={{
                                            text: 'Finalizar Compra',
                                            type: 'button'
                                        }}
                                        handleClick = {handleComprar}
                                    />
                                </div>
                            }
                        </div>
                        <div className='button'>
                            <Button
                                atr={{
                                    text: 'Vaciar Carrito',
                                    type: 'button'
                                }}
                                handleClick = {handleVaciar}
                            />
                        </div>
                    </div>
                </div>
                <div className='cartContent2'>
                    {productList &&
                        productList.map((product) =>
                        <div className='listContent' key={product.codigo}>
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
                        </div>
                    )}
                </div>
                
            </div>
        </div>
        
    )
}


export default CartPage;
