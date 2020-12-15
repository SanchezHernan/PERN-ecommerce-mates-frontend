import mate1 from '../../images/mate1.png'
import carrito from '../../images/carrito3.png'
import user from '../../images/user1.png'
import MyForm from '../Form/form'
import './navbar.css'

function NavBar() {
    return (
        
            <nav className="navegbar navbar-dark bg-dark">
                <div className='navbar-content-1'>
                    <a className="nombre" href="#">
                        <img src={mate1} className="mate d-inline-block align-top imglad" alt="" loading="lazy"/>
                        Remate Amargo
                    </a>  
                </div>
                <div className='navbar-content-2'>
                    <MyForm/>
                </div>
                <div className='navbar-content-3'>
                    <a className="carrito-user" href="#">
                        <img src={carrito} className="carrito" alt="" loading="lazy"/>
                    
                        <img src={user} className="user" alt="" loading="lazy"/>
                    </a>
                </div>
            </nav>
        
    );
}
  
export default NavBar;