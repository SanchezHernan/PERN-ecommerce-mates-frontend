import './contactItem.css'

const ContactItem = ({img, text}) => {

    return (
        <div className="contact-item-container">
            <img className='item-img' src={img}></img>
            <span className='item-texto'>{text}</span>
        </div>
        
    );
}
  
export default ContactItem;