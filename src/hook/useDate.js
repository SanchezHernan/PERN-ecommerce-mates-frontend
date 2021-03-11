export default function useDescuento() {

    const today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

    return {date, time}
}


