import React from 'react';
import './loginInput.css'


const LoginInput = ({ atribute, handleChange, param }) => {
    return(
        <div className='login-input-container'>
            <input 
                id={atribute.id}
                type={atribute.type}
                className={ param ? 'form-control is-invalid' : 'form-control' }
                placeholder={atribute.placeholder}
                onChange={ (e) => handleChange(e.target.id, e.target.value) }
            />
        </div>

    );
};

export default LoginInput;