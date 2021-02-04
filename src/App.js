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
import ProtectedRoute from "./components/ProtectedRoutes/protectedRoute";
import Secret from "./Pages/secret/secret";




function App() {

  return (
    <UserContextProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login}>
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
    </UserContextProvider>
    
  );
}

export default App;
