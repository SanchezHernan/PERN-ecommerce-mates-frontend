import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import Button from "../../../../components/Button/button"
import NavBar from "../../../../components/NavBar/navbar"
import LoginInput from "../../../../components/Input/loginInput"
import useUser from "../../../../hook/useUser";
import getUser from "../../../../services/getUser";
import { putRol } from "../../../../services/putServices";

import './roles.css'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
  theme: 'dark',
  pauseOnHover: true,
  draggable: true
})


const Roles = () => {

    const [modoContinuar, setModoContinuar] = useState(false)
    const [newAdminEmail, setNewAdminEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userValido, setUserValido] = useState(false)
    const [selectedRol, setSelectedRol] = useState(0)
    const [passwordError, setPasswordError] = useState(false)
    const {isLogged, adminEmail} = useUser()
    const [rolActualUsuario, setRolActualUsuario] = useState(0)
    const history = useHistory()

    const continuar = async(e) => {
        e.preventDefault()
        if (newAdminEmail !== ''){
            const user = await getUser(newAdminEmail)
            if (!user.suspendido){
                setUserValido(true)
                setRolActualUsuario(user.rol)
            }
            else setUserValido(false)
        }
        else setUserValido(false)
        setModoContinuar(true)
    }

    const changeEmail = (value) => setNewAdminEmail(value)
    const changePassword = (_, value) => setPassword(value)
    

    const confirmar = async() => {
        const resp = await getUser(adminEmail)
        if (resp.contrasenia === password){
            setPasswordError(false)
            if (selectedRol !== 0){
                if (parseInt(selectedRol) !== rolActualUsuario){
                    putRol(newAdminEmail, selectedRol)
                    toast.success(`Rol de ${newAdminEmail} Actualizado con exito`)
                    history.push('./')
                } else toast.info('El usuario ya poseia este rol')
            } else toast.info('Debe Seleccionar un Rol para el Usuario')
        }
        else {
            toast.error('Contraseña Incorrecta')
            setPasswordError(true)  
        }
    }

    const changeRol = (value) => setSelectedRol(value)

    const goBack = () => history.push('./')


    useEffect(() => {
        if (!isLogged)
            history.push('/')
        if (!adminEmail)
            history.push('/home')
      }, [isLogged, history, adminEmail])

    return(
        <div className='roles'>
            <NavBar/>
            <div className='roles-content'>
                <h3 className='mt-2 mb-3'>Administrar Roles</h3>
                <select className="custom-select mb-2" onChange={(e) => changeRol(e.target.value)}>
                    <option value='0'>Selecciona un Rol...</option>
                    <option value="1">Administrador General</option>
                    <option value="2">Administrador de Ventas</option>
                    <option value="3">Administrador de Stock</option>
                    <option value="4">Cliente</option>
                </select>
                <form>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">email del Usuario</span>
                        </div>
                        <input type="text" className="form-control" onChange={(e) => changeEmail(e.target.value)}/>
                    </div>
                    <div className='roles-button-container'>
                        <Button
                            atr={{text: 'Atras', type: 'button', className: 'btn btn-outline-dark mr-1'}}
                            handleClick = {goBack}
                        />
                        <Button
                            atr={{text: 'Continuar', type: 'sumbit', className: 'btn btn-outline-dark ml-1'}}
                            handleClick = {continuar}
                        />
                    </div>
                </form>
                {modoContinuar &&
                    <div className='continuarMode'>
                        {userValido ?
                            <div>
                                <p className='userValido'>Usuario Valido</p>
                                <p className='info-password'>Ingrese su contraseña para confirmar el cambio</p>
                                <LoginInput
                                    atribute={{type: 'password', placeholder: 'Ingrese su contraseña'}}
                                    handleChange={ changePassword } 
                                    param={ passwordError }
                                />
                                <Button
                                    atr={{text: 'Confirmar', type: 'button', className: 'btn btn-outline-dark'}}
                                    handleClick = {confirmar}
                                />
                            </div>
                        :
                            <div>
                                <p className='userInvalido'>Usuario invalido</p>
                                <p>vuelva a introducir el email</p>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Roles