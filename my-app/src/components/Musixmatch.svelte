<script>
  export let lyrics = [];
  export let artists = [];

  let guess = "";
  let currentIndex = 0; 

  const compareGuess = () => {
      console.log('Button clicked'); 
      const currentArtist = artists[currentIndex];
      if (guess.trim().toLowerCase() === currentArtist) {
          alert('Rätt');
      } else {
          alert('Fel');
      }
      guess = ""; 
      currentIndex++; 

      if (currentIndex >= lyrics.length) {
          currentIndex = 0; 
          alert('You have finished all the lyrics!');
      }
  };
</script>

{#if lyrics.length > 0}
  <p>{lyrics[currentIndex]}</p>
{/if}
<input type="text" placeholder="Skriv artist" bind:value={guess} />
<button on:click={compareGuess}>Skicka</button>
