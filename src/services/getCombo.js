import { API_URL } from "./settings";

export default async function getCombo(comboId) {
    const response = await fetch(`${API_URL}/combo/${comboId}`)
    const jsonData = await response.json(); 
    return(jsonData[0]);
}