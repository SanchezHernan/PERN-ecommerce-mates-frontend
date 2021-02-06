import './App.css';
import HomeCliente from './Pages/homePage/homeCliente'
import Login from './Pages/loginPage/login'

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
            <Route path="/" exact component={Login}>
            </Route>
            <Route exact path='/home' component={ HomeCliente } />
            <Route path="*">
              <div>404 Not found </div>
            </Route>
          </Switch>
        </Router>
      </div>
      </OptionContextProvider>
    </UserContextProvider>
    
  );
}

export default App;
