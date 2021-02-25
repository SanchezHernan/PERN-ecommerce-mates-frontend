import './price.css'

const Price = ({precio, descuento}) => {

    return (
        <div className='price-container'>
            { descuento === 0 ? 
                <p className="price">${precio}</p>
            :
                <div className="style-1">
                    <del>
                        <span className="old">${precio}</span>
                    </del>
                    <ins>
                        <span className="new">${descuento}</span>
                    </ins>
                </div>
            }
        </div>
    )
}

export default Price;