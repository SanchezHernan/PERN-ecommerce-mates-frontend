import NavBar from '../../components/NavBar/navbar'
import useUser from '../../hook/useUser'
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input'

import userImg from '../../images/user2.png'
import './userPage.css'
import getUser from '../../services/getUser';
import Button from '../../components/Button/button';

const UserPage = () => {

    const [usuario, setUsuario] = useState(null);
    const {isLogged, email} = useUser();
    const history = useHistory();
    const [showEdit, setShowEdit] = useState(false);

    const editarPerfil = () => {
        if (showEdit) setShowEdit(false)
        else setShowEdit(true)
    }

    const guardarCambios = () => {
        console.log('cambios guardados');
    }

    const handleChange = () => {
        console.log('hola');
    }
    useEffect(() => {
        console.log('push')
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])


    useEffect(() => {
        const fetchData = async () => {
            console.log({email});
            const response = await getUser({email})
            setUsuario(response);
        }
        fetchData();
    }, [email])

     
    return(
        <div>
            <NavBar/>
            <div className='userPage'>
                <div>
                    <img src={userImg} className="userImg" alt="" loading="lazy"/>
                </div>
                <div className='userPageContent'>
                    {   usuario &&
                        <div className='userPageContent2'>
                            <h3>Informacion de {usuario.nombreuser}</h3>
                                <div className='userInfo'>
                                <div className='userInfoContent1'>
                                    <p>Nombre: </p>
                                    <p>Apellido: </p>
                                    <p>e-mail: </p>
                                    <p>Ciudad: </p>
                                    <p>Direccion: </p>
                                    <p>Telefono: </p>
                                    {/*showEdit &&
                                    <Input
                                        id={'1'}
                                        type={'text'}
                                        className={'editInput'}
                                        placeholder={usuario.nombre}
                                        onChange={ (e) => handleChange(e.target.id, e.target.value) }
                                    />*/}
                                </div>
                                {showEdit ?
                                <div className='userInfoContent2'>
                                    <p>{usuario.nombre}</p> 
                                    <p>{usuario.apellido} </p>
                                    <p>{usuario.email}</p>
                                    <p>{usuario.ciudad}</p>
                                    <p>{usuario.direccion}</p>
                                    <p>{usuario.telefono}</p>
                                </div>
                                :
                                <div className='userInfoContent3'>
                                    <Input 
                                        atribute={{
                                        id: '1',
                                        type: 'text',
                                        className: 'editInput',
                                        placeholder: usuario.nombre,
                                        }}
                                        handleChange={ handleChange }
                                    />
                                    <Input 
                                        atribute={{
                                        id: '2',
                                        type: 'text',
                                        className: 'editInput',
                                        placeholder: usuario.apellido,
                                        }}
                                        handleChange={ handleChange }
                                    />
                                    <Input 
                                        atribute={{
                                        id: '3',
                                        type: 'text',
                                        className: 'editInput',
                                        placeholder: usuario.email,
                                        }}
                                        handleChange={ handleChange }
                                    />
                                    <Input 
                                        atribute={{
                                        id: '4',
                                        type: 'text',
                                        className: 'editInput',
                                        placeholder: usuario.ciudad,
                                        }}
                                        handleChange={ handleChange }
                                    />
                                    <Input 
                                        atribute={{
                                        id: '5',
                                        type: 'text',
                                        className: 'editInput',
                                        placeholder: usuario.direccion,
                                        }}
                                        handleChange={ handleChange }
                                    />
                                    <Input 
                                        atribute={{
                                        id: '6',
                                        type: 'text',
                                        className: 'editInput',
                                        placeholder: usuario.telefono,
                                        }}
                                        handleChange={ handleChange }
                                    />
                                </div>
                                }
                            </div>
                        </div>
                    }
                    <div className='buttons'>
                        <div className='button'>
                            <Button 
                                atr={{
                                    text: 'Editar Perfil',
                                    type: 'button'
                                }}
                                handleClick = { editarPerfil }
                            />
                        </div>
                        {!showEdit &&
                        <div className='button'>
                            <Button 
                            atr={{
                                text: 'Guardar Cambios',
                                type: 'button'
                            }}
                            handleClick = { guardarCambios }
                            />
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        
    )
}


export default UserPage;
