import { APIKEY } from '$env/static/private';

const API_BASE_URL = 'https://api.musixmatch.com/ws/1.1';

const track = "God's plan";

const artist = "Drake";

let name = "Lucas Asker";

export default name;


export async function fetchLyrics() {
  const response = await fetch(`${API_BASE_URL}/matcher.lyrics.get?q_track=${track}&q_artist=${artist}&apikey=${APIKEY}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch lyrics: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.message.body.lyrics ? data.message.body.lyrics.lyrics_body : 'Lyrics not found';
}

export async function fetchTrack(track, artist) {
  const response = await fetch(`${API_BASE_URL}/matcher.track.get?q_track=${track}&q_artist=${artist}&apikey=${APIKEY}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch track: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.message.body.track ? data.message.body.track : 'Track not found';
}
