import mate1 from '../../images/mate1.png'
import carrito from '../../images/carrito3.png'
import user from '../../images/user2.png'
import MyForm from '../Form/form'
import './navbar.css'

function NavBar() {
    return (
        
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand nombre" href="#">
                    <img src={mate1} class="d-inline-block align-top imglad" width="32" height="32" alt="" loading="lazy"/>
                    Remate Amargo
                </a>  
              
                <MyForm/>
                <a className="navbar-brand nombre" href="#">
                    <img src={carrito} className="carrito" width="40" height="37" alt="" loading="lazy"/>
                  
                    <img src={user} className="user" width="32" height="32" alt="" loading="lazy"/>
                </a>
            </nav>
        
    );
}
  
export default NavBar;