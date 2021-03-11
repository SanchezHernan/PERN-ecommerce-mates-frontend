export default function useDescuento() {
    const calcularDescuento = (p) => {
        const prod = p;
        if (p.porcdescuento !== 0){
          prod.porcdescuento = (p.precio - (p.precio * p.porcdescuento / 100));
        }
        return prod;
    }

    return {calcularDescuento}
}
