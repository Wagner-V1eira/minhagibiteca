const API_KEY = process.env.EXPO_PUBLIC_COMIC_VINE_API_KEY;
const BASE_URL = 'https://comicvine.gamespot.com/api';

export async function searchIssues(query: string) {
  const searchUrl = `${BASE_URL}/search/?api_key=${API_KEY}&format=json&resources=issue&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(searchUrl); 
    const json = await response.json(); 
    
    if (json.error === 'OK') {
      return json.results; 
    } else {
      console.error('API Error:', json.error);
      return []; 
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    return []; 
  }
}