import './card.css'
import Price from '../Price/price'
import useOptions from '../../hook/useOptions'
import { useHistory } from 'react-router-dom';

function Card({ cardClass = 'card dim', imgClass = 'card-img-top img-dim', img = null, nombre, precio, descuento, codigo }) {

    const {changeProdId} = useOptions();
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault()
        changeProdId(codigo)
        history.push('/product')
    }

    return (
        <a className={cardClass} onClick={handleClick} href="http://localhost:3000/product">
            {img && 
                <img src={img} className={imgClass} alt="..."/>
            }
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
  
export default Card;