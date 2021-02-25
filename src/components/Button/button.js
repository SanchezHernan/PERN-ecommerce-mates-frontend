import './button.css'

const Button = ({ atr, handleClick }) => {
    return(
        <button type={atr.type} className='btn btn-outline-primary' value={atr.type} onClick={ (e) => handleClick(e) }>
            { atr.text }
        </button>
    )

}

export default Button;

