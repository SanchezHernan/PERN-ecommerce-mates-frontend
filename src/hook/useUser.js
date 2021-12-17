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
<<<<<<< HEAD
        window.sessionStorage.setItem('isLogged', true)
=======
        window.localStorage.setItem('isLogged', true)
>>>>>>> f4529ec (entrega)
        setIsLogged(true)
    }, [setIsLogged])

    const logout = useCallback(() => {
<<<<<<< HEAD
        window.sessionStorage.removeItem('isLogged')
        window.sessionStorage.removeItem('userEmail')
        window.sessionStorage.removeItem('carrito')
        window.sessionStorage.removeItem('prodId')
        window.sessionStorage.removeItem('adminEmail')
        window.sessionStorage.removeItem('adminRol')
=======
        window.localStorage.removeItem('isLogged')
        window.localStorage.removeItem('userEmail')
        window.localStorage.removeItem('carrito')
        window.localStorage.removeItem('prodId')
        window.localStorage.removeItem('adminEmail')
        window.localStorage.removeItem('adminRol')
        window.localStorage.removeItem('compraActual')
>>>>>>> f4529ec (entrega)
        setIsLogged(false)
    }, [setIsLogged])

    const setUserEmail = (email) => {
<<<<<<< HEAD
        window.sessionStorage.setItem('userEmail', email)
=======
        window.localStorage.setItem('userEmail', email)
>>>>>>> f4529ec (entrega)
        setEmail(email);
    }

    const setAdminInfo = (email, rol) => {
<<<<<<< HEAD
        window.sessionStorage.setItem('adminEmail', email)
        window.sessionStorage.setItem('adminRol', rol)
=======
        window.localStorage.setItem('adminEmail', email)
        window.localStorage.setItem('adminRol', rol)
>>>>>>> f4529ec (entrega)
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