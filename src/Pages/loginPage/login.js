// Indicar que la contrasena debe ser mas larga de 6 digitos

import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import LoginInput from '../../components/Input/loginInput'
import Button from '../../components/Button/button'

import useUser from '../../hook/useUser'

import getUser from "../../services/getUser"
import postCart from "../../services/postCart"
import {putUserCart} from "../../services/putServices"
import postUser from "../../services/postUser"
import getUserExists from '../../services/getUserExists'

import './login.css'
import 'react-toastify/dist/ReactToastify.css'  


toast.configure({
  theme: 'dark',
  pauseOnHover: true,
  draggable: true
})

const LoginPage = () => {

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const history = useHistory();
  const {login, isLogged, setUserEmail, setAdminInfo} = useUser()
  const [rightPanelActive, setRightPanelActive] = useState(true)

  //sign up
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [city, setCity] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [address, setAddress] = useState('')
  const [tel, setTel] = useState('')
  const [nameError, setNameError] = useState(false)
  const [lastnameError, setLastnameError] = useState(false)
  const [emailError, setEmailError] = useState(false)


  useEffect(() => {
    if (isLogged) {
      history.push('/home');
    }
  }, [isLogged, history])

  const handleChange = (id, value) => {

    switch (id) {
      case 'loginemail':
        setLoginEmail(value)
        break
      case 'loginpassword':
        setLoginPassword(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value); 
        break
      case 'username':
        setUsername(value)
        break
      case 'name':
        setName(value)
        break
      case 'lastname':
        setLastname(value)
        break
      case 'city':
        setCity(value)
        break
      case 'direction':
        setAddress(value)
        break
      case 'tel':
        setTel(value)
        break
      default:
        console.log('default: ', id )
        break
    }
  };

  const getUsuarios = async (param) => {
    if(param.loginEmail.length > 0 && param.loginPassword.length > 0) {
      try { 
        const jsonData = await getUser(param.loginEmail)
        if (jsonData.suspendido)
          toast.warn('tu cuenta ha sido suspendida, para recuperarla contacta con el servicio')
        else{
          if (jsonData.rol !== 4)
            setAdminInfo(jsonData.email, jsonData.rol)
          //asignar carrito a usuarios nuevos
          if(!jsonData.carritoactual){
            try {
              const cartId = await postCart()
              putUserCart(param.loginEmail, cartId[0].codigo)
            } catch (err) {
              console.error(err.message)
            }    
          }
          if(jsonData.email.length > 0){

            if(jsonData.contrasenia === param.loginPassword){
              setUserEmail(jsonData.email);
              login(jsonData)
            } else toast.error('Contraseña incorrecta')
          }
        }
      } catch (err) {
        toast.error('Este email no tiene una cuenta registrada')
      }
    }
  }
  
  const handleIngreso = (e) => {
    e.preventDefault()
    let account = { loginEmail, loginPassword }
    if(account)
      getUsuarios(account);
  }

  const activeRightPanel = () => setRightPanelActive(false) 

  const disableRightPanel = () => setRightPanelActive(true)

  const crearUsuario = async (e) => {
    e.preventDefault()
    const {exists} = await getUserExists(email)
    if (exists)
      toast.warn("Este usuario ya tiene una cuenta creada")
    else if (password.length < 6)
      toast.error('Su contraseña es demasiado corta')
    else {
      if (validarDatos()){
        postUser(email, username, password, name, lastname, address, city, tel)
        setEmail('')
        setPassword('')
        setName('')
        setUsername('')
        setLastname('')
        setAddress('')
        setCity('')
        setTel('')
        toast.success('Usuario creado exitosamente')
        setRightPanelActive(true)
      }
      else toast.error('Datos invalidos')
    } 
  }

  const validarDatos = () => {
    let cont = 0
    if (validarEmail(email)) {
      setEmailError(false)
      cont = cont + 1
    } else setEmailError(true)
    if (name.length > 3) {
      setNameError(false)
      cont = cont + 1
    } else setNameError(true)
    if (lastname.length > 3) {
      setLastnameError(false)
      cont = cont + 1
    } else setLastnameError(true)
    if (city.length > 3 && address.length > 3 && tel.length > 3)
      cont += 1
    return cont === 4
  }

  const validarEmail = (val) => {
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regEmail.test(val)) return false
    else return true
  }



  return (
    <div className= {rightPanelActive ? 'loginPage-container' : 'loginPage-container right-panel-active'} id='container'>
      <div className='login-form-container signup-container'>
        <form className='signup-form' action="#">
          <h1 className='signup-title white-text'>Crea tu cuenta</h1>
          <p className='white-text fs18'>Ingresa Tus Datos</p>
          <div className='form-element'> 
            <LoginInput
              atribute={{id: 'email', type: 'email', placeholder: 'Ingrese su email', value: email}}
              handleChange={ handleChange } 
              param={emailError}
            />
            <LoginInput
              atribute={{id: 'password', type: 'password', placeholder: 'Contraseña', value: password}}
              handleChange={ handleChange }
            />
            <LoginInput
              atribute={{id: 'username', type: 'text', placeholder: 'Nombre de usuario', value: username}}
              handleChange={ handleChange } 
            />
            <LoginInput className='dato-input'
              atribute={{id: 'name', type: 'name', placeholder: 'Nombre', value: name}}
              handleChange={ handleChange } 
              param={ nameError }
            />
            <LoginInput
              atribute={{id: 'lastname', type: 'text', placeholder: 'Apellido', value: lastname}}
              handleChange={ handleChange } 
              param={ lastnameError }
            />
            <LoginInput
              atribute={{id: 'city', type: 'text', placeholder: 'Ciudad', value: city}}
              handleChange={ handleChange } 
            />
            <LoginInput
              atribute={{id: 'direction', type: 'text', placeholder: 'Direccion', value: address}}
              handleChange={ handleChange } 
            />    
            <LoginInput
              atribute={{id: 'tel', type: 'number', placeholder: 'Telefono', value: tel}}
              handleChange={ handleChange } 
            />
          </div>
          <div className='submit-button-container'>
            <Button
              atr={{text: 'Registrarse', type: 'submit'}}
              handleClick={crearUsuario}
            />
          </div>
        </form>             
      </div>
      <div className='login-form-container signin-container'>
        <h1 className='white-text'>Ingresa a tu Cuenta</h1>
        <form className='login-form' >
          <div className='form-element'>
          <LoginInput
            atribute={{id: 'loginemail', type: 'text', placeholder: 'ingrese su email'}}
            handleChange={ handleChange } 
          />
          </div>
          <div className='form-element'>
            <LoginInput
              atribute={{id: 'loginpassword', type: 'password', placeholder: 'ingrese su contraseña'}}
              handleChange={ handleChange } 
            />
          </div>
          <div className='submit-button-container'>
            <Button
              atr={{ text: 'Ingresar', type: 'Submit' }}
              handleClick= {handleIngreso}
            />
          </div>      
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className='black-text'>Bienvenido Devuelta!</h1>
            <p className='black-text'>Para mantener en contacto con nosotros conectate a tu cuenta</p>
            <div className='submit-button-container'>
            <Button
              atr={{text: 'Ingresa Aqui', type: 'button', className: 'btn btn-outline-dark'}}
              handleClick={ disableRightPanel }
            />
            </div>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className='black-text'>Eres Nuevo?</h1>
            <h3 className='black-text'>Bienvenido!</h3>
            <p className='black-text'>Crea tu cuenta para ver todos nuestros productos y disfrutar de nuestras ofertas</p>
            <div className='submit-button-container'>
              <Button
                atr={{ text: 'Registrate Aqui', type: 'button', className: 'btn btn-outline-dark' }}
                handleClick={ activeRightPanel }
              />
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
};


export default LoginPage
