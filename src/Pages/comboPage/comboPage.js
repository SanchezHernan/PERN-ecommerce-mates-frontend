import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import NavBar from '../../components/NavBar/navbar';
import Price from '../../components/Price/price'
import Button from '../../components/Button/button'

import useOptions from '../../hook/useOptions';
import useUser from '../../hook/useUser';

import postProductInCart from '../../services/postProductInCart'
import getUser from '../../services/getUser'
import getCombo from '../../services/getCombo'
import getComboProducts from '../../services/getComboProducts'
import getComboStock from '../../services/getComboStock';

import './comboPage.css'


const ComboPage = () => {

    const history = useHistory()
    const {isLogged, email} = useUser()
    const { prodId, combo } = useOptions()
    const [info, setInfo] = useState(null)
    const [selected, setSelected] = useState('1')  
    const [comboStock, setComboStock] = useState(null)
    const [eachProd, setEachProd] = useState(null)
    const [witchToDisplay, setWitchToDisplay] = useState(0)


    const agregarAlCarrito = async () => {
        const cant = selected
        const prodId = info.codigo
        const opc = '1'
        console.log(opc)
        const user = await getUser({email})        
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


    //Efectos
    
    useEffect(() => {
        if (!isLogged && prodId != 0) {
          history.push('/');
        }
    }, [isLogged, history, prodId])

    useEffect(() => {
        const fetchData = async () => {
            const resp = await getCombo(prodId)
            const {min} = await getComboStock(prodId)
            const comboProds = await getComboProducts(prodId)
            console.log(comboProds)
            setEachProd(comboProds)
            setInfo(resp)
            setComboStock(min)
        }
        fetchData() 
    }, [prodId, combo]);

     
    return(
        <div>
            <NavBar/> 
            <div className='prodContent'>
                <div className='prodImgContent'>
                    {eachProd && 
                    <div>
                        <img className='imgtam' src={eachProd[witchToDisplay].imagen} alt='#'/>
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

                    <h1>{info.nombre}</h1>
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
                    <Button
                        atr={{
                            text: 'Agregar al carrito',
                            type: 'button'
                        }}
                        handleClick = { agregarAlCarrito }
                    />
                </div>
                }
            </div>
        </div>    
    )
}


export default ComboPage;
