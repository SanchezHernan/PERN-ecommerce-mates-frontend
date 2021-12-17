import success from '../../images/success.jpg'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

import getUser from '../../services/getUser'
import postCompra from '../../services/postCompra'
import postCart from '../../services/postCart'
import { putUserCart } from '../../services/putServices'

import useDescuento from '../../hook/useDescuento'
import useDate from '../../hook/useDate'
import useUser from '../../hook/useUser'
import useCompra from '../../hook/useCompra'


import './successPage.css'


const SuccessPage = () => {

    const {isLogged, email } = useUser()
    const { calcularDescuento } = useDescuento()
    const { compraActual, deleteCompra } = useCompra()
    const {date, time} = useDate()
    const history = useHistory()

    const params = useMemo(() => new URLSearchParams(window.location.search), [])
    const payment_id = params.get('payment_id')

    useEffect(() => {
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])


    useEffect(() => {
        const fetchData = async() => {
            const user = await getUser(email)
            const cartId = user.carritoactual
            //await emptyCart(cartId)
            let total = 0
            let compra = JSON.parse(compraActual)
            compra.forEach(prod => {
                //postProductInCart(prod.cantidadproducto, prod.opc , prod.codigo, cartId)
                //calcular total pagado
                if (prod.porcdescuento === 0)
                    total += prod.precio * prod.cantidadproducto
                else 
                    total += prod.porcdescuento * prod.cantidadproducto  
            })
            //subir la compra a la base de datos
            postCompra(total, date, time, payment_id, 'SI', cartId, email)
            const ncart = await postCart()
            putUserCart(email, ncart[0].codigo)
            deleteCompra()
        }
        fetchData()
    }, [calcularDescuento, compraActual, date, deleteCompra, email, payment_id, time])


    return(
        <div className='successContainer'>
            <h2>Felicitaciones por su compra</h2>
            <img src={success} alt='...'></img>
            <div className="buttonContainer">
                <Link to='/home' className='btn btn-dark'>Seguir Comprando</Link>
            </div>
        </div>
    )
}

export default SuccessPage