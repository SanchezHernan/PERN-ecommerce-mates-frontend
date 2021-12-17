import { useEffect, useState } from "react"
import { useHistory } from "react-router"

import cancelImg from '../../../images/cancel2.png'
import admventas from '../../../images/admventas.svg'

import NavBar from '../../../components/NavBar/navbar'
import Button from '../../../components/Button/button'

import useUser from "../../../hook/useUser"
import useOptions from "../../../hook/useOptions"

import { getVenta, getVentas } from "../../../services/getServices"
import { deleteVenta } from '../../../services/deleteServices'
import putPurchaseState from '../../../services/putPurchaseState'

import './ventas.css'

const Ventas = () => {

    const [ventas, setVentas] = useState([])
    const history = useHistory()
    const {isLogged, adminEmail} = useUser()
    const [ventaActual, setVentaActual] = useState(null)
    const [modoSec, setModoSec] = useState(false)
    const [deploy, setDeploy] = useState(false)
    const [actualizar, setActualizar] = useState(0)
    const {changeProdId, changeComboId} = useOptions()

    const goToAdminMenu = () => {
        history.push('/admin')
    }

    const delVenta = (venta) => {
        deleteVenta(venta.codigo)
        const newVentas = ventas.filter(sell => sell.codigo != venta.codigo)
        setVentas(newVentas)
    }

    const goToVenta = async(venta) => {
        const resp = await getVenta(venta.carrito)
        setVentaActual(resp)
        setModoSec(true)
    }

    const goBack = () => setModoSec(false)

    const handleClick = (e) => {
        e.preventDefault();
        setDeploy(!deploy)
    }

    const finalizarCompra = async(data) => {
        putPurchaseState(data, 'FINALIZADA')
        setActualizar(actualizar+1)
    }

    const cancelarCompra = async(data) => {
        putPurchaseState(data, 'CANCELADA')
        setActualizar(actualizar+1)
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


    useEffect(() => {
        if (!isLogged)
            history.push('/')
        if (!adminEmail)
            history.push('/home')
    }, [isLogged, history, adminEmail])

    useEffect(() => {
        const fetchData = async() => {
            const resp = await getVentas()
            setVentas(resp)
        }
        fetchData()
    },[])


    return(
        <div className='ventas-container'>
            <NavBar />
            { !modoSec ?
                <div className='ventas-main-mode'>
                    <h3 className='ventas-title'>Ventas</h3>
                    <div className='ventas-table table-responsive'>
                        <table className='table'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope='col'>Fecha</th>
                                    <th scope='col'>Total</th>
                                    <th scope='col'>Usuario</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col' className='centered'><img className='title-img' src={admventas} alt='...'/></th>
                                    <th scope='col' className='centered'>Delete</th>
                                </tr>
                            </thead>
                            {ventas.map((venta) =>
                                <tbody key={venta.codigo}> 
                                    <tr>
                                        <td>{venta.fecha.slice(0,10)}</td>
                                        <td>{venta.total}</td>
                                        <td>{venta.usuario}</td>
                                        <td>{venta.estado}</td>
                                        <td><button type='button' className='btn btn-outline-dark' onClick={() => goToVenta(venta) }>
                                            Ir a
                                        </button></td>
                                        <td className='centered'><a href='#' onClick={() => delVenta(venta)}>
                                            <img className='img' src={cancelImg} alt='...'/>
                                        </a></td>
                                    </tr>    
                                </tbody>
                            )}
                        </table>
                    </div>
                    <div className='prov-button-container'>
                        <div className='button-back'>
                            <Button
                                atr={{ 
                                    className: 'black-button',
                                    text: 'Volver al Menu de Administracion', 
                                    type: 'button' 
                                }}
                                handleClick={ goToAdminMenu }
                            />
                        </div>
                    </div>
                </div>
            :
                <div className='ventas-sec-mode'>
                    <h3 className='ventas-title'>Ventas</h3>
                    <div className='card cardStyle'>
                        <div className="card-header">
                            <a className='card-header-info' onClick={(e) => handleClick(e)} href='#'>
                                <h4>Comprado el {ventaActual[0].fecha.slice(0,10)}</h4>
                                <h4>Estado: {ventaActual[0].estado}</h4>
                            </a>
                            {ventaActual[0].estado === 'ESPERA' ? 
                            <div className='card-header-button'>
                                <Button
                                    atr={{
                                        text: 'Finalizar Venta',
                                        type: 'button',
                                        className: 'btn btn-outline-dark mb5'
                                    }}
                                    handleClick={() => finalizarCompra(ventaActual.carrito) }
                                />
                                <Button
                                    atr={{
                                        text: 'Cancelar Venta',
                                        type: 'button',
                                        className: 'btn btn-outline-dark mb5'
                                    }}
                                    handleClick={() => cancelarCompra(ventaActual.carrito) }
                                />
                            </div>
                            : ventaActual[0].estado === 'FINALIZADA' ?
                                <h4>Compra Finalizada</h4>
                            :
                                <h4>Compra Cancelada</h4>
                            }
                        </div>
                        {deploy &&
                            <div className='list-container'>
                                <ul className="list-group">
                                    {
                                        ventaActual.map((producto) => 
                                        <div className='list-content' key={producto.codigo}>
                                            <li className="list-group-item">
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
                    <div className='back-btn'>
                        <Button
                            atr={{
                                text: 'Volver',
                                type: 'button',
                                className: 'btn btn-outline-dark mb5'
                            }}
                            handleClick={ goBack }
                        />
                    </div>
                </div>    
            }
        </div>
    )
}


export default Ventas