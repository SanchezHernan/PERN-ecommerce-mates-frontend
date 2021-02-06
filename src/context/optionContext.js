import React, { useState } from 'react';

const OptionContext = React.createContext({})

export function OptionContextProvider ({children}) {
    const [option, setOption] = useState('0');

    return <OptionContext.Provider value={{option, setOption}}>
        {children}
    </OptionContext.Provider>
}

export default OptionContext