<!-- <script context="module">

    async function load({ fetch, params }) {
      const track = 'Baby';
      const artist = 'Justin Bieber';
      const response = await fetch(`https://api.musixmatch.com/ws/1.1/track.get?apikey=${PUBLIC_LYRICS_APIKEY}commontrack_id=5920049`);

      const data = await response.json();
      console.log(data)
      return { props: { lyrics: data.lyrics_body || 'Lyrics not found' } };
    }
    export let lyrics;
  </script>
  
  <main>
    <h1>Lyrics</h1>
    <p>{lyrics}</p>
  </main> -->