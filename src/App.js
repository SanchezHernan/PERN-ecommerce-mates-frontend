import './App.css';
import NavBar from './components/NavBar/navbar';
import Menu from './components/NavBar/menu'
import Card from './components/Card/card'
import mate from './images/mate1.png'
import lupa from './images/navIconSearch.png'



function App() {
  return (
    
    <div className="App">
      <NavBar/>
      
      
      <div className="row">
        <div className="side">
          <h3>Articulos</h3>
          <h5>Filtros</h5>
          <p>Some text</p>
          <p>Some text</p>
          <p>Some text</p>
          <h3>More Text</h3>
          <p>Lorem ipsum dolor sit ame.</p>
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
  );
}

export default App;
