import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import useUser from "../../../hook/useUser"
import NavBar from '../../../components/NavBar/navbar'

import usuariosImg from '../../../images/usuarios.png'
import proveedoresImg from '../../../images/proveedores.png'
import ventasImg from '../../../images/ventas.png'
import combosImg from '../../../images/combos.png'
import productosImg from '../../../images/productos.png'

import './menu.css'


const Menu = () => {

    const {isLogged, adminEmail, adminRol} = useUser()
    const history = useHistory()
    const [tipoAdmin, setTipoAdmin] = useState(0)

    const goToAdminProducts = () => history.push('/admin/products')

    const goToAdminCombos = () => history.push('/admin/combos')

    const goToAdminUsers = () => history.push('/admin/users')

    const goToAdminProveedores = () => history.push('/admin/proveedores')

    const goToAdminVentas = () => history.push('/admin/ventas')

    useEffect(() => {
        if (!isLogged)
            history.push('/')
        if (!adminEmail)
            history.push('/home')
        setTipoAdmin(adminRol)
    }, [isLogged, history, adminEmail])
    

    return(
        <div className='menu-container'>
            <NavBar />
            <h1 className='menu-title'>MENÚ ADMINISTRACIÓN</h1>
            <div className='menu-buttons'>
                { (tipoAdmin === '1' || tipoAdmin === '2') &&
                    <div className='admin-venta'>
                        <div className='menu-button'>
                            <button type='button' className='black-button' onClick={ goToAdminVentas }>
                                <img className='btn-img' src={ventasImg} alt='...'/>
                                <span>Administrar Ventas</span>
                            </button>
                        </div>
                        <div className='menu-button'>
                            <button type='button' className='black-button' onClick={ goToAdminCombos }>
                                <img className='btn-img' src={combosImg} alt='...'/>
                                <span>Administrar Combos</span>
                            </button>
                        </div>
                    </div>
                }
                { (tipoAdmin === '1' || tipoAdmin === '3') &&
                    <div className='admin-stock'>
                        <div className='menu-button'>
                            <button type='button' className='black-button' onClick={ goToAdminProveedores }>
                                <img className='btn-img' src={proveedoresImg} alt='...'/>
                                <span>Admin. Proveedores</span>
                            </button>
                        </div>
                        <div className='menu-button'>
                            <button type='button' className='black-button' onClick={ goToAdminProducts }>
                                <img className='btn-img' src={productosImg} alt='...'/>
                                <span>Administrar Productos</span>
                            </button>
                        </div>
                    </div>
                }
                { tipoAdmin === '1' &&
                    <div className='menu-button'>    
                        <button type='button' className='black-button' onClick={ goToAdminUsers }>
                            <img className='btn-img' src={usuariosImg} alt='...'/>
                            <span>Administrar Usuarios</span>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Menu