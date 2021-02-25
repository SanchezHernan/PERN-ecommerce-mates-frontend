import React, { useState } from 'react'
import './form.css'
import Input from '../Input/Input'
import Button from '../Button/button'

const MyForm = () => {
  const [ buscado, setBuscado ] = useState('');

  function handleChange(id, value) {
    if (id === 'buscar'){
      setBuscado(value);
    }
    console.log(buscado)
  };

  function handleClick(e) {
    e.preventDefault()
    console.log('hola')
  }


  return(
    <form className='form-container'>
      <div className='input-group'>
        <div className='input-group-content-1'>
          <Input 
            atribute={{
              id: 'buscar',
              type: 'text',
              className: 'form-control',
              placeholder: 'buscar producto',
            }}
            handleChange={ handleChange }
          />
        </div>
        <Button
          atr={{
            text: 'Buscar',
            type: 'button'
          }}
          handleClick={ handleClick }
        />
      </div>
    </form>
  )
}

export default MyForm;