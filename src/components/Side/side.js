import React from 'react';
import Select from 'react-select';
import './side.css'

class Side extends React.Component {
       
    render(){

        const options =[
            {label:  'Mates', value: '1'},
            {label:  'Termos', value: '2'},
            {label:  'Bombillas', value: '3'},
            {label:  'Yerbas', value: '4'},
            {label:  'Combos', value: '5'},
            {label:  'Otros', value: '6'},
        ]

        const handleChange = (value) => {
            console.log(value);
        }

        return (
            <div className="big">
                <div className="container">
                    <h3 className="art">Artículos</h3>
                    <div className="marle input-group">
                        <select className="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon" onChange={handleChange}>
                            <option selected>Filtrar por...</option>
                            <option value="1">Mates</option>
                            <option value="2">Termos</option>
                            <option value="3">Bombillas</option>
                            <option value="4">Yerbas</option>
                            <option value="5">Combos</option>
                        </select>
                        {/* <Select className='custom-select' option={options}/>*/}
                        <div class="input-group-append">
                            <button className="btn btn-dark" type="button">Buscar</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="container">
                    <h3>Ordenar Por</h3>
                    <form className="radio-buttons">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1" />
                            <label className="form-check-label" for="exampleRadios1">
                                Precio
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="2" />
                            <label className="form-check-label" for="exampleRadios2">
                                Calificacion
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="3" /> 
                            <label className="form-check-label" for="exampleRadios3">
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
}
  
export default Side;


