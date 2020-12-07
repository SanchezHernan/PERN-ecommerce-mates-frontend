import './menu.css'

function Menu() {
    return (
        <nav className="menuNav navbar navbar-dark bg-dark">
             <a className="nav-link" href="#">Ofertas</a>
             <a className="nav-link" href="#">Novedades</a>
             <a className="nav-link" href="#">Combos</a>
        </nav>
        
    );
}
  
export default Menu;