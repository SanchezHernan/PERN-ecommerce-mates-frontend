import { Link, useParams } from "react-router-dom"
import successImage from '../../images/success3.png'
import cancelImage from '../../images/cancel1.png'

import './notifPurchase.css'

const NotifPurchase = () => {
    
    const { estadoCompra } = useParams()
    
    return (
        <div className="notifContainer">
            <div className="notifContent">
                <img src={ estadoCompra === 'FINALIZADA' ? successImage : cancelImage } alt='...' />
                <h1>SU COMPRA HA SIDO {estadoCompra}</h1>
                <Link to='/purchases' className="btn btn-outline-dark">Volver</Link>
            </div>
        </div>
    )
}

export default NotifPurchase