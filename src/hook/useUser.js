import {useCallback, useContext} from 'react';
import Context from '../context/userContext';

export default function useUser () {
    const {
        isLogged,
        setIsLogged,
        email,
        setEmail,
        adminEmail,
        setAdminEmail,
        adminRol,
        setAdminRol
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
        window.sessionStorage.removeItem('adminEmail')
        window.sessionStorage.removeItem('adminRol')
        setIsLogged(false)
    }, [setIsLogged])

    const setUserEmail = (email) => {
        window.sessionStorage.setItem('userEmail', email)
        setEmail(email);
    }

    const setAdminInfo = (email, rol) => {
        window.sessionStorage.setItem('adminEmail', email)
        window.sessionStorage.setItem('adminRol', rol)
        setAdminEmail(email)
        setAdminRol(rol);
    }

    return {
        isLogged,
        email,
        login,
        logout,
        setUserEmail,
        adminEmail,
        adminRol,
        setAdminInfo
    }
}