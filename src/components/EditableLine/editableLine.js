import './editableLine.css'

const EditableLine = ({ atr, handleChange, param }) => {

    return (
        <div className={atr.className}>
            {param ?
                <div className='item'>
                    <p className='item-1'>{atr.text1}:</p>
                    <div className='input-container'>
                        <input 
                            type={atr.type}
                            className={'form-control card-item-2'}
                            placeholder={atr.placeholder}
                            value={atr.value}
                            onChange={e => handleChange(e.target.value) }
                        />
                    </div>
                </div>
            :
                <div className='item'>
                    <p className='item-1'>{atr.text1}:</p>
                    <span className='item-2'>{atr.text2}</span>
                </div>
            }
        </div>
    )
}
  
export default EditableLine;