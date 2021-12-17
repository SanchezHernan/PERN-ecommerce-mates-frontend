import { useEffect, useState } from "react"
import {Link, useHistory} from 'react-router-dom'
import { toast } from 'react-toastify'

import NavBar from '../../../components/NavBar/navbar'
import Button from '../../../components/Button/button'
import Input from '../../../components/Input/Input'
import EditableLine from '../../../components/EditableLine/editableLine'
import useUser from "../../../hook/useUser"
import getProductsTipe from "../../../services/getProductsTipe"
import getCombos from '../../../services/getCombos'
import { putCombo } from '../../../services/putServices'
import { deleteCombo, deleteProductoxcombo } from '../../../services/deleteCombo'
import {postCombo, postComboXProducto} from "../../../services/postCombo"
import getComboProducts from "../../../services/getComboProducts"
import edit2 from '../../../images/edit2.png'
import cancel2 from '../../../images/cancel2.png'
import addButton from '../../../images/addButton.png'

import './combos.css'
import 'react-toastify/dist/ReactToastify.css'


toast.configure({
  theme: 'dark',
  pauseOnHover: true,
  draggable: true
})


const Combos = () => {

    const tipos = [
        'mates', 'termos', 'bombillas',
        'bolso', 'Yerbas', 'Otros'
    ]
    const [productos, setProductos] = useState([])
    const [combos, setCombos] = useState([])
    const {isLogged, adminEmail} = useUser()
    const history = useHistory()
    const [refresh, setRefresh] = useState(0)

    //Creacion Combo
    const [confirmationMode, setConfirmationMode] = useState(false)
    const [modoCrear, setModoCrear] = useState(false)
    const [precioCombo, setPrecioCombo] = useState(0)
    const [comboName, setComboName] = useState('')
    const [comboDescription, setComboDescription] = useState('')
    const [comboPrice, setComboPrice] = useState(0)
    const [newCombo, setNewCombo] = useState([])

    //modificacion
    const [modoModificar, setModoModificar] = useState(false)
    const [comboModificado, setComboModificado] = useState(null)
    const [modificacion, setModificacion] = useState(false)
    //se usan comboName, comboDescription y comboPrince de la parte de creacion
    

    const delCombo = async (e, codigo) => {
        e.preventDefault()
        const comboProducts = await getComboProducts(codigo)
        console.log(comboProducts)
        comboProducts.map((cp) => deleteProductoxcombo(cp.codigo, codigo))
        const newComboList = combos.filter((item) => item.codigo !== codigo)
        setCombos(newComboList)
        deleteCombo(codigo)
        toast.success('Combo borrado')
    }

    const crearCombo = () => setModoCrear(!modoCrear);

    //Creacion combo
    const addProdToCombo = (e, producto) => {
        e.preventDefault()
        const addCombo = [...newCombo, producto ]
        setNewCombo(addCombo)
        setPrecioCombo(precioCombo + producto.precio)
    }

    const confirmarCombo = async (e) => {
        e.preventDefault()
        console.log(comboName);
        console.log(comboPrice);
        console.log(comboDescription);
        const newCode = await postCombo(comboName, comboPrice, comboDescription)
        newCombo.map((comboProd) => postComboXProducto(comboProd.codigo, newCode))
        setNewCombo([])
        setComboName('')
        setComboDescription('')
        setConfirmationMode(false)
        toast.success('Combo creado exitosamente')
    }

    const deleteProd = (e, comboProd) => {
        e.preventDefault()
        const newList = newCombo.filter((item) => item.codigo !== comboProd.codigo)
        setNewCombo(newList)
        setPrecioCombo(precioCombo - comboProd.precio)
    }

    const modoConfirmacion = (e) => {
        e.preventDefault()
        setConfirmationMode(!confirmationMode)
    }

    const handleNombre = (_, value) => setComboName(value)

    const handleDescripcion = (_, value) => setComboDescription(value)
    
    const handlePrice = (_, value) => setComboPrice(value)

    //modificacion combo
    const editCombo = (e, combo) => {
        e.preventDefault()
        if (!modoModificar)
            setComboModificado(combo)         
        setModoModificar(!modoModificar)
    }

    const modificar = () => {
        setModificacion(!modificacion)
        setComboPrice(comboModificado.precio)
        setComboName(comboModificado.nombre)
        setComboDescription(comboModificado.descripcion)
    }

    const modifNombre = (value) => setComboName(value)

    const modifDescripcion = (value) => setComboDescription(value)
    
    const modifPrice = (value) => setComboPrice(value)

    const confirmarEdit = () => {
        if (comboName.length > 0 && comboDescription.length > 0){
            putCombo(comboModificado.codigo, comboName, comboDescription, comboPrice)
            toast('Combo modificado')
            setModoModificar(false)
            setRefresh(refresh+1)
        }
        else
            toast.info('Debe completar la informacion')
    }

    
    //effects
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

    //si no funciona agregar 'deleteCombo' en el array de dependencias
    useEffect(() => {
        const fetchData = async() => {
            const resp = await getCombos()
            setCombos(resp)
        }
        fetchData()
    }, [refresh])

    useEffect(() => {
        if (!isLogged)
            history.push('/')
        if (!adminEmail)
            history.push('/home')
      }, [isLogged, history, adminEmail])


    return( 
        <div className='combos-container'>
            <NavBar />
            <Link></Link>
            <div className='combos-body'>
                {/*Pagina Crear Combo*/}
                {modoCrear ?
                    <div className='crear-combos'>
                        <div className='combo-list'>
                            {!confirmationMode ?
                                <div className='combo-title-container'>
                                    <h3 className='combo-title font-weight-bold text-uppercase'>Nuevo Combo</h3>
                                    <div className='combo-button-confirm'>
                                        <Button
                                            atr={{text: 'Confirmar Creacion', type: 'button', className: 'btn btn-outline-dark'}}
                                            handleClick = {modoConfirmacion}
                                        />
                                    </div>
                                </div>
                            :
                                <div className='confirmation-container'>
                                    <h3 className='animated-combo-title font-weight-bold text-uppercase'>Nuevo Combo</h3>    
                                    <div className='combo-title-confirmation'>
                                        <div className='combo-confirm-input'>
                                            <Input 
                                                atribute={{
                                                    type: 'text', className: 'form-control', placeholder: 'Nombre',
                                                }}
                                                handleChange={ handleNombre }
                                            />
                                        </div>
                                        <div className='combo-confirm-input'>
                                            <Input 
                                                atribute={{
                                                    type: 'text', className: 'form-control', placeholder: 'Descripcion',
                                                }}
                                                handleChange={ handleDescripcion }
                                            />
                                        </div>
                                        <div className='combo-confirm-button'>
                                            <Button
                                                atr={{text: 'Confirmar Combo', type: 'button', className: 'btn btn-outline-dark'}}
                                                handleClick = {confirmarCombo}
                                            />
                                        </div>
                                        <div className='combo-confirm-button'>
                                            <Button
                                                atr={{text: 'Cancelar', type: 'button', className: 'btn btn-outline-dark'}}
                                                handleClick = {modoConfirmacion}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className='new-combo-table table-responsive'>
                                <table className='table'>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th scope='col'>Cod</th>
                                            <th scope='col'>Nombre</th>
                                            <th scope='col'>Precio</th>
                                            <th scope='col'>Descuento</th>
                                            <th scope='col'>Stock</th>
                                            <th scope='col'>Delete</th>
                                        </tr>
                                    </thead>
                                    {newCombo.map((comboProd) =>
                                        <tbody key={comboProd.codigo}> 
                                            <tr>
                                                <th scope='row'>{comboProd.codigo}</th>
                                                <td>{comboProd.nombre}</td>
                                                <td>{comboProd.precio}</td>
                                                <td>{comboProd.porcdescuento}</td>
                                                <td>{comboProd.stock}</td>
                                                <td><a href='#' onClick={(e) => deleteProd(e, comboProd)}>
                                                    <img className='img' alt='...' src={cancel2}/>
                                                </a></td>
                                            </tr>    
                                        </tbody>
                                    )}
                                </table>
                            </div>
                            <div className='combo-footer'>
                                <div className='combo-footer-1'>
                                    <span className='combo-span-1'>Precio Total: </span>
                                    <span className='combo-span-1'> ${precioCombo} </span>
                                </div>
                                <div className='combo-footer-1'>
                                    <span className='combo-span-2'>Precio del Combo: </span>
                                    <div className='combo-input'>
                                        <Input 
                                            atribute={{
                                            id: '1',
                                            type: 'number',
                                            className: 'form-control',
                                            placeholder: '$',
                                            }}
                                            handleChange={ handlePrice }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>Productos</h2>    
                            {productos.map((prodPorTipo, i) =>
                                //Tabla con todos los productos
                                <div className='combo-list' key={i}>
                                    <h3 className="text-center font-weight-bold text-uppercase">
                                        {tipos[i]}
                                    </h3>
                                    <div className="product-card-body table-responsive">
                                        <table className='table combo-table'>
                                            <thead className='thead-dark'>
                                                <tr>
                                                    <th scope='col'>Cod</th>
                                                    <th scope='col'>Nombre</th>
                                                    <th scope='col'>Precio</th>
                                                    <th scope='col'>Descuento</th>
                                                    <th scope='col'>Stock</th>
                                                    <th scope='col'>Add</th> 
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
                                                        <td><a href='#' onClick={(e) => addProdToCombo(e, producto)}>
                                                            <img className='img' src={addButton} alt='*'/>
                                                        </a></td>
                                                    </tr>    
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>   
                        <div className='combo-button'>
                            <Button
                                atr={{text: 'Volver', type: 'button', className: 'btn btn-outline-dark'}}
                                handleClick = {crearCombo}
                            />
                        </div>
                        <br/>
                    </div>
                :
                <div className='combo-container-2'>
                    {/*Pagina Modificar*/} 
                    {modoModificar ?
                        <div className='modificacion'>
                            <div className="card product-card">
                                <div className='card-title  bg-b'>
                                    <h3>Modificar Combo</h3>
                                </div>
                                <div className='card-body product-card-body'>
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Nombre', text2: comboModificado.nombre,
                                            placeholder: comboModificado.nombre, type: 'text', value: comboName
                                        }}
                                        handleChange={ modifNombre } 
                                        param={ modificacion }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Descripcion', text2: comboModificado.descripcion,
                                            placeholder: comboModificado.descripcion, type: 'text', value: comboDescription
                                        }}
                                        handleChange={ modifDescripcion } 
                                        param={ modificacion }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Precio', text2: '$' + comboModificado.precio,
                                            placeholder: comboModificado.precio, type: 'number', value: comboPrice
                                        }}
                                        handleChange={ modifPrice } 
                                        param={ modificacion }
                                    />
                                </div>
                                {modificacion ?
                                    <div className='buttons-container'>
                                        <div className='close-button'>
                                            <Button
                                                atr={{text: 'Confirmar', type: 'button', className: 'btn btn-outline-dark'}}
                                                handleClick = {confirmarEdit}
                                            />
                                        </div>
                                        <div className='close-button'>
                                            <Button
                                                atr={{text: 'Atras', type: 'button', className: 'btn btn-outline-dark'}}
                                                handleClick = {modificar}
                                            />
                                        </div>
                                    </div>
                                :
                                    <div className='buttons-container'>
                                        <div className='close-button'>
                                            <Button
                                                atr={{text: 'Modificar', type: 'button', className: 'btn btn-outline-dark'}}
                                                handleClick = {modificar}
                                            />
                                        </div>
                                        <div className='close-button'>
                                        <Button
                                            atr={{text: 'Volver', type: 'button', className: 'btn btn-outline-dark'}}
                                            handleClick = {editCombo}
                                        />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    :
                    <div className='combo-container-3'>
                        {/*Pagina Principal*/}
                        <div className='combo-button'>
                            <Link to='/admin' className='btn btn-outline-dark'>Volver al Menu de Administracion</Link>
                        </div>
                        <div className='combo-list table-responsive'>
                            <h3 className='combo-title font-weight-bold text-uppercase'>Combos Existentes</h3>
                            <table className='table'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th scope='col'>Cod</th>
                                        <th scope='col'>Nombre</th>
                                        <th scope='col'>Precio</th>
                                        <th scope='col'>Edit</th>
                                        <th scope='col'>Delete</th>
                                    </tr>
                                </thead>
                                {combos.map((combo) =>
                                <tbody key={combo.codigo}> 
                                    <tr>
                                        <th scope='row'>{combo.codigo}</th>
                                        <td>{combo.nombre}</td>
                                        <td>{combo.precio}</td>
                                        <td><a href='#' onClick={(e) => editCombo(e, combo)}>
                                            <img className='img combo-img' src={edit2} alt='...'/>
                                        </a></td>
                                        <td><a href='#' onClick={(e) => delCombo(e, combo.codigo)}>
                                            <img className='img combo-img' src={cancel2} alt='...'/>
                                        </a></td>
                                    </tr>    
                                </tbody>
                                )}
                            </table>
                        </div>
                        <div className='combo-button'>
                            <Button
                                atr={{text: 'Crear Combo', type: 'button', className: 'btn btn-outline-dark'}}
                                handleClick = {crearCombo}
                            />
                        </div>
                        <br/>
                    </div>
                    }
                </div>
                }
            </div>
        </div>
    )
}

export default Combos;