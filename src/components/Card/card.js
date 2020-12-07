
import './card.css'

function Card(props) {
    return (
        <div className="card dim">
            <img src={props.img} class="card-img-top img-dim" alt="..."/>
            <div class="card-body">
                <p class="card-text">$$ PRECIO $$</p>
            </div>
        </div>
    );
}
  
export default Card;