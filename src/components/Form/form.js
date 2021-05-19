import React, { useState } from 'react'
import './form.css'
import Input from '../Input/Input'
import Button from '../Button/button'
import useOptions from '../../hook/useOptions'


const MyForm = () => {
  const [ buscado, setBuscado ] = useState('')
  const { searchText } = useOptions()

  function handleChange(id, value) {
    if (id === 'buscar')
      setBuscado(value);
  };

  function handleClick(e) {
    e.preventDefault()
    searchText(buscado)
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
        <div className='button-cont'>
          <Button
            atr={{
              text: 'Buscar',
              type: 'submit'
            }}
            handleClick={ handleClick }
          />
        </div>
      </div>
    </form>
  )
}

export default MyForm;