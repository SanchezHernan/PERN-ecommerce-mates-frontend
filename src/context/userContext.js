import React, { useState } from 'react';

const Context = React.createContext({})

export function userContextProvider ({children}) {
    const [jw, setJWT] = useState(null)

    return <Context.Provider value={{jwt, setJWT}}>
        {children}
    </Context.Provider>
}

export default Context