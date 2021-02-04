import React, { useState } from 'react';

const Context = React.createContext({})

export function UserContextProvider ({children}) {
    const [isLogged, setIsLogged] = useState(() => window.sessionStorage.getItem('isLogged'))

    return <Context.Provider value={{isLogged, setIsLogged}}>
        {children}
    </Context.Provider>
}

export default Context