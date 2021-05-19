import { API_URL } from "./settings";

export default async function getUserExists(email){
    const response = await fetch(`${API_URL}/user/exists/${email}`);
    const jsonData = await response.json();
    return(jsonData);
}
