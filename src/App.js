import './App.css';

//Pages
import HomePage from './Pages/homePage/homePage'
import Login from './Pages/loginPage/login'
import UserPage from './Pages/userPage/userPage'
import ProductPage from './Pages/productPage/productPage'
import CartPage from './Pages/cartPage/cartPage'

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import {UserContextProvider} from './context/userContext';
import {OptionContextProvider} from './context/optionContext'


function App() {

  return (
    <UserContextProvider>
      <OptionContextProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/user' component={UserPage}/>
            <Route exact path='/product' component={ProductPage}/>
            <Route exact path='/cart' component={CartPage}/>
            <Route path="*"><div>404 Not found </div></Route>
          </Switch>
        </Router>
      </div>
      </OptionContextProvider>
    </UserContextProvider>
    
  );
}

export default App;
