
import './card.css'

function Card(props) {
    return (
        <div className="card dim">
            <img src={props.img} className="card-img-top img-dim" alt="..."/>
            <div className="card-body">
                <p className="card-text">$$ PRECIO $$</p>
            </div>
        </div>
    );
}
  
export default Card;