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
        alert('Compra Finalizada con exito')
        const purchases = await getPurchases(email)
        setCompras(purchases)
        setMsjMode(true)
        setEstadoCompra('FINALIZADA')
    }

    const cancelarCompra = async(data) => {
        putPurchaseState(data, 'CANCELADA')
        alert('Compra cancelada')
        const purchases = await getPurchases(email)
        setCompras(purchases)
        setMsjMode(true)
        setEstadoCompra('CANCELADA')
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

    const aceptar = () => setMsjMode(false)

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
        if (compras) {
            carrritoactual = compras[0].carrito
            compras.map((compra) => {
                if (compra.carrito !== carrritoactual){
                    carrritoactual = compra.carrito
                    totalList.push(parcialList)
                    parcialList = []
                }
                parcialList.push(compra)
            })
            totalList.push(parcialList)
        }
        setComprasPorCarrito(totalList)
    }, [compras])

     
    return(
        <div>
            <NavBar/>
            {!msjMode ?
                <div className='purchasesContent'>    
                    {comprasPorCarrito.map((prodsDeCompra, i) =>  
                        <div className='card cardStyle' key={prodsDeCompra[0].carrito}>
                            <div className="card-header">
                                <a className='card-header-info' onClick={(e) => handleClick(e, i)} href='#'>
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
                    <h3>Su compra ha sido {estadoCompra}</h3>
                    <button className='btn btn-outline-dark' onClick={aceptar}>Aceptar</button>
                </div>
            }        
        </div>
    )
}

export default PurchasesPage;
