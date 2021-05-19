import { useEffect, useState } from "react"
import getUsers from "../../../services/getUsers"
import NavBar from '../../../components/NavBar/navbar'
import Button from '../../../components/Button/button'
import useUser from "../../../hook/useUser"
import { useHistory } from "react-router"

import './users.css'


const Users = () => {

    const [usuarios, setUsuarios] = useState([])
    const {isLogged, setUserEmail, adminEmail} = useUser()
    const history = useHistory();


    const goToUser = (usuario) => {
        setUserEmail(usuario.email)
        history.push('/user')
    }

    const goToAdministradores = () => history.push('/admin/administradores')

    const setMiEmail = () => setUserEmail(adminEmail)

    const goToAdminMenu = () => history.push('/admin')


    useEffect(() => {
        const fetchData = async() => {
            const resp = await getUsers()
            const users = resp.filter(user => !user.suspendido)
            setUsuarios(users)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (!isLogged)
            history.push('/')
        if (!adminEmail)
            history.push('/home')
    }, [isLogged, history, adminEmail])


    return( 
        <div className='users-container'>
            <NavBar />
            <div className='user-content'>
                <div className='user-button'>
                    <Button
                        atr={{ 
                            text: 'Volver al Menu de Administracion', 
                            type: 'button',
                            className: 'btn btn-outline-dark'
                        }}
                        handleClick={ goToAdminMenu }
                    />
                </div>
                <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Apellido</th>
                            <th scope='col'>Perfiles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, i) => 
                            <tr key={usuario.email}>
                                <th scope='row'>{i+1}</th>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.apellido}</td>
                                <td><Button
                                    atr={{text: 'Administrar Usuario', type: 'button', className: 'btn btn-outline-dark'}}
                                    handleClick = {() => goToUser(usuario)}
                                /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='usuarios-buttons'>
                    <Button
                        atr={{text: 'Usuario Propio', type: 'button', className: 'btn btn-outline-dark mr-2'}}
                        handleClick = {setMiEmail}
                    />
                    <Button
                        atr={{text: 'Administradores', type: 'button', className: 'btn btn-outline-dark ml-2'}}
                        handleClick = {goToAdministradores}
                    />
                </div>
            </div>
        </div>
    )
}

export default Users;