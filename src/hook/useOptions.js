import { useContext } from 'react';
import OptionContext from '../context/optionContext';


export default function useOptions () {
    const {option, setOption} = useContext(OptionContext);

    const marcar = (value) => {
        setOption(value);
    }

    return {
        option,
        marcar
    }
}