import { useContext} from 'react';
import CompraContext from '../context/compraContext';

export default function useCompra () {
    const {
        compraActual, setCompraActual
    } = useContext(CompraContext)


    const setCompra = (compra) => {
        window.localStorage.setItem('compraActual', compra)
        setCompraActual(compra)
    }

    const deleteCompra = () => {
        window.localStorage.removeItem('compraActual')
        setCompraActual('')
    }

    return {
        compraActual,
        setCompra,
        deleteCompra,
    }
}