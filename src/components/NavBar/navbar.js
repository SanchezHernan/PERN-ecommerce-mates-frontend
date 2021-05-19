import mateImg from '../../images/mate1.png'
import carritoImg from '../../images/carrito3.png'
import userImg from '../../images/user1.png'
import MyForm from '../Form/form'
import './navbar.css'
import { useState } from 'react'
import useUser from '../../hook/useUser'
import { Link, useLocation } from 'react-router-dom'


function NavBar() {

    const [show, setShow] = useState(false);
    const {logout} = useUser();
    const location = useLocation()


    const myFunction = () => setShow(true);
    
    const myOtherFunction = () => setShow(false)
    

    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand navbar-content-1" to="/home">
                <img src={mateImg} className="d-inline-block align-top imglad mate" alt="" loading="lazy"/>
                Remate Amargo
            </Link>  
            {location.pathname === '/home' &&
            <div className='navbar-content-2'>
                <MyForm/>
            </div>
            }
            <div className="navbar-content-3" href="#">
                <Link to='/cart' >
                    <img src={carritoImg} className="carrito" alt="" loading="lazy"/>
                </Link>
                
                <div className='dropdown' onMouseEnter={myFunction} onMouseLeave={myOtherFunction}>
                    <img src={userImg} className="user" alt="" loading="lazy"/>
                    {show && 
                        <div id='myDropdown' className='dropdown-content'>
                            <Link to='/user' >Usuario</Link>
                            <Link to='/purchases'>Mis Compras</Link>
                            <a className='logout' href='#' onClick={logout}>Log out</a>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
}
  
export default NavBar;