import NavBar from '../../components/NavBar/navbar'
import Button from '../../components/Button/button'
import useUser from '../../hook/useUser'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import cancel2 from '../../images/cancel2.png'
import './cartPage.css'

const CartPage = () => {

    const history = useHistory()
    const {isLogged, productosEnCarrito } = useUser()
    const [productList, setProductList] = useState(null);

    const getProduct = async (id) => {
        let newProd;
        const response = await fetch(`http://localhost:5000/producto/${id}`)
        const jsonData = await response.json()
        console.log(jsonData)
        if (productList){
            newProd = productList.concat(jsonData[0])
        } else {
            newProd = []
            newProd.concat(jsonData[0])
        }
        console.log('newProd: ', newProd)
        setProductList(newProd);
    }


    const handleClick = () => {
        console.log('click')
    }



    //Efectos
    useEffect(() => {
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])

    
    useEffect(() => {
        try{
            productosEnCarrito.map((id) => {
                getProduct(id)
            })
        } catch (error) {
            console.log(error);
        }
        
    }, [])
     
    return(
        <div>
            <NavBar/> 
            <div className='cartContainer'>
                <div className='cartContent1'>
                    {console.log('ProductList: ', productList)}
                    <h2>Precio Total: </h2>
                    <h4>Metodo de Pago: </h4>
                    <div className='buttonsContainer'>
                        <div className='button'>
                            <Button
                                atr={{
                                    text: 'Comprar',
                                    type: 'button'
                                }}
                                handleClick = {handleClick}
                            />
                        </div>
                        <div className='button'>
                            <Button
                                atr={{
                                    text: 'Cancelar Compra',
                                    type: 'button'
                                }}
                                handleClick = {handleClick}
                            />
                        </div>
                    </div>
                </div>
                <div className='cartContent2'>
                    <div className='listContent'>
                        <h4>Product 1</h4>
                        <a href='#'>
                            <img className='icon' src={cancel2} alt='#'/>
                        </a>
                    </div>
                    <div className='listContent'>
                        <h4>Product 2</h4>    
                        <a href='#'>
                            <img className='icon' src={cancel2} alt='#'/>
                        </a>
                    </div>
                    <div className='listContent'>
                        <h4>Product 3</h4>
                        <a href='#'>
                            <img className='icon' src={cancel2} alt='#'/>
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}


export default CartPage;
