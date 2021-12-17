import './App.css';

//Pages
import HomePage from './Pages/homePage/homePage'
import Login from './Pages/loginPage/login'
import UserPage from './Pages/userPage/userPage'
import ProductPage from './Pages/productPage/productPage'
import CartPage from './Pages/cartPage/cartPage'
import PurchasesPage from './Pages/purchasesPage/purchasesPage'
import ComboPage from './Pages/comboPage/comboPage'
import Users from './Pages/Admin/Users/users'
import Products from './Pages/Admin/Products/products'
import Combos from './Pages/Admin/Combos/combos'
import Menu from './Pages/Admin/Menu/menu'
import Proveedores from './Pages/Admin/Proveedores/proveedores'
import Ventas from './Pages/Admin/Ventas/ventas'
import NotFound from './Pages/notFound/notFound'
import Administradores from './Pages/Admin/Administradores/administradores'
import Roles from './Pages/Admin/Administradores/Roles/roles'
import SuccessPage from './Pages/backUrls/succesPage'
import FailurePage from './Pages/backUrls/failurePage'
import NotifPurchase from './components/NotifPurchase/notifPurchase';


//api de marcado pago
//sweet alert
//cambiar el history
//revisar creaciom de combos

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import {UserContextProvider} from './context/userContext'
import {OptionContextProvider} from './context/optionContext'
import {CompraContextProvider} from './context/compraContext'


function App() {

  return (
    <UserContextProvider>
      <OptionContextProvider>
        <CompraContextProvider>
          <div className="App">
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={HomePage} />
                <Route exact path='/user' component={UserPage}/>
                <Route exact path='/product' component={ProductPage}/>
                <Route path='/cart' component={CartPage}/>
                <Route exact path='/purchases' component={PurchasesPage}/>
                <Route exact path='/notifpurchase/:estadoCompra' component={NotifPurchase}/>
                <Route exact path='/combo' component={ComboPage}/>
                <Route exact path='/admin' component={Menu}/>
                <Route exact path='/admin/users' component={Users}/>
                <Route exact path='/admin/products' component={Products}/>
                <Route exact path='/admin/combos' component={Combos}/>
                <Route exact path='/admin/proveedores' component={Proveedores}/>
                <Route exact path='/admin/ventas' component={Ventas}/>
                <Route exact path='/admin/administradores' component={Administradores}/>
                <Route exact path='/admin/administradores/roles' component={Roles}/>
                <Route path='/success' component={SuccessPage}/>
                <Route path='/failure' component={FailurePage}/>
                <Route path="*" component={NotFound}/>
              </Switch>
            </Router>
          </div>
        </CompraContextProvider>
      </OptionContextProvider>
    </UserContextProvider>
    
  );
}

export default App;
