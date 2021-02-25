import React from 'react';
import RadioButton from '../RadioButton/radioButton'
import useOptions from '../../hook/useOptions'
import './side.css'

const Side = () => {
   
    const{ marcar } = useOptions()
    
    const handleChange = (event) => {
        marcar(event.target.value)
    }



    return (
        <div className="big">
            <div className="container">
                <h3 className="art">Artículos</h3>
                <div className="input-group">
                    <select className="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon" onChange={handleChange}>
                        <option defaultValue>Filtrar por...</option>
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
                <div className="contacto">
                    <a href="#">Contacto</a>
                </div>
                <hr/>
                <div className="ayuda">
                    <a href="#">Ayuda</a>
                </div>
            </div>
        </div>
    );
}

  
export default Side;


