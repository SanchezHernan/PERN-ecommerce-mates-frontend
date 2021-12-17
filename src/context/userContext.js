import React, { useState } from 'react';

const Context = React.createContext({})

export function UserContextProvider ({children}) {
<<<<<<< HEAD
    const [isLogged, setIsLogged] = useState(() => window.sessionStorage.getItem('isLogged'))
    const [email, setEmail] = useState(() => window.sessionStorage.getItem('userEmail'))
    const [adminEmail, setAdminEmail] = useState(() => window.sessionStorage.getItem('adminEmail'))
    const [adminRol, setAdminRol] = useState(() => window.sessionStorage.getItem('adminRol'))
=======
    const [isLogged, setIsLogged] = useState(() => window.localStorage.getItem('isLogged'))
    const [email, setEmail] = useState(() => window.localStorage.getItem('userEmail'))
    const [adminEmail, setAdminEmail] = useState(() => window.localStorage.getItem('adminEmail'))
    const [adminRol, setAdminRol] = useState(() => window.localStorage.getItem('adminRol'))
>>>>>>> f4529ec (entrega)

    return <Context.Provider value={{
            isLogged,
            setIsLogged, 
            email,
            setEmail,
            adminEmail,
            setAdminEmail,
            adminRol,
            setAdminRol
        }}>
        {children}
    </Context.Provider>
}

export default Context