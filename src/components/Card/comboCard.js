import './card.css'
import Price from '../Price/price'
import useOptions from '../../hook/useOptions'
import { useHistory } from 'react-router-dom';

function ComboCard({ cardClass = 'card dim', nombre, descuento, precio, codigo }) {

    const {changeComboId} = useOptions();
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault()
        changeComboId(codigo)
        history.push('/combo')
    }

    return (
        <a className={cardClass} onClick={handleClick} href="http://localhost:3000/combo">
            <div className="card-body">
                <h6 className="card-title">{nombre}</h6>
                <Price
                    precio={precio}
                    descuento={descuento}
                />    
            </div>
        </a>
    );
}
  
export default ComboCard;