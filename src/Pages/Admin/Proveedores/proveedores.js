import { useEffect, useLayoutEffect, useState } from "react"
import { useHistory } from "react-router"
import { toast } from "react-toastify"
import useUser from "../../../hook/useUser"
import NavBar from '../../../components/NavBar/navbar'
import Button from '../../../components/Button/button'
import EditableLine from '../../../components/EditableLine/editableLine'
import { getProveedores, getProveedoresActivos } from '../../../services/getServices'
import { putProveedor } from '../../../services/putServices'
import { postProveedor } from '../../../services/postCombo'
import { deleteProveedor } from '../../../services/deleteServices'
import editImg from '../../../images/edit2.png'
import cancelImg from '../../../images/cancel2.png'

import './proveedores.css'
import 'react-toastify/dist/ReactToastify.css'


toast.configure({
  theme: 'dark',
  pauseOnHover: true,
  draggable: true
})



const Proveedores = () => {

    const {isLogged, adminEmail} = useUser()
    const history = useHistory()
    const [proveedores, setProveedores] = useState([])
    const [actualizado, setActualizado] = useState(0)
    const [proveedoresActivos, setProveedoresActivos] = useState([])

    //modif
    const [modifParam, setModifParam] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [proveedorAEditar, setProveedorAEditar] = useState(null)
    const [nombreEdit, setNombreEdit] = useState('')
    const [emailEdit, setEmailEdit] = useState('')
    const [telefonoEdit, setTelefonoEdit] = useState('')
    const [ciudadEdit, setCiudadEdit] = useState('')
    const [direccionEdit, setDireccionEdit] = useState('')

    //nuevo proveedor
    const [cuitNew, setCuitNew] = useState('')
    const [createMode, setCreateMode] = useState(false)
    


    const goToAdminMenu = () => history.push('/admin')
    

    const deleteProv = (proveedor) => {
        let eliminate = false
        proveedoresActivos.map((ca) => {
            if (ca.cuit === proveedor.cuit) eliminate = true
        })
        console.log(eliminate);
        /*
        const r = window.confirm("Desea eliminar a este proveedor de la lista?")
        if (r) {
            deleteProveedor(proveedor.cuit)
            const newProvs = proveedores.filter(prove => prove.cuit != proveedor.cuit)
            setProveedores(newProvs)
            setActualizado(actualizado+1)
        }*/
    }

    //Edicion
    const changeToEditMode = (proveedor) => {
        setEditMode(true)
        setProveedorAEditar(proveedor)
        setNombreEdit(proveedor.nombre)
        setEmailEdit(proveedor.email)
        setTelefonoEdit(proveedor.telefono)
        setCiudadEdit(proveedor.ciudad)
        setDireccionEdit(proveedor.direccion)
    }

    const changeParam = () => setModifParam(!modifParam)

    const handleNombre = (value) => setNombreEdit(value)

    const handleEmail = (value) => setEmailEdit(value)
    
    const handleTelefono = (value) => setTelefonoEdit(value)
    
    const handleCiudad = (value) => setCiudadEdit(value)
    
    const handleDireccion = (value) => setDireccionEdit(value)
    
    const cerrar = () =>  setEditMode(false)

    const confirmar = () => {
        if (nombreEdit.length > 0 && emailEdit.length > 0 && telefonoEdit.length > 0
            && ciudadEdit.length > 0 && direccionEdit.length > 0){
            putProveedor(proveedorAEditar.cuit, nombreEdit, emailEdit, telefonoEdit, ciudadEdit, direccionEdit)
            setActualizado(actualizado+1)
            toast.success('Datos Actualizados Correctamente')
            setEditMode(false)
        }
        else
            toast.warn('Datos Faltantes')
    }


    //Crear Proveedor
    const changeToCreateMode = () => {
        setCuitNew('')
        setNombreEdit('')
        setEmailEdit('')
        setTelefonoEdit('')
        setCiudadEdit('')
        setDireccionEdit('')
        setCreateMode(true)
    }

    const handleCuit = (value) => setCuitNew(value)

    const confirmarNuevoProv = () => {
        if (nombreEdit.length > 0 && emailEdit.length > 0 && telefonoEdit.length > 0 &&
            ciudadEdit.length > 0 && direccionEdit.length > 0 && cuitNew.length > 0){
            postProveedor(cuitNew, nombreEdit, emailEdit, telefonoEdit, ciudadEdit, direccionEdit)
            setActualizado(actualizado+1)
            toast.success('Datos Actualizados Correctamente')
            setCreateMode(false)
        }
        else
            toast.warn('Datos Faltantes')
    }

    const exitCreateMode = () => setCreateMode(false)


    useEffect(() => {
        if (!isLogged)
            history.push('/')
        if (!adminEmail)
            history.push('/home')
    }, [isLogged, history, adminEmail])

    useEffect(() => {
        const fetchData = async () => {
            const resp = await getProveedores()
            setProveedores(resp)
            const resp2 = await getProveedoresActivos()
            setProveedoresActivos(resp2)
        }
        fetchData() 
    }, [actualizado]);

    return(
        <div className='proveedores-container'>
            <NavBar />
            <div className='proveedores-body'>
                {!createMode && !editMode ?
                    <div className='prov-main-mode'>
                        <h3 className='proveedores-title'>Proveedores</h3>
                        <div className='prov-table table-responsive'>
                            <table className='table'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th scope='col'>Nombre</th>
                                        <th scope='col'>email</th>
                                        <th scope='col'>Telefono</th>
                                        <th scope='col'>Ciudad</th>
                                        <th scope='col'>Direccion</th>
                                        <th scope='col'>Edit</th>
                                        <th scope='col'>Del</th>
                                    </tr>
                                </thead>
                                {proveedores.map((proveedor) =>
                                    <tbody key={`"${proveedor.cuit}l"`}> 
                                        <tr>
                                            <td>{proveedor.nombre}</td>
                                            <td>{proveedor.email}</td>
                                            <td>{proveedor.telefono}</td>
                                            <td>{proveedor.ciudad}</td>
                                            <td>{proveedor.direccion}</td>
                                            <td><a href='#' onClick={() => changeToEditMode(proveedor)}>
                                                <img className='img' src={editImg} alt='...'/>
                                            </a></td>
                                            <td><a href='#' onClick={() => deleteProv(proveedor)}>
                                                <img className='img' src={cancelImg} alt='...'/>
                                            </a></td>
                                        </tr>    
                                    </tbody>
                                )}
                            </table>
                        </div>
                        <div className='prov-button-container'>
                            <div className='button-back'>
                                <button type='button' className='btn btn-outline-dark' onClick={goToAdminMenu}>&laquo; Menu de Administracion</button>
                            </div>
                            <div className='button-back'>
                                <Button
                                    atr={{ 
                                        className: 'btn btn-outline-dark',
                                        text: 'Agregar Nuevo Proveedor', 
                                        type: 'button' 
                                    }}
                                    handleClick={ changeToCreateMode }
                                />
                            </div>
                        </div>
                    </div>
                    :
                    <div className='prov-not-main-mode'>
                        {editMode ?
                            <div className='prov-edit-mode'>
                                <div className='card-title  bg-b'>
                                    <h3>Editar Proveedor</h3>
                                </div>
                                <div className='card-body prov-card-body'>
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Nombre', text2: proveedorAEditar.nombre,
                                            placeholder: proveedorAEditar.nombre, type: 'text', value: nombreEdit
                                        }}
                                        handleChange={ handleNombre } 
                                        param={ modifParam }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'email', text2: proveedorAEditar.email,
                                            placeholder: proveedorAEditar.email, type: 'text', value: emailEdit
                                        }}
                                        handleChange={ handleEmail } 
                                        param={ modifParam }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Telefono', text2: proveedorAEditar.telefono,
                                            placeholder: proveedorAEditar.telefono, type: 'text', value: telefonoEdit
                                        }}
                                        handleChange={ handleTelefono } 
                                        param={ modifParam }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Ciudad', text2: proveedorAEditar.ciudad,
                                            placeholder: proveedorAEditar.ciudad, type: 'text', value: ciudadEdit
                                        }}
                                        handleChange={ handleCiudad } 
                                        param={ modifParam }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Direccion', text2: proveedorAEditar.direccion,
                                            placeholder: proveedorAEditar.direccion, type: 'text', value: direccionEdit
                                        }}
                                        handleChange={ handleDireccion } 
                                        param={ modifParam }
                                    />
                                    {modifParam ?
                                        <div className='buttons-container'>
                                            <div className='close-button'>
                                                <Button
                                                    atr={{text: 'Confirmar', type: 'button', className: 'black-button'}}
                                                    handleClick = {confirmar}
                                                />
                                            </div>
                                            <div className='close-button'>
                                                <Button
                                                    atr={{text: 'Atras', type: 'button', className: 'black-button'}}
                                                    handleClick = {changeParam}
                                                />
                                            </div>
                                        </div>
                                    :
                                        <div className='buttons-container'>
                                            <div className='close-button'>
                                                <Button
                                                    atr={{text: 'Editar', type: 'button', className: 'black-button'}}
                                                    handleClick = {changeParam}
                                                />
                                            </div>
                                            <div className='close-button'>
                                                <Button
                                                    atr={{text: 'Cerrar', type: 'button', className: 'black-button'}}
                                                    handleClick = {cerrar}
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            :
                            <div className='prov-create-mode'>
                                <div className='card-title  bg-b'>
                                    <h3>Agregar Nuevo Proveedor</h3>
                                </div>
                                <div className='card-body prov-card-body'>
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Cuit', text2: 'Cuit',
                                            placeholder: 'Cuit', type: 'text', value: cuitNew
                                        }}
                                        handleChange={ handleCuit } 
                                        param={ true }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Nombre', text2: 'Nombre',
                                            placeholder: 'Nombre', type: 'text', value: nombreEdit
                                        }}
                                        handleChange={ handleNombre } 
                                        param={ true }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'email', text2: 'email',
                                            placeholder: 'email', type: 'text', value: emailEdit
                                        }}
                                        handleChange={ handleEmail } 
                                        param={ true }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Telefono', text2: 'Telefono',
                                            placeholder: 'Telefono', type: 'text', value: telefonoEdit
                                        }}
                                        handleChange={ handleTelefono } 
                                        param={ true }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Ciudad', text2: 'ciudad',
                                            placeholder: 'Ciudad', type: 'text', value: ciudadEdit
                                        }}
                                        handleChange={ handleCiudad } 
                                        param={ true }
                                    />
                                    <EditableLine
                                        atr={{
                                            className: 'card-item', text1: 'Direccion', text2: 'direccion',
                                            placeholder: 'Direccion', type: 'text', value: direccionEdit
                                        }}
                                        handleChange={ handleDireccion } 
                                        param={ true }
                                    />
                                    <div className='buttons-container'>
                                        <div className='close-button'>
                                            <Button
                                                atr={{text: 'Confirmar', type: 'button', className: 'black-button'}}
                                                handleClick = {confirmarNuevoProv}
                                            />
                                        </div>
                                        <div className='close-button'>
                                            <Button
                                                atr={{text: 'Atras', type: 'button', className: 'black-button'}}
                                                handleClick = {exitCreateMode}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Proveedores