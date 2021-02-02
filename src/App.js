import './App.css';
import HomeCliente from './Pages/homePage/homeCliente'
import Login from './Pages/loginPage/login'

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";

import {userContextProvider} from './context/userContext';
import ProtectedRoute from "./components/ProtectedRoutes/protectedRoute";
import Secret from "./Pages/secret/secret";




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <userContextProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login}>
              {isAuthenticated && 
                <Redirect to="/secret" />
              }
            </Route>
            <ProtectedRoute
              exact
              path="/secret"
              component={Secret}
            />
            <Route exact path='/home' component={ HomeCliente } />
            <Route path="*">
              <div>404 Not found </div>
            </Route>
          </Switch>
        </Router>
      </div>
    </userContextProvider>
    
  );
}

export default App;
