import React, { useState, useEffect } from "react";
import Label from '../../components/Label/label';
import LoginInput from '../../components/Input/loginInput';
import { useHistory } from 'react-router-dom';
import useUser from '../../hook/useUser'
import './login.css'


const LoginButton = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState(false);
  const [ wrongPassword, setWrongPassword ] = useState(false);
  const [ wrongEmail, setWrongEmail ] = useState(false);
  const history = useHistory();
  const {login, isLogged} = useUser();

  useEffect(() => {
    if (isLogged) {
      history.push('/home');
    }
  }, [isLogged, history])

  function handleChange(id, value) {
    if(id === 'email') {
      setEmail(value);
    } else {
      if (value.length < 6) {
        setPasswordError(true);
      } else{
        setPasswordError(false);
        setPassword(value); 
      }
    }
  };


  const getUsuarios = async (param) => {
    let jsonData;
    if(param.email.length > 0 && param.password.length > 0) {
      try {
        const response = await fetch(`http://localhost:5000/usuarios/${param.email}`)
        jsonData = await response.json();
        if(jsonData.email.length > 0){
          setWrongEmail(false);
          if(jsonData.contrasenia === param.password){
            setWrongPassword(false);
            console.log('llego')
            login();
          } else {
            setWrongPassword(true);
          }
        }
      } catch (err) {
        setWrongEmail(true);
        setWrongPassword(false);
        console.error(err.message);
      }
    } else {
      setWrongPassword(false);
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()
    let account = { email, password }
    if(account) {
      getUsuarios(account);
    }
  }

  return (
    
    <div className='login-container'>
      <div className='login-content'>
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
        <Label htmlFor='email' text="email"/>
        <LoginInput
          atribute={{
            id: 'email',
            type: 'text',
            placeholder: 'ingrese su email'
          }}
          handleChange={ handleChange } 
        />
        
        <Label htmlFor='contraseña' text="contraseña"/>
        <LoginInput
          atribute={{
            id: 'contraseña',
            type: 'password',
            placeholder: 'ingrese su contraseña'
          }}
          handleChange={ handleChange } 
          param={ passwordError }
        />

        { passwordError &&
          <small className='small-content'>Contraseña demasiado corta</small>
        }
        <div className='submit-button-container'>
          <button className="submit-button btn btn-primary" onClick={ handleSubmit }>
            Log In
          </button>
        </div>      
      </div>
    </div>  
  );
};


export default LoginButton;