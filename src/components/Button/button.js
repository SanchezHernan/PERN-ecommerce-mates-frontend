import './button.css'

const Button = ({ atr, handleClick }) => {

    return(
        <button type={atr.type} className={atr.className ? atr.className : 'btn btn-outline-primary'} value={atr.type} onClick={ (e) => handleClick(e)} disabled={atr.disabled}>
            { atr.text }
        </button>
    )

}

export default Button;

