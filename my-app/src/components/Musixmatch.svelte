<script>
  import Button from "./Button.svelte";
  export let lyrics = [];
  export let artists = [];

  let guess = "";
  let currentIndex = 0; 
  let answers = [];

  const compareGuess = () => {
      const currentArtist = artists[currentIndex];
      if (guess.trim().toLowerCase() === currentArtist) {
          alert('Rätt');
      } else {
        alert('Fel');
      }
      
      answers.push({ guess, answer: currentArtist });
      
      guess = ""; 
      currentIndex++; 

      if (currentIndex >= lyrics.length) {
          currentIndex = 0; 
          alert('You have finished all the lyrics');
          console.log(answers);
      }
  };
</script>

{#if lyrics.length > 0}
  <p>{lyrics[currentIndex]}</p>
{/if}
<input type="text" placeholder="Skriv artist" bind:value={guess} />
<Button on:click={compareGuess} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">Skicka</Button>
