<script>
  import { goto } from '$app/navigation';
  import Button from "./Button.svelte";

  export let lyrics = [];
  export let artists = [];

  let guess = "";
  let currentIndex = 0;
  let answers = [];
  let show = false;

  const compareGuess = () => {
    const currentArtist = artists[currentIndex];
    if (guess.trim().toLowerCase() === currentArtist.toLowerCase()) {
      alert('Rätt');
    } else {
      alert('Fel');
    }
    answers.push({ guess, answer: currentArtist });
    guess = "";
    currentIndex++;
    if (currentIndex >= lyrics.length) {
      show = true;
    }
  };

  const goHome = () => {
    goto('/');
  };
</script>

<div class="flex justify-center">
   <div class="max-w-xl text-lg font-semibold m-20">
    {#if currentIndex <= 4}
      {#each lyrics[currentIndex] as line}
        <p>{line}</p>
      {/each}
      {:else}
        <h1> You have finished all the lyrics! </h1>
    {/if}
    </div> 
</div>
{#if show === false}
  <div class="flex justify-center space-x-2">
    <input
      class="border-2 border-slate-700 rounded-lg py-2 px-4"
      type="text"
      placeholder="Skriv artist"
      bind:value={guess}
    />
    <Button on:click={compareGuess} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
      Skicka
    </Button>
  </div>
  {/if}
<div class="flex justify-center mt-4">
  {#if show}
    <button on:click={goHome} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
      Home
    </button>
  {/if}
</div>
<div class="flex justify-center mt-4">
  <ul>
    {#each answers as { guess, answer }, index (index)}
      <li key={index}>Guessed: {guess}, Correct: {answer}</li>
    {/each}
  </ul>
</div>
