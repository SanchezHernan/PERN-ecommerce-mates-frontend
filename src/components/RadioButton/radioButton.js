import useOptions from '../../hook/useOptions'
import './radioButton.css'


const RadioButton = () => {

    const { establecerOrden } = useOptions()

    const handleRadioChange = (event) => {
        establecerOrden(event.target.value)
    }

    return(
        <div>
            <form className="radio-buttons" onChange={handleRadioChange}>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1"/>
                    <label className="form-check-label" htmlFor="exampleRadios1">
                        Menor Precio
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="2" />
                    <label className="form-check-label" htmlFor="exampleRadios2">
                        Mayor Precio
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="3" /> 
                    <label className="form-check-label" htmlFor="exampleRadios3">
                        Calificacion
                    </label>
                </div>
            </form>
        </div>
    )
}

export default RadioButton;