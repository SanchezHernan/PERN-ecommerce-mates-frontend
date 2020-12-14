import React, { useState } from 'react';
import './form.css';
import Input from '../Input/Input';

const MyForm = () => {
  const [ buscado, setBuscado ] = useState('');

  function handleChange(id, value) {
    if (id === 'buscar'){
      setBuscado(value);
    }
  };

  console.log('buscado: ', buscado);

  return(
    <form className='form-container'>
      <div className='input-group'>
        <Input 
          atribute={{
            id: 'buscar',
            type: 'text',
            className: 'form-control',
            placeholder: 'buscar producto',
          }}
          handleChange={ handleChange }
        />
        <button type='submit' className='btn btn-outline-primary' value='Submit'>
            Buscar
        </button>
      </div>
    </form>
  )
}

export default MyForm;