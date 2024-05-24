<script>
  export let lyrics = [];
  export let artists = [];

  let guess = "";
  let currentIndex = 0; // Initialize the current index

  const compareGuess = () => {
      console.log('Button clicked'); // Debug log to check if the function is triggered
      const currentArtist = artists[currentIndex].trim().toLowerCase();
      if (guess.trim().toLowerCase() === currentArtist) {
          alert('Rätt');
      } else {
          alert('Fel');
      }
      guess = ""; // Clear the input field
      currentIndex++; // Move to the next lyric

      if (currentIndex >= lyrics.length) {
          currentIndex = 0; // Restart from the beginning if at the end
          alert('You have finished all the lyrics!');
      }
  };
</script>

{#if lyrics.length > 0}
  <p>{lyrics[currentIndex]}</p>
{/if}
<input type="text" placeholder="Skriv artist" bind:value={guess} />
<button on:click={compareGuess}>Skicka</button>
