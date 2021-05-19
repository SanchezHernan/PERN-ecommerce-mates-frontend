import {API_URL} from './settings'

export default async function getProductsTipe(tipo) {
    const response = await fetch(`${API_URL}/productos/${tipo}`)
    const jsonData = await response.json();
    return jsonData;
}