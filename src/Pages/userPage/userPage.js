import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useUser from '../../hook/useUser'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/button'
import NavBar from '../../components/NavBar/navbar'

import userImg from '../../images/user2.png'

import getUser from '../../services/getUser'
import updateUser from '../../services/updateUser'
import { putSuspendido } from '../../services/putServices'
import putPassword from '../../services/putPassword'
import './userPage.css'


const UserPage = () => {

    const [usuario, setUsuario] = useState(null)
    const {isLogged, email, adminRol, adminEmail, logout} = useUser()
    const history = useHistory()
    const [showEdit, setShowEdit] = useState(false)
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [eliminar, setEliminar] = useState(false)
    const [changePassword, setChangePassword] = useState(false)

    //Cambio de contrasena
    const [actualPassword, setActualPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
    const [act, setAct] = useState(false)


    const editarPerfil = () => {
        setShowEdit(true)
        setNombre(usuario.nombre)
        setApellido(usuario.apellido)
        setCiudad(usuario.ciudad)
        setDireccion(usuario.direccion)
        setTelefono(usuario.telefono)
    }

    const volver = () => setShowEdit(false)

    const guardarCambios = async() => {
        if (nombre !== '' && apellido !== ''){
            updateUser(nombre, apellido, ciudad, direccion, telefono, email)
            const response = await getUser(email)
            setUsuario(response)
            alert('Datos actualizados correctamente')
            setShowEdit(false)
        } else alert('Datos necesarios faltantes')
    }
        

    const handleNombre = (value) => setNombre(value)

    const handleApellido = (value) => setApellido(value)

    const handleCiudad = (value) => setCiudad(value)

    const handleDireccion = (value) => setDireccion(value)

    const handleTelefono = (value) => setTelefono(value)

    const eliminacion = () => {
        setEliminar(!eliminar)
        setActualPassword('')
    }

    const eliminarCuenta = async() => {
        if (adminRol === '1'){
            const resp = await getUser(adminEmail)
            if (actualPassword === resp.contrasenia){
                const r = window.confirm("Esta seguro que desea eliminar su cuenta?")
                if (r) putSuspendido(email, 'true')
                history.push('/admin/users')
            }
            else alert('Contrasenia incorrecta')
        }
        else{
            if (actualPassword === usuario.contrasenia){
                const r = window.confirm("Esta seguro que desea eliminar su cuenta?")
                if (r) putSuspendido(email, 'true')
                logout()
            }
            else alert('Contrasenia incorrecta')
        }
    }

    const cambiarContraseña = async () => {
        if (changePassword) {
            if (actualPassword === usuario.contrasenia){
                if (newPassword !== actualPassword){
                    if (newPassword === newPasswordConfirmation){
                        putPassword(newPassword, email)
                        setAct(!act)
                        alert('Tu contrasena ha sido actualizada correctamente')
                        setChangePassword(false)
                    }
                    alert('la confirmacion no coincide con la nueva contrasenia');
                }
                else alert('la contrasena nueva coincide con la actual');
            }
        }
        else setChangePassword(true)
    }

    const back = () => setChangePassword(false)

    const changeActualPassword = (_, value) => setActualPassword(value)

    const changeNewPassword = (_, value) => setNewPassword(value)

    const changeActualPasswordConfirmation = (_, value) => setNewPasswordConfirmation(value)


    useEffect(() => {
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])


    useEffect(() => {
        const fetchData = async () => {
            const response = await getUser(email)
            setUsuario(response)
        }
        fetchData()
    }, [email, act])

    return(
        <div className='userPage-container'>
            <NavBar/>
            <div className='userPage-body'>
                {usuario && !eliminar && !changePassword ?
                    <div className='userPageContent'>
                        <div className='userPageContent1'>
                            <img src={userImg} className="userImg" alt="" loading="lazy"/>
                        </div>        
                        <div className='userPageContent2'>
                            <h3 className='text-start elimination-title'>Informacion de {usuario.nombreuser}</h3>
                            <div className='userInfo'>
                                <div className='userInfoContent1'>
                                    <p>Nombre: </p>
                                    <p>Apellido: </p>
                                    <p>Ciudad: </p>
                                    <p>Direccion: </p>
                                    <p>Telefono: </p>
                                </div>
                                {!showEdit ?
                                    <div className='userInfoContent2'>
                                        <p>{usuario.nombre}</p> 
                                        <p>{usuario.apellido} </p>
                                        <p>{usuario.ciudad}</p>
                                        <p>{usuario.direccion}</p>
                                        <p>{usuario.telefono}</p>
                                    </div>
                                :
                                    <div className='userInfoContent3'>
                                        <div className='input-container'>
                                            <input type='text' className='editInput' value={nombre} onChange={(e) => handleNombre(e.target.value)}/>
                                        </div>
                                        <div className='input-container'>
                                            <input type='text' className='editInput' value={apellido} onChange={(e) => handleApellido(e.target.value)}/>
                                        </div>
                                        <div className='input-container'>
                                            <input type='text' className='editInput' value={ciudad} onChange={(e) => handleCiudad(e.target.value)}/>
                                        </div>
                                        <div className='input-container'>
                                            <input type='text' className='editInput' value={direccion} onChange={(e) => handleDireccion(e.target.value)}/>
                                        </div>
                                        <div className='input-container'>
                                            <input type='text' className='editInput' value={telefono} onChange={(e) => handleTelefono(e.target.value)}/>    
                                        </div>
                                    </div>
                                }
                            </div>
                            {showEdit ?
                                <div className='buttons-column'>      
                                    <div className='userpage-button'>
                                        <Button 
                                            atr={{
                                                text: 'Volver',
                                                type: 'button',
                                                className: 'btn btn-outline-dark'
                                            }}
                                            handleClick = { volver }
                                        />
                                    </div>
                                    <div className='userpage-button'>
                                        <Button 
                                        atr={{
                                            text: 'Guardar Cambios',
                                            type: 'button',
                                            className: 'btn btn-outline-dark'
                                        }}
                                        handleClick = { guardarCambios }
                                        />
                                    </div>
                                </div>
                            :
                                <div className='buttons-column'>
                                    <div className='userpage-button'>
                                        <Button 
                                            atr={{
                                                text: 'Editar Perfil',
                                                type: 'button',
                                                className: 'btn btn-outline-dark'
                                            }}
                                            handleClick = { editarPerfil }
                                        />
                                    </div>
                                    <div className='userpage-button'>
                                        <Button 
                                            atr={{
                                                text: 'Cambiar Contraseña',
                                                type: 'button',
                                                className: 'btn btn-outline-dark'
                                            }}
                                            handleClick = { cambiarContraseña }
                                        />
                                    </div>
                                    <div className='userpage-button'>
                                        <Button 
                                            atr={{
                                                text: 'Eliminar Cuenta',
                                                type: 'button',
                                                className: 'btn btn-outline-danger'
                                            }}
                                            handleClick = { eliminacion }
                                        />
                                    </div>
                                </div>    
                            }
                        </div>
                    </div>
                :
                    <div className='secondary-mode'>
                        {eliminar ?
                        // ELIMINACION
                        <div>
                            <div className='userPage-eliminacion'>
                                <div className='userPageElimination1'>
                                    <img src={userImg} className="userImg" alt="" loading="lazy"/>
                                </div>
                                <div className='userPageElimination2'>     
                                    <h3 className='elimination-title text-start'>Confirma la eliminacion con tu contraseña</h3>
                                    <span className='text-start'>Para eliminar tu cuenta ingresa tu contraseña actual</span>
                                    <div className='eliminacion'>
                                        <Input 
                                            atribute={{
                                            type: 'password',
                                            className: 'editInput form-control',
                                            placeholder: 'contraseña'
                                            }}
                                            handleChange={ changeActualPassword }
                                        />  
                                    </div>
                                    <Button 
                                        atr={{
                                            text: 'Eliminar Cuenta',
                                            type: 'button',
                                            className: 'btn btn-danger'
                                        }}
                                        handleClick = { eliminarCuenta }
                                    />
                                </div>
                            </div>
                            <button className='elimination-back-button' onClick={eliminacion}>&laquo; Atras</button>
                        </div>
                        :
                            //CAMBIO DE CONTRASENA
                            <div className='modeChangePassword'>
                                <button className='btn btn-outline-dark w40' onClick={back}>&laquo; Atras</button>
                                <div className='changePasswordContent'>
                                    <h3>Cambia tu contraseña</h3>
                                    <Input 
                                        atribute={{
                                        type: 'password',
                                        className: 'editInput form-control',
                                        placeholder: 'Contraseña actual'
                                        }}
                                        handleChange={ changeActualPassword }
                                    />
                                    <Input 
                                        atribute={{
                                        type: 'password',
                                        className: 'editInput form-control',
                                        placeholder: 'nueva contraseña'
                                        }}
                                        handleChange={ changeNewPassword }
                                    />
                                    <Input 
                                        atribute={{
                                        type: 'password',
                                        className: 'editInput form-control',
                                        placeholder: 'Confirma tu contraseña'
                                        }}
                                        handleChange={ changeActualPasswordConfirmation }
                                    />
                                    <Button 
                                        atr={{
                                            text: 'Cambiar Contraseña',
                                            type: 'button',
                                            className: 'btn btn-outline-dark'
                                        }}
                                        handleClick = { cambiarContraseña }
                                    />
                                </div>
                            </div>
                        }
                    </div>
                }                    
            </div>
        </div>
    )
}

export default UserPage;
