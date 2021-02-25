import React, { useState } from 'react';

const OptionContext = React.createContext({})

export function OptionContextProvider ({children}) {
    const [option, setOption] = useState('0');
    const [orden, setOrden] = useState('0');
    const [prodId, setProdId] = useState(() => window.sessionStorage.getItem('prodId'));

    return <OptionContext.Provider value={{
        option,
        setOption,
        orden,
        setOrden,
        prodId,
        setProdId,
    }}>
        {children}
    </OptionContext.Provider>
}

export default OptionContext