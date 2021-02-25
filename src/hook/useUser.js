import {useCallback, useContext} from 'react';
import Context from '../context/userContext';


export default function useUser () {
    const {
        isLogged,
        setIsLogged,
        email,
        setEmail,
        productosEnCarrito,
        setProductosEnCarrito
    } = useContext(Context)

    const login = useCallback(() => {
        window.sessionStorage.setItem('isLogged', true)
        setIsLogged(true)
    }, [setIsLogged])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('isLogged')
        window.sessionStorage.removeItem('userEmail')
        window.sessionStorage.removeItem('carrito')
        window.sessionStorage.removeItem('prodId')
        setIsLogged(false)
    }, [setIsLogged])

    const setUserEmail = (email) => {
        window.sessionStorage.setItem('userEmail', email)
        setEmail(email);
    }

    const guardarEnCarrito = (producto) => {
        let nuevosProductos;
        
        if (productosEnCarrito){
            nuevosProductos = productosEnCarrito.concat(producto)
        }   else {
            nuevosProductos = []
            nuevosProductos.concat(producto)
        }
        window.sessionStorage.setItem('carrito', nuevosProductos)
        setProductosEnCarrito(nuevosProductos)
    }

    return {
        isLogged,
        email,
        login,
        logout,
        setUserEmail,
        productosEnCarrito,
        guardarEnCarrito
    }
}