import { API_URL } from "./settings";

export default async function getCombos() {
    const response = await fetch(`${API_URL}/combos`)
    const jsonData = await response.json(); 
    return(jsonData);
}