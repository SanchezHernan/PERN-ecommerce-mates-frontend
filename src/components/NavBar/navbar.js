import mate1 from '../../images/mate1.png'
import carrito from '../../images/carrito3.png'
import user from '../../images/user1.png'
import MyForm from '../Form/form'
import './navbar.css'

function NavBar() {
    return (
        
<<<<<<< HEAD
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand nombre" href="#">
                    <img src={mate1} className="d-inline-block align-top imglad" width="32" height="32" alt="" loading="lazy"/>
                    Remate Amargo
                </a>  
              
                <MyForm/>
                <a className="navbar-brand nombre" href="#">
                    <img src={carrito} className="carrito" width="40" height="37" alt="" loading="lazy"/>
                  
                    <img src={user} className="user" width="32" height="32" alt="" loading="lazy"/>
                </a>
=======
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
>>>>>>> refs/remotes/origin/master
            </nav>
        
    );
}
  
export default NavBar;