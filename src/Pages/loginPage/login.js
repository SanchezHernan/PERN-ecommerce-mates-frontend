import React, { useState, useEffect } from "react";
import Label from '../../components/Label/label';
import LoginInput from '../../components/Input/loginInput';
import { useHistory } from 'react-router-dom';
import useUser from '../../hook/useUser'
import './login.css'
import getUser from "../../services/getUser";


const LoginButton = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState(false);
  const [ wrongPassword, setWrongPassword ] = useState(false);
  const [ wrongEmail, setWrongEmail ] = useState(false);
  const history = useHistory();
  const {login, isLogged, setUserEmail} = useUser();

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
    if(param.email.length > 0 && param.password.length > 0) {
      try { 
        const jsonData = await getUser({email: param.email})
        if(jsonData.email.length > 0){
          setWrongEmail(false);
          if(jsonData.contrasenia === param.password){
            setWrongPassword(false);
            setUserEmail(jsonData.email);
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
      <form className='login-content' onClick={handleSubmit}>
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

        {//Hacer esto un formulario
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
          <button className="submit-button btn btn-primary" type='submit' >
            Log In
          </button>
        </div>      
      </form>
    </div>  
  );
};


export default LoginButton;