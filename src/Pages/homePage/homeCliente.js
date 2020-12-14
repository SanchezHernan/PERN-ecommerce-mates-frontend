import NavBar from '../../components/NavBar/navbar'
import Menu from '../../components/NavBar/menu';
import Card from '../../components/Card/card'
import mate from '../../images/mate1.png';
import lupa from '../../images/navIconSearch.png';
import Side from '../../components/Side/side';
import './homeCliente.css'

const HomeCliente = () => {
    return(
        <div className="Home">
        <NavBar/>
        
        
        <div className="row">
          <div className="side">
            <Side/>
          </div>
          
          <div className="main">
            <Menu/>
            <div className="ofertas">
              <Card className="oferta"
                img={lupa}
              />
              <Card className="oferta"
                img={mate}
              />
            </div>
          </div>  
        </div>
      </div>


    )
}

export default HomeCliente;