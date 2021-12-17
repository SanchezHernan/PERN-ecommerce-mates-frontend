<<<<<<< HEAD
import NavBar from '../../components/NavBar/navbar'
import Button from '../../components/Button/button'
import useUser from '../../hook/useUser'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './purchasesPage.css'
import getPurchases from '../../services/getPurchases'
import putPurchaseState from '../../services/putPurchaseState'
import useOptions from '../../hook/useOptions'


const PurchasesPage = () => {

    let carrritoactual
    let parcialList = []
    let totalList = []
    const {changeProdId, changeComboId} = useOptions()
    const {isLogged, email} = useUser()
    const history = useHistory()
    const [compras, setCompras] = useState(null)
    const [comprasPorCarrito, setComprasPorCarrito] = useState([])
    const [witchDisplay, setWitchDisplay] = useState([])
    const [msjMode, setMsjMode] = useState(false)
    const [estadoCompra, setEstadoCompra] = useState('')

=======
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import NavBar from '../../components/NavBar/navbar'
import Button from '../../components/Button/button'
import useUser from '../../hook/useUser'
import useOptions from '../../hook/useOptions'
import getPurchases from '../../services/getPurchases'
import putPurchaseState from '../../services/putPurchaseState'

import './purchasesPage.css'
import 'react-toastify/dist/ReactToastify.css'
import NotifPurchase from '../../components/NotifPurchase/notifPurchase'

toast.configure({
  theme: 'dark',
  pauseOnHover: true,
  draggable: true
})

const PurchasesPage = () => {

    const {changeProdId, changeComboId} = useOptions()
    const {isLogged, email} = useUser()
    const history = useHistory()
    const [compras, setCompras] = useState([])
    const [comprasPorCarrito, setComprasPorCarrito] = useState([])
    const [witchDisplay, setWitchDisplay] = useState([])
    const [sinCompras, setSinCompras] = useState(false)
>>>>>>> f4529ec (entrega)

    const handleClick = (e, i) => {
        e.preventDefault()
        if (witchDisplay.includes(i)){
            const newDisplay = witchDisplay.filter(el => el !== i)
            setWitchDisplay(newDisplay)
            
        } else {
            const newDisplay = witchDisplay.concat(i)
            setWitchDisplay(newDisplay)
        }
    } 

    const finalizarCompra = async(data) => {
        putPurchaseState(data, 'FINALIZADA')
        const purchases = await getPurchases(email)
        setCompras(purchases)
        toast.success(`Su compra ha sida finalizada`)
        history.push('/notifpurchase/FINALIZADA')
    }

    const cancelarCompra = async(data) => {
        putPurchaseState(data, 'CANCELADA')
        const purchases = await getPurchases(email)
        setCompras(purchases)
        toast.warn('Su compra ha sida cancelada')
        history.push('/notifpurchase/CANCELADA')
    }

    const goToProd = (e, prodId, iscombo) => {
        e.preventDefault()
        if (!iscombo){
            changeProdId(prodId)
            history.push('/product')
        }
        else{
            changeComboId(prodId)
            history.push('/combo')
        } 
    }


    // const aceptar = () => setMsjMode(false)

    useEffect(() => {
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])

    useEffect(() => {
        const fetchData = async () => {
            const purchases = await getPurchases(email)
            setCompras(purchases)
        }
        fetchData();
    }, [email])

    useEffect(() => {
        let carrritoactual
        let parcialList = []
        let totalList = []
        if (compras.length > 0) {
            setSinCompras(false)
            carrritoactual = compras[0].carrito
            compras.forEach((compra) => {
                if (compra.carrito !== carrritoactual){
                    carrritoactual = compra.carrito
                    totalList.push(parcialList)
                    parcialList = []
                }
                parcialList.push(compra)
            })
            totalList.push(parcialList)
        } else setSinCompras(true)
        setComprasPorCarrito(totalList)
    }, [compras])

     
    return(
        <div>
            <NavBar/>
            {!sinCompras ?
                
                    <div className='purchasesContent'>    
                        {comprasPorCarrito.map((prodsDeCompra, i) =>  
                            <div className='card cardStyle' key={prodsDeCompra.codigo}>
                                <div className="card-header">
                                    <a className='card-header-info' onClick={(e) => handleClick(e, i)}>
                                        <h4>Comprado el {prodsDeCompra[0].fecha.slice(0,10)}</h4>
                                        <h4>Estado: {prodsDeCompra[0].estado}</h4>
                                    </a>
                                    {prodsDeCompra[0].estado === 'ESPERA' ? 
                                    <div className='card-header-button'>
                                        <Button
                                            atr={{
                                                text: 'Finalizar Compra',
                                                type: 'button',
                                                className: 'btn btn-outline-primary mb5'
                                            }}
                                            handleClick={() => finalizarCompra(prodsDeCompra[0].carrito) }
                                        />
                                        <Button
                                            atr={{
                                                text: 'Devolver Compra',
                                                type: 'button',
                                                className: 'btn btn-outline-primary mb5'
                                            }}
                                            handleClick={() => cancelarCompra(prodsDeCompra[0].carrito) }
                                        />
                                    </div>
                                    : prodsDeCompra[0].estado === 'FINALIZADA' ?
                                        <h4 className='finalizada'>Compra Finalizada</h4>
                                    :
                                        <h4 className='cancelada'>Compra Cancelada</h4>
                                    }
                                </div>
                                {witchDisplay.includes(i) &&
                                
                                <div className='list-container'>
                                    <ul className="list-group">
                                        {
                                            prodsDeCompra.map((producto, i) => 
                                            <div className='list-content' key={producto.codigo}>
                                                <li className="list-group-item" key={i}>
                                                    <a onClick={(e) => goToProd(e, producto.prodid, producto.iscombo)} href='/product'>
                                                        {producto.nombre}
                                                    </a>        
                                                </li>
                                            </div>
                                        )}
                                    </ul>
                                </div>
                                }
                            </div>
                        )}
                    </div>
                   
            :
                <div className='mensaje-actualizacion'>
                    <h1>No ha realizado compras por el momento</h1>
                </div>
            }        
        </div>
    )
}

export default PurchasesPage;
