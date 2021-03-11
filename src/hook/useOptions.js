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
        combo,
        setCombo
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

    const isCombo = (isCombo) => {
        window.sessionStorage.setItem('isCombo', isCombo)
        setCombo(isCombo);
    }

    return {
        option,
        marcar,
        orden,
        establecerOrden,
        prodId,
        changeProdId,
        cleanProd,
        combo,
        isCombo
    }
}