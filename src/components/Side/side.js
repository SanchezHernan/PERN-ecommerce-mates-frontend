import React from 'react';
import useOptions from '../../hook/useOptions'
import './side.css'

const Side = () => {
   
    const{marcar} = useOptions();
    
    const handleChange = (event) => {
        marcar(event.target.value);
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
                    {/* <Select className='custom-select' option={options}/>*/}
                </div>
                <hr/>
                <h3>Ordenar Por</h3>
                <form className="radio-buttons">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1" />
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            Precio
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="2" />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Calificacion
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="3" /> 
                        <label className="form-check-label" htmlFor="exampleRadios3">
                            Descuentos
                        </label>
                    </div>
                </form>
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


