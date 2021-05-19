import React, { useState } from 'react';

const OptionContext = React.createContext({})

export function OptionContextProvider ({children}) {
    const [option, setOption] = useState('0');
    const [orden, setOrden] = useState('0');
    const [prodId, setProdId] = useState(() => window.sessionStorage.getItem('prodId'));
    const [comboId, setComboId] = useState(() => window.sessionStorage.getItem('comboId'));
    const [search, setSearch] = useState(() => window.sessionStorage.getItem('search'));
    
    return <OptionContext.Provider value={{
        option,
        setOption,
        orden,
        setOrden,
        prodId,
        setProdId,
        comboId,
        setComboId,
        search,
        setSearch
    }}>
        {children}
    </OptionContext.Provider>
}

export default OptionContext