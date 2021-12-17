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
<<<<<<< HEAD
        window.sessionStorage.setItem('prodId', id)
=======
        window.localStorage.setItem('prodId', id)
>>>>>>> f4529ec (entrega)
        setProdId(id);
    }

    const cleanProd = () => {
<<<<<<< HEAD
        window.sessionStorage.removeItem('prodId');
=======
        window.localStorage.removeItem('prodId');
>>>>>>> f4529ec (entrega)
        setProdId(0);
    }

    const changeComboId = (id) => {
<<<<<<< HEAD
        window.sessionStorage.setItem('comboId', id)
=======
        window.localStorage.setItem('comboId', id)
>>>>>>> f4529ec (entrega)
        setComboId(id);
    }

    const searchText = (text) => {
<<<<<<< HEAD
        window.sessionStorage.setItem('search', text)
=======
        window.localStorage.setItem('search', text)
>>>>>>> f4529ec (entrega)
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