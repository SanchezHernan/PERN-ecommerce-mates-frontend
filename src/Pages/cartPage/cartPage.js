import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import NavBar from '../../components/NavBar/navbar'
import Button from '../../components/Button/button'
import useUser from '../../hook/useUser'
import useCompra from '../../hook/useCompra'
import useDescuento from '../../hook/useDescuento'
import cancel2 from '../../images/cancel2.png'
import getCartProducts from '../../services/getCartProducts'
import getUser from '../../services/getUser'
import { deleteCartProduct } from '../../services/deleteServices'
import emptyCart from '../../services/emptyCart'

import './cartPage.css'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
  theme: 'dark',
  pauseOnHover: true,
  draggable: true
})



const CartPage = () => {

    const history = useHistory()
    const {isLogged, email } = useUser()
    const { setCompra } = useCompra()
    const [productList, setProductList] = useState([])
    const [carrito, setCarrito] = useState(null)
    const { calcularDescuento } = useDescuento()
    const [total, setTotal] = useState(0)
  
    const handleContinuar = async() => {
        let preference = []
        productList.forEach(prod => {
            preference.push({
                'name': prod.nombre,
                'unit_price': prod.porcdescuento === 0 ? prod.precio : prod.porcdescuento,
                'quantity': prod.cantidadproducto,
            })
        })
        const resp = await fetch(`http://localhost:5000/api/orders/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'mydata': preference})
        })
        setCompra(JSON.stringify(productList))
        let data = await resp.json()
        window.location.assign(data.preference.body.init_point)
    }

    const handleVaciar = () => {
        emptyCart(carrito)
        setProductList([])
    }

    const quitarDelCarrito = async (lcod) => {
        await deleteCartProduct(lcod)
        setProductList(productList.filter(prod => prod.codigo !== lcod))
        setTotal(0)
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
    }, [calcularDescuento, email])

    useEffect(() => {
        let sum = 0
        if (productList){
        productList.forEach((product) => {
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
                    <div className='buttonsContainer'>
                        <div className='cart-button'>
                            <Button
                                atr={{
                                    text: 'Comprar',
                                    type: 'button',
                                    className: 'btn btn-outline-success'
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
                </div>
            </div>
        </div>
        
    )
}


export default CartPage;
