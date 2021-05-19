import { API_URL } from "./settings";

export default async function getSearchResults(text){
    const response = await fetch(`${API_URL}/search/${text}`);
    const jsonData = await response.json();
    return(jsonData);
}
