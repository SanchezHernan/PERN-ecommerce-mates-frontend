import mate1 from '../../images/mate1.png'
import carrito from '../../images/carrito3.png'
import user from '../../images/user1.png'
import MyForm from '../Form/form'
import './navbar.css'


function NavBar() {
    return (
        
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand navbar-content-1" href="#">
                    <img src={mate1} className="d-inline-block align-top imglad mate" alt="" loading="lazy"/>
                    Remate Amargo
                </a>  
                <div className='navbar-content-2'>
                    <MyForm/>
                </div>
                <a className="navbar-content-3" href="#">
                    <div>
                        <img src={carrito} className="carrito" alt="" loading="lazy"/>
                    </div>
                    <div>
                        <img src={user} className="user" alt="" loading="lazy"/>
                    </div>
                </a>
            </nav>
        
    );
}
  
export default NavBar;