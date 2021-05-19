import { API_URL } from "./settings";

export default async function getUsers(){
    const response = await fetch(`${API_URL}/usuarios`);
    const jsonData = await response.json();
    return(jsonData);
}
