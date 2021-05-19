import { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import NavBar from '../../../components/NavBar/navbar'
import useUser from "../../../hook/useUser"
import getUsers from "../../../services/getUsers"

import './administradores.css'


const Administradores = () => {

    const [admins, setAdmins] = useState([])
    const { isLogged, adminEmail } = useUser()
    const history = useHistory()


    useEffect(() => {
        if (!isLogged)
            history.push('/')
        if (!adminEmail)
            history.push('/home')
    }, [isLogged, history, adminEmail])

    useEffect(() => {
        const fetchData = async() => {
            const resp = await getUsers()
            const users = resp.filter(user => user.rol !== 4)
            setAdmins(users)
        }
        fetchData()
    }, [])


    return(
        <div className='administradores'>
            <NavBar/>
            <div className='administradores-container'>   
                <h3 className='mb-1'>Listado de Administradores</h3>
                <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>Username</th>
                            <th scope='col'>User email</th>
                            <th scope='col'>Rol de Administracion</th>
                        </tr>
                    </thead>
                    {admins.map((admin) =>
                        <tbody key={admin.email}> 
                            <tr>
                                <td>{admin.nombreuser}</td>
                                <td>{admin.email}</td>
                                <td>
                                    {admin.rol === 1 ?
                                        'Administrador General'
                                    :   
                                        <div>
                                            {admin.rol === 2 ?
                                                'Administrador de ventas'
                                            :
                                                'Administrador de Stock'
                                            }
                                        </div>
                                    }
                                </td>
                            </tr>    
                        </tbody>
                    )}
                </table>
                <div className='administradores-content-2 mt-3'>
                    <Link to='/admin/users' className='btn btn-outline-dark mr-1 w50'>Volver a Usuarios</Link>
                    <Link to='/admin/administradores/roles' className='btn btn-outline-dark ml-1 w50'>Administrar Roles</Link>
                </div>
            </div>
        </div>
        
    )
}

export default Administradores