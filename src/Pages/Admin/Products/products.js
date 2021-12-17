import { useEffect, useState } from "react"
<<<<<<< HEAD
import getProductsTipe from "../../../services/getProductsTipe"
=======
import { useHistory } from "react-router"
import { toast } from "react-toastify"
>>>>>>> f4529ec (entrega)
import NavBar from '../../../components/NavBar/navbar'
import Button from '../../../components/Button/button'
import EditableLine from '../../../components/EditableLine/editableLine'
import useUser from "../../../hook/useUser"
import edit2 from '../../../images/edit2.png'
import cancel2 from '../../../images/cancel2.png'
import getProductsTipe from "../../../services/getProductsTipe"
import putProduct from "../../../services/putProduct"
import postProduct from "../../../services/postProduct"

import './products.css'
import 'react-toastify/dist/ReactToastify.css'


toast.configure({
  theme: 'dark',
  pauseOnHover: true,
  draggable: true
})


const Products = () => {

    const tipos = [
        'mates', 'termos', 'bombillas',
        'bolso', 'Yerbas', 'Otros'
    ]
    const [productos, setProductos] = useState(null)
    const {isLogged, adminEmail} = useUser()
    const [edicion, setEdicion] = useState(false)
    const [productoAEditar, setProductoAEditar] = useState(null)
    const history = useHistory()

    //Modificacion
    const [modificacion, setModificacion] = useState(false)
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [descuento, setDescuento] = useState('')
    const [stock, setStock] = useState('')
    const [stockmin, setStockmin] = useState('')
    const [proveedor, setProveedor] = useState('')
    const [tipo, setTipo] = useState('')

    //agregacion
    const [agregacion, setAgregacion] = useState(false)
    const [imagen, setImagen] = useState('')


    const editProd = (e, producto) => {
        e.preventDefault()
        setEdicion(true)
        setProductoAEditar(producto)
        setNombre(producto.nombre)
        setPrecio(producto.precio)
        setDescripcion(producto.descripcion)
        setDescuento(producto.porcdescuento)
        setStock(producto.stock)
        setStockmin(producto.stockmin)
        setProveedor(producto.proveedor)
        setTipo(producto.tipo)
    }

    const handleNombre = (value) => setNombre(value)
    const handlePrecio = (value) => setPrecio(value)
    const handleDescripcion = (value) => setDescripcion(value)
    const handleDescuento = (value) => setDescuento(value)
    const handleStock = (value) => setStock(value)
    const handleStockmin = (value) => setStockmin(value)
    const handleProveedor = (value) => setProveedor(value)
    const handleTipo = (value) => setTipo(value)
    const handleImagen = (value) => setImagen(value)
        
    const cerrar = () => {
        setEdicion(false)
        setAgregacion(false)
    }

    const modificar = () => setModificacion(!modificacion)
 
    const confirmar = () => {
        if (verificar) 
            putProduct(nombre, stock, precio, stockmin, descripcion, proveedor, tipo, descuento, productoAEditar.codigo)
        else  
            toast.warn('Faltan Datos')
        setModificacion(!modificacion)
    }

    const verificar = () => {
        if (nombre.length > 0 && stock > 0 && stockmin > 0 && precio > 0
            && descripcion.length > 0 && descuento > 0 && proveedor > 0
            && tipo > 0) {
            const r = window.confirm("Confirmar cambio?")
            if (r) return true
        }   else return false
    }

    const add = (indice) => {
        setAgregacion(true)
        setEdicion(true)
        setTipo(indice)
    }

    const addProduct = () => {
        if (verificar()){
            const url = imagen.split('/').join('|')
            postProduct(nombre, stock, stockmin, precio, descuento, descripcion, proveedor, tipo, url)
        }
    }

    const deleteProd = (e, code) => {
        e.preventDefault()
        console.log(code)
    }

    const goToAdminMenu = () => history.push('/admin')


    useEffect(() => {
        const fetchData = async() => {
            let prods = []
            for (var i = 0; i < 6; i++){
                prods[i] = await getProductsTipe(i+1)
            }
            setProductos(prods)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (!isLogged)
            history.push('/')
        if (!adminEmail)
            history.push('/home')
      }, [isLogged, history, adminEmail])


    return( 
        <div className='users-container'>
            <NavBar />
            {!edicion ?
                <div className='users-container-2'>
                    {productos &&
                        <div className='users-content'>
                            <div className='button-back'>
                                <Button
                                    atr={{ 
                                        className: 'black-button',
                                        text: 'Volver al Menu de Administracion', 
                                        type: 'button' 
                                    }}
                                    handleClick={ goToAdminMenu }
                                />
                            </div>
                            {productos.map((prodPorTipo, i) =>
                                <div className="card product-card" key={i}>
                                    <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
                                        {tipos[i]}
                                    </h3>
                                    <div className="card-body product-card-body">
                                        <div className='add-button'>
                                            <Button
                                                atr={{text: 'Agregar Producto', type: 'button', className: 'btn btn-outline-primary'}}
                                                handleClick = {() => add(i+1)}
                                            />
                                        </div>
                                    <table className='table'>
                                            <thead className='thead-dark'>
                                                <tr>
                                                    <th scope='col'>Cod</th>
                                                    <th scope='col'>Nombre</th>
                                                    <th scope='col'>Precio</th>
                                                    <th scope='col'>Descuento</th>
                                                    <th scope='col'>Stock</th>
                                                    <th scope='col'>Edit</th>
                                                    <th scope='col'>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {prodPorTipo.map((producto) => 
                                                    <tr key={producto.codigo}>
                                                        <th scope='row'>{producto.codigo}</th>
                                                        <td>{producto.nombre}</td>
                                                        <td>{producto.precio}</td>
                                                        <td>{producto.porcdescuento}</td>
                                                        <td>{producto.stock}</td>
                                                        <td><a href='#' onClick={(e) => editProd(e, producto)}>
                                                            <img className='img' src={edit2}/>
                                                        </a></td>
                                                        <td><a href='#' onClick={(e) => deleteProd(e, producto.codigo)}>
                                                            <img className='img' src={cancel2}/>
                                                        </a></td>
                                                    </tr>    
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>
            :
                //AGREGACION
                <div className='modificacion'>
                    {agregacion ?
                        <div className="card product-card">
                            <div className='card-title bg-b'>
                                <h3>Agregar Nuevo Producto</h3>
                            </div>
                            <div className='card-body product-card-body'>
                                <EditableLine
                                    atr={{ className: 'card-item', text1: 'Nombre', type: 'text' }}
                                    handleChange={ handleNombre } 
                                    param={ true }
                                />
                                <EditableLine
                                    atr={{ className: 'card-item', text1: 'Stock',  type: 'number' }}
                                    handleChange={ handleStock } 
                                    param={ true }
                                />                    
                                <EditableLine
                                    atr={{ className: 'card-item', text1: 'Stock min', type: 'number' }}
                                    handleChange={ handleStockmin } 
                                    param={ true }
                                />
                                <EditableLine
                                    atr={{ className: 'card-item', text1: 'Precio', type: 'number' }}
                                    handleChange={ handlePrecio } 
                                    param={ true }
                                />
                                <EditableLine
                                    atr={{ className: 'card-item', text1: 'Porc. Descuento', type: 'number' }}
                                    handleChange={ handleDescuento } 
                                    param={ true }
                                />
                                <EditableLine
                                    atr={{ className: 'card-item', text1: 'Descripcion', type: 'text' }}
                                    handleChange={ handleDescripcion } 
                                    param={ true }
                                />
                                <EditableLine
                                    atr={{ className: 'card-item', text1: 'Proveedor', type: 'number' }}
                                    handleChange={ handleProveedor } 
                                    param={ true }
                                />
                                <EditableLine
                                    atr={{ className: 'card-item', text1: 'Imagen', type: 'text' }}
                                    handleChange={ handleImagen } 
                                    param={ true }
                                />                               
                                <div className='buttons-container'>
                                    <div className='close-button'>
                                        <Button
                                            atr={{text: 'Confirmar', type: 'button', className: 'btn btn-outline-primary'}}
                                            handleClick = {addProduct}
                                        />
                                    </div>
                                    <div className='close-button'>
                                        <Button
                                            atr={{text: 'Cerrar', type: 'button', className: 'btn btn-outline-primary'}}
                                            handleClick = {cerrar}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    :
                        //Modificacion
                        <div className="card product-card">
                            <div className='card-title  bg-b'>
                                <h3>Modificar Producto</h3>
                            </div>
                            <div className='card-body product-card-body'>
                                <EditableLine
                                    atr={{
                                        className: 'card-item', text1: 'Nombre', text2: productoAEditar.nombre,
                                        placeholder: productoAEditar.nombre, type: 'text', value: nombre
                                    }}
                                    handleChange={ handleNombre } 
                                    param={ modificacion }
                                />
                                <EditableLine
                                    atr={{
                                        className: 'card-item', text1: 'Stock', text2: productoAEditar.stock,
                                        placeholder: productoAEditar.stock, id: 2, type: 'number', value: stock
                                    }}
                                    handleChange={ handleStock } 
                                    param={ modificacion }
                                />                    
                                <EditableLine
                                    atr={{
                                        className: 'card-item', text1: 'Stock min', text2: productoAEditar.stockmin,
                                        placeholder: productoAEditar.stockmin, id: 3, type: 'number', value: stockmin
                                    }}
                                    handleChange={ handleStockmin } 
                                    param={ modificacion }
                                />
                                <EditableLine
                                    atr={{
                                        className: 'card-item', text1: 'Precio', text2: productoAEditar.precio,
                                        placeholder: productoAEditar.precio, id: 4, type: 'number', value: precio
                                    }}
                                    handleChange={ handlePrecio } 
                                    param={ modificacion }
                                />
                                <EditableLine
                                    atr={{
                                        className: 'card-item', text1: 'Porc. Descuento', text2: productoAEditar.porcdescuento,
                                        placeholder: productoAEditar.porcdescuento, id: 5, type: 'number', value: descuento
                                    }}
                                    handleChange={ handleDescuento } 
                                    param={ modificacion }
                                />
                                <EditableLine
                                    atr={{
                                        className: 'card-item', text1: 'Descripcion', text2: productoAEditar.descripcion,
                                        placeholder: productoAEditar.descripcion, id: 6, type: 'text', value: descripcion
                                    }}
                                    handleChange={ handleDescripcion } 
                                    param={ modificacion }
                                />
                                <EditableLine
                                    atr={{
                                        className: 'card-item', text1: 'Proveedor', text2: productoAEditar.proveedor,
                                        placeholder: productoAEditar.proveedor, id: 7, type: 'number', value: proveedor
                                    }}
                                    handleChange={ handleProveedor } 
                                    param={ modificacion }
                                />
                                <EditableLine
                                    atr={{
                                        className: 'card-item', text1: 'Tipo', text2: productoAEditar.tipo,
                                        placeholder: productoAEditar.tipo, id: 8, type: 'number', value: tipo
                                    }}
                                    handleChange={ handleTipo } 
                                    param={ modificacion }
                                />
                                {modificacion ?
                                    <div className='buttons-container'>
                                        <div className='close-button'>
                                            <Button
                                                atr={{text: 'Confirmar', type: 'button', className: 'btn btn-outline-primary'}}
                                                handleClick = {confirmar}
                                            />
                                        </div>
                                        <div className='close-button'>
                                            <Button
                                                atr={{text: 'Cerrar', type: 'button', className: 'btn btn-outline-primary'}}
                                                handleClick = {modificar}
                                            />
                                        </div>
                                    </div>
                                :
                                    <div className='buttons-container'>
                                        <div className='close-button'>
                                            <Button
                                                atr={{text: 'Modificar', type: 'button', className: 'btn btn-outline-primary'}}
                                                handleClick = {modificar}
                                            />
                                        </div>
                                        <div className='close-button'>
                                            <Button
                                                atr={{text: 'Cerrar', type: 'button', className: 'btn btn-outline-primary'}}
                                                handleClick = {cerrar}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Products;

