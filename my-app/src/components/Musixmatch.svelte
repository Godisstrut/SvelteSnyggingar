<script>
  import { goto } from '$app/navigation';
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
          currentIndex++;
          alert('You have finished all the lyrics');
          console.log(answers);
      }
  };
</script>

<div class="flex justify-center" >
  {#if lyrics.length > 0}
    <div class="max-w-xl text-lg font-semibold m-20">
      {#each lyrics[currentIndex] as line}
        <p>{line}</p>
      {/each}
    </div>
  {/if}
</div>
<div class="flex justify-center space-x-2 " >
  <input class="border 2 border-slate-700 rounded-lg py-2 px-4" type="text" placeholder="Skriv artist" bind:value={guess} />
  <Button on:click={compareGuess} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">Skicka</Button>
</div>