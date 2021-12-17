import React, { useState } from 'react';

const CompraContext = React.createContext({})

export function CompraContextProvider ({children}) {
    const [compraActual, setCompraActual] = useState(() => window.localStorage.getItem('compraActual'))
    
    return <CompraContext.Provider value={{
            compraActual, setCompraActual
        }}>
        {children}
    </CompraContext.Provider>
}

export default CompraContext