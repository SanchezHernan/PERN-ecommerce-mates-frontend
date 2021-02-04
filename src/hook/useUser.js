import {useCallback, useContext} from 'react';
import Context from '../context/userContext';


export default function useUser () {
    const {isLogged, setIsLogged} = useContext(Context)

    const login = useCallback(() => {
        window.sessionStorage.setItem('isLogged', true)
        setIsLogged(true)
    }, [setIsLogged])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('isLogged')
        setIsLogged(false)
    }, [setIsLogged])

    return {
        isLogged,
        login,
        logout
    }
}