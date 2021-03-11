import { API_URL } from "./settings";

export default async function getComboStock(comboId) {
    const response = await fetch(`${API_URL}/combo/stock/${comboId}`)
    const jsonData = await response.json(); 
    return(jsonData);
}