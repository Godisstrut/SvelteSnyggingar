<script context="module">
  import { PUBLIC_LYRICS_APIKEY } from '$env/static/public'

    export async function load({ fetch, params }) {
      const track = 'Baby';
      const artist = 'Justin Bieber';
      const response = await fetch(`${API_BASE_URL}/track.get?apikey=${APIKEY}commontrack_id=5920049`);
      
      //const response = await fetch(`/api/lyrics?track=${track}&artist=${artist}`);


      


      const data = await response.json();
      return { props: { lyrics: data.lyrics_body || 'Lyrics not found' } };
    }
    export let lyrics;

    console.log(PUBLIC_LYRICS_APIKEY)
  </script>
  
  <main>
    <h1>Lyrics</h1>
    <p>{lyrics}</p>
  </main>
  