import NavBar from '../../components/NavBar/navbar'
import useUser from '../../hook/useUser'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './purchasesPage.css'
//import getUser from '../../services/getUser'
import getPurchases from '../../services/getPurchases'

const PurchasesPage = () => {

    let carrritoactual
    let parcialList = []
    let totalList = []
    //const [usuario, setUsuario] = useState(null)
    const {isLogged, email} = useUser()
    const history = useHistory()
    const [compras, setCompras] = useState(null)
    const [comprasPorCarrito, setComprasPorCarrito] = useState(null)
    const [witchDisplay, setWitchDisplay] = useState([])

    const handleClick = (e, i) => {
        e.preventDefault()
        if (witchDisplay.includes(i)){
            const newDisplay = witchDisplay.filter(el => el !== i)
            setWitchDisplay(newDisplay)
            
        } else {
            const newDisplay = witchDisplay.concat(i)
            setWitchDisplay(newDisplay)
        }
    } 

    useEffect(() => {
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])


    useEffect(() => {
        const fetchData = async () => {
            //const response = await getUser({email})
            //setUsuario(response);
            const purchases = await getPurchases(email)
            setCompras(purchases)
            console.log(purchases);
        }
        fetchData();
    }, [email])

    useEffect(() => {
        if (compras) {
            carrritoactual = compras[0].carrito
            compras.map((compra) => {
                if (compra.carrito !== carrritoactual){
                    carrritoactual = compra.carrito
                    totalList.push(parcialList)
                    parcialList = []
                }
                parcialList.push(compra)
            })
            totalList.push(parcialList)
        }
        setComprasPorCarrito(totalList) 
    }, [compras])

     
    return(
        <div>
            <NavBar/>
            <div className='purchasesContent'>
                {comprasPorCarrito &&
                    <div>
                        {comprasPorCarrito.map((prodsDeCompra, i) =>  
                            <div className='card cardStyle'>
                                <a className="card-header" onClick={(e) => handleClick(e, i)} href='#'>
                                    <h4>Comprado el {prodsDeCompra[0].fecha.slice(0,10)}</h4>
                                    <h4>Estado: {prodsDeCompra[0].estado}</h4>
                                </a>
                                {witchDisplay.includes(i) &&
                                
                                <div className='list-container'>
                                    <ul className="list-group">
                                        {
                                            prodsDeCompra.map((producto, i) => 
                                            <div className='list-content'>
                                                <li className="list-group-item" key={i}>{producto.nombre}</li>
                                            </div>
                                        )}
                                    </ul>
                                    <button>Finalizar Compra</button>
                                </div>
                                }
                            </div>
                        )}
                    </div>
                }        
            </div>
        </div>
    )
}

export default PurchasesPage;
