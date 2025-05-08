
export const BASE_URL = "https://dummyjson.com";


async function fetchUsers() {

    const response = await fetch(BASE_URL+ "/users");
    const jsonData = response.json();

    return jsonData;
}