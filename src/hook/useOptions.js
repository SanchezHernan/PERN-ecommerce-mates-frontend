import { useContext } from 'react';
import OptionContext from '../context/optionContext';


export default function useOptions () {
    const {
        option,
        setOption,
        orden,
        setOrden,
        prodId,
        setProdId,
        comboId,
        setComboId,
        search,
        setSearch,
    } = useContext(OptionContext);

    const marcar = (value) => {
        setOption(value);
    }

    const establecerOrden = (value) => {
        setOrden(value);
    }

    const changeProdId = (id) => {
        window.sessionStorage.setItem('prodId', id)
        setProdId(id);
    }

    const cleanProd = () => {
        window.sessionStorage.removeItem('prodId');
        setProdId(0);
    }

    const changeComboId = (id) => {
        window.sessionStorage.setItem('comboId', id)
        setComboId(id);
    }

    const searchText = (text) => {
        window.sessionStorage.setItem('search', text)
        setSearch(text);
    }

    return {
        option,
        marcar,
        orden,
        establecerOrden,
        prodId,
        changeProdId,
        cleanProd,
        comboId,
        changeComboId,
        search,
        searchText
    }
}