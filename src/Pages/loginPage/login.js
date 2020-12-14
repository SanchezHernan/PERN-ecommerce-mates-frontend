import React, { useState } from "react";
import Label from '../../components/Label/label';
import LoginInput from '../../components/Input/loginInput';
import './login.css'

const LoginButton = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState(false);
  const [ isLogin, setIsLogin ] = useState(false);
  const [ hasError, setHasError ] = useState(false);


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

  function ifMatch(param) {
    if(param.email.length > 0 && param.password.length > 0) {
        if(param.email === 'Hernan' && param.password === '123456') {
          const { email, password } = param;
          let ac = { email, password };
          let account = JSON.stringify(ac);
          localStorage.setItem('accont', account);
          setIsLogin(true);
        } else {
          setIsLogin(false);
          setHasError(true);
        }
    } else {
      setIsLogin(false);
    }
  }

  const handleSubmit = () => {
    let account = { email, password }
    if(account) {
      ifMatch(account);
    }
  }

  return (
    
    <div className='login-container'>
      <div className='login-content'>
        <h1>Bienvenido</h1>
        { hasError &&
          <label className='label-alert'>
            Se han introducidos datos erroneos
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