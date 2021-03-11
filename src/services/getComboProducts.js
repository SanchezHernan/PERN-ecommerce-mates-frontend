import { API_URL } from "./settings";

export default async function getComboProducts(comboId) {
    const response = await fetch(`${API_URL}/combo/productos/${comboId}`)
    const jsonData = await response.json(); 
    return(jsonData);
}