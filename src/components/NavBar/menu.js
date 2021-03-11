import useOptions from '../../hook/useOptions'
import './menu.css'
import getCombos from '../../services/getCombos'
import { useState } from 'react';


function Menu() {

    const{marcar} = useOptions();

    const handleOfertas = () => {
        marcar('0');
    }

    const handleCombos = () => {
        marcar('5')
    }

    return (
        <nav className="menuNav navbar navbar-dark bg-dark">
             <a className="nav-link" href="#" onClick={handleOfertas}>Ofertas</a>
             <a className="nav-link" href="#">Novedades</a>
             <a className="nav-link" href="#" onClick={handleCombos}>Combos</a>
        </nav>
        
    );
}
  
export default Menu;