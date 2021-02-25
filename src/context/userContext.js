import React, { useState } from 'react';

const Context = React.createContext({})

export function UserContextProvider ({children}) {
    const [isLogged, setIsLogged] = useState(() => window.sessionStorage.getItem('isLogged'))
    const [email, setEmail] = useState(() => window.sessionStorage.getItem('userEmail'))
    const [productosEnCarrito, setProductosEnCarrito] = useState(() => window.sessionStorage.getItem('carrito')) 

    return <Context.Provider value={{
            isLogged,
            setIsLogged, 
            email,
            setEmail,
            productosEnCarrito,
            setProductosEnCarrito
        }}>
        {children}
    </Context.Provider>
}

export default Context