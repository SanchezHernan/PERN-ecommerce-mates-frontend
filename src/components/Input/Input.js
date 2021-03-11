import React from 'react';
import './Input.css';


const Input = ({ atribute, handleChange }) => {
    return(
        <div className='input-container'>
            <input 
                id={atribute.id}
                type={atribute.type}
                className={atribute.className}
                placeholder={atribute.placeholder}
                value={atribute.value}
                onChange={ (e) => handleChange(e) }
            />
        </div>
    );
};

export default Input;