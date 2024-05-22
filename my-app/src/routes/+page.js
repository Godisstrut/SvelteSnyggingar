// src/routes/+page.js
export async function load() {
    try {
        const response = await fetch('http://127.0.0.1:8080/data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); 
        return {
            props: {
                serverData: data
            }
        };
    } catch (error) {
        console.error('Failed to fetch data from server:', error);
        return {
            props: {
                serverData: null
            }
        };
    }
}
