import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import NavBar from '../../components/NavBar/navbar'
import Price from '../../components/Price/price'
import Button from '../../components/Button/button'
import Card from '../../components/Card/card'

import useOptions from '../../hook/useOptions'
import useUser from '../../hook/useUser'
import useDescuento from '../../hook/useDescuento'

import postProductInCart from '../../services/postProductInCart'
import getUser from '../../services/getUser'
import getCombo from '../../services/getCombo'
import getComboProducts from '../../services/getComboProducts'
import getComboStock from '../../services/getComboStock'

import './comboPage.css'


const ComboPage = () => {

    const history = useHistory()
    const {isLogged, email} = useUser()
    const { comboId, changeProdId } = useOptions()
    const {calcularDescuento} = useDescuento()
    const [info, setInfo] = useState(null)
    const [selected, setSelected] = useState('1')  
    const [comboStock, setComboStock] = useState(null)
    const [eachProd, setEachProd] = useState(null)
    const [witchToDisplay, setWitchToDisplay] = useState(0)


    const agregarAlCarrito = async () => {
        const cant = selected
        const prodId = info.codigo
        const opc = '1'
        const user = await getUser(email)        
        const cartId = user.carritoactual
        await postProductInCart({ cant, opc , prodId, cartId } )
        alert('Agregado al carrito')
    }

    const handleChange = (e) => {
        setSelected(e.target.value);
    } 

    const handleImg= (e, key) => {
        e.preventDefault();
        setWitchToDisplay(key)
    }

    const handleClick = (e) => {
        e.preventDefault()
        changeProdId(eachProd[witchToDisplay].codigo)
        history.push('/product')
    }
    

    //Efectos
    
    useEffect(() => {
        if (!isLogged && comboId != 0) {
          history.push('/');
        }
    }, [isLogged, history, comboId])

    useEffect(() => {
        const fetchData = async () => {
            const resp = await getCombo(comboId)
            const {min} = await getComboStock(comboId)
            const comboProds = await getComboProducts(comboId)
            const info = comboProds.map((producto) => calcularDescuento(producto))
            setEachProd(info)
            setInfo(resp)
            setComboStock(min)
        }
        fetchData() 
    }, [comboId]);


    return(
        <div>
            <NavBar/> 
            <div className='prodContent'>
                <div className='prodImgContent'>
                    {eachProd && 
                    <div className='leftSide'>
                        <Card className='oferta'
                            cardClass='card dim2'
                            img={eachProd[witchToDisplay].imagen}
                            nombre={eachProd[witchToDisplay].nombre}
                            precio={eachProd[witchToDisplay].precio}
                            descuento={eachProd[witchToDisplay].porcdescuento}
                            codigo={eachProd[witchToDisplay].codigo}
                        />
                        
                        <div  className='list-of-imgs'>
                        {eachProd.map((prod, i) =>
                            <a className='img-of-list' key={prod.codigo} onClick={(e) => handleImg(e, i)} href='#'>
                                <img className='img-small' src={prod.imagen} alt='#'/>
                            </a> 
                        )}
                        </div>
                    </div>
                    }
                </div>
                {info && 
                <div className='prodInfoContent'>

                    <h2>{info.nombre}</h2>
                    <hr/>
                    <p>{info.descripcion}</p>
                    <Price
                        precio={info.precio}
                    />
                    <p>Disponibles: {comboStock}</p>
                    <div className="btn-group">
                        Cantidad: 
                        <select onChange={handleChange}>
                            <option value="1" defaultValue>1 Unidad</option>
                            <option value="2">2 Unidades</option>
                            <option value="3">3 Unidades</option>
                            <option value="4">4 Unidades</option>
                            <option value="5">5 Unidades</option>
                            <option value="6">6 Unidades</option>
                            <option value="7">7 Unidades</option>
                            <option value="8">8 Unidades</option>
                            <option value="9">9 Unidades</option>
                            <option value="10">10 Unidades</option>
                        </select>
                    </div>  
                    <div className='card-button'>             
                    <Button
                        atr={{text: 'Agregar al carrito', type: 'button', className: 'btn btn-outline-primary mt5'}}
                        handleClick = { agregarAlCarrito }
                    />
                    </div>
                </div>
                }
            </div>
        </div>    
    )
}


export default ComboPage;
