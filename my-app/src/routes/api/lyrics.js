// src/routes/api/lyrics.js
import { json } from '@sveltejs/kit';
const API_BASE_URL = 'https://api.musixmatch.com/ws/1.1';
import { APIKEY } from '$env/static/private';

export async function GET({ url }) {
  const track = url.searchParams.get('track');
  const artist = url.searchParams.get('artist');
  const response = await fetch(`${API_BASE_URL}/track.get?apikey=${APIKEY}commontrack_id=5920049`);
  
  if (!response.ok) {
    return json({ error: 'Failed to fetch lyrics' }, { status: response.status });
  }
  
  const data = await response.json();
  return json(data.message.body.lyrics || { lyrics_body: 'Lyrics not found' });
}
