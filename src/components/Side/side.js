import './side.css'


let Side = () => {
    return (
        <div>
            <div className="container">
                <h3 className="art">Artículos</h3>
                <div class="marle input-group">
                    <select class="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Filtrar por...</option>
                        <option value="1">Mates</option>
                        <option value="2">Termos</option>
                        <option value="3">Bombillas</option>
                        <option value="4">Yerbas</option>
                        <option value="5">Combos</option>
                    </select>
                    <div class="input-group-append">
                        <button class="btn btn-dark" type="button">Buscar</button>
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
                holis
            </div>



        </div>
    );
}
  
export default Side;


