import './App.css';
import NavBar from './components/NavBar/navbar';
import Menu from './components/NavBar/menu'
import Card from './components/Card/card'
import mate from './images/mate1.png'
import lupa from './images/navIconSearch.png'
import Side from './components/Side/side'


function App() {
  return (
    
    <div className="App">
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
  );
}

export default App;
