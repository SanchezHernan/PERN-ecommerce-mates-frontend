import React, { useState } from 'react';
import RadioButton from '../RadioButton/radioButton'
import useOptions from '../../hook/useOptions'
import ContactItem from '../ContactItem/contactItem'

import whatsapp from '../../images/whatsapp.png'
import instagram from '../../images/instagram.png'
import gmail from '../../images/gmail.png'

import './side.css'


const Side = () => {
   
    const{ marcar } = useOptions()
    const [show, setShow] = useState()
    
    const handleChange = (value) => {
        if (value !== "10") marcar(value)
    }

    const myFunction = () => {
        setShow(true);
    }

    const myOtherFunction = () => {
        setShow(false);
    }



    return (
        <div className="big">
            <div className="container">
                <div className='relleno'>
                </div>
                <h3 className="art">Artículos</h3>
                <div className="input-group">
                    <select className="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon" onChange={e => handleChange(e.target.value)}>
                        <option value="10">Filtrar por...</option>
                        <option value="1">Mates</option>
                        <option value="2">Termos</option>
                        <option value="3">Bombillas</option>
                        <option value="4">Bolsos</option>
                        <option value="5">Yerbas</option>
                        <option value="6">Otros</option>
                    </select>            
                </div>
                <hr/><hr/>
                <h4>Ordenar Por</h4>
                <RadioButton />
            </div>
            <div className="bottom">
                <hr/>
                <div className="contacto" onMouseEnter={myFunction} onMouseLeave={myOtherFunction}>
                    <a href="#">Contacto</a>
                    {show && 
                        <div className='contacto-content'>
                            <ContactItem
                                img={whatsapp}
                                text='12312312'
                            />
                            <ContactItem
                                img={gmail}
                                text='remateam@gmail.com'
                            />
                            <ContactItem
                                img={instagram}
                                text='@remateamargo'
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

  
export default Side;


