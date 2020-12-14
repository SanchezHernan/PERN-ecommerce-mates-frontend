import React from 'react';
import './Input.css';


const Input = ({ atribute, handleChange, param }) => {
    return(
        <div className='input-container'>
            <input 
                id={atribute.id}
                type={atribute.type}
                className={atribute.className}
                placeholder={atribute.placeholder}
                onChange={ (e) => handleChange(e.target.id, e.target.value) }
            />
        </div>

    );
};

export default Input;