import './App.css';
import HomeCliente from './Pages/homePage/homeCliente'
import Login from './Pages/loginPage/login'
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
      <Route path='/home' component={ HomeCliente } />
      <Route path='/' component={ Login } />
    </BrowserRouter>

    
  );
}

export default App;
