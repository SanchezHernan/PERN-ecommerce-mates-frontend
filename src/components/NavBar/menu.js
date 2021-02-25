import useOptions from '../../hook/useOptions'
import './menu.css'


function Menu() {

    const{marcar} = useOptions();

    const handleClick = () => {
        marcar('0');
    }

    return (
        <nav className="menuNav navbar navbar-dark bg-dark">
             <a className="nav-link" href="#" onClick={handleClick}>Ofertas</a>
             <a className="nav-link" href="#">Novedades</a>
             <a className="nav-link" href="#">Combos</a>
        </nav>
        
    );
}
  
export default Menu;