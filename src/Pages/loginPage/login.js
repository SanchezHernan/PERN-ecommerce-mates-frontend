import React, { useState, useEffect } from "react"
import LoginInput from '../../components/Input/loginInput'
import Button from '../../components/Button/button'
import { useHistory } from 'react-router-dom'
import useUser from '../../hook/useUser'
import './login.css'
import getUser from "../../services/getUser"
import postCart from "../../services/postCart"
import {putUserCart} from "../../services/putServices";
import postUser from "../../services/postUser"
import getUserExists from '../../services/getUserExists'


const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const history = useHistory();
  const {login, isLogged, setUserEmail, setAdminInfo} = useUser()
  const [rightPanelActive, setRightPanelActive] = useState(true)

  //sign up
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
    if(param.email.length > 0 && param.password.length > 0) {
      try { 
        const jsonData = await getUser(param.email)
        if (jsonData.suspendido) alert('tu cuenta ha sido suspendida, para recuperarla contacta con el servicio')
        else{
          if (jsonData.rol !== 4)
            setAdminInfo(jsonData.email, jsonData.rol)
          //asignar carrito a usuarios nuevos
          if(!jsonData.carritoactual){
            try {
              const cartId = await postCart()
              putUserCart(param.email, cartId[0].codigo)
            } catch (err) {
              console.error(err.message)
            }    
          }
          if(jsonData.email.length > 0){
            setWrongEmail(false);
            if(jsonData.contrasenia === param.password){
              setWrongPassword(false);
              setUserEmail(jsonData.email);
              login(jsonData);
            } else setWrongPassword(true);
          }
        }
      } catch (err) {
        setWrongEmail(true);
        setWrongPassword(false);
        console.error(err.message);
      }
    } else setWrongPassword(false);
  }
  
  const handleIngreso = (e) => {
    e.preventDefault()
    let account = { email, password }
    if(account) {
      getUsuarios(account);
    }
  }

  const activeRightPanel = () => setRightPanelActive(false) 

  const disableRightPanel = () => setRightPanelActive(true)

  const crearUsuario = async (e) => {
    e.preventDefault()
    const {exists} = await getUserExists(email)
    if (exists) alert('Este usuario ya tiene una cuenta creada')
    else {
      if (validarDatos()){
        postUser(email, username, password, name, lastname, address, city, tel)
        alert('Usuario creado exitosamente')
        setRightPanelActive(true)
      }
      else alert('Datos invalidos');
    }
  }

  const validarDatos = () => {
    let cont = 0
    if (validarEmail(email)) {
      setEmailError(false)
      cont = cont + 1
    } else setEmailError(true)
    if (password.length > 6) {
      setPasswordError(false)
      cont = cont + 1
    } else setPasswordError(true)
    if (name.length > 3) {
      setNameError(false)
      cont = cont + 1
    } else setNameError(true)
    if (lastname.length > 3) {
      setLastnameError(false)
      cont = cont + 1
    } else setLastnameError(true)
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
              atribute={{id: 'email', type: 'email', placeholder: 'ingrese su email'}}
              handleChange={ handleChange } 
              param={emailError}
            />
            <LoginInput
              atribute={{id: 'password', type: 'password', placeholder: 'contrasenia'}}
              handleChange={ handleChange }
              param={ passwordError } 
            />
            <LoginInput
              atribute={{id: 'username', type: 'text', placeholder: 'nombre de usuario'}}
              handleChange={ handleChange } 
            />
            <LoginInput className='dato-input'
              atribute={{id: 'name', type: 'name', placeholder: 'Nombre'}}
              handleChange={ handleChange } 
              param={ nameError }
            />
            <LoginInput
              atribute={{id: 'lastname', type: 'text', placeholder: 'Apellido'}}
              handleChange={ handleChange } 
              param={ lastnameError }
            />
            <LoginInput
              atribute={{id: 'city', type: 'text', placeholder: 'Ciudad'}}
              handleChange={ handleChange } 
            />
            <LoginInput
              atribute={{id: 'direction', type: 'text', placeholder: 'Direccion'}}
              handleChange={ handleChange } 
            />    
            <LoginInput
              atribute={{id: 'tel', type: 'number', placeholder: 'Telefono'}}
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
          { wrongEmail &&
            <label className='label-alert'>
              Email incorrecto
            </label>
          }
          { wrongPassword &&
            <label className='label-alert'>
              Contraseña incorrecta
            </label>
          }
          <div className='form-element'>
          <LoginInput
            atribute={{id: 'email', type: 'text', placeholder: 'ingrese su email'}}
            handleChange={ handleChange } 
          />
          </div>
          <div className='form-element'>
            <LoginInput
              atribute={{id: 'password', type: 'password', placeholder: 'ingrese su contraseña'}}
              handleChange={ handleChange } 
              param={ passwordError }
            />
          </div>
          { passwordError &&
            <small className='small-content'>Contraseña demasiado corta</small>
          }
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


export default LoginPage;