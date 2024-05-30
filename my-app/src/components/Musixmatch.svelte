<script>
  // importerar componenter och funktioner för att componenten ska funkgera
  import { goto } from "$app/navigation";
  import Button from "./Button.svelte";
  import { lyricGameIds } from "../stores.js";
  import { get } from "svelte/store";

  
  export let lyrics = [];
  export let artists = [];

  // definerar variabler som tar in användaren gissning, vilken låt som ska visas i taget, sparar användarens gissnig och det rätta svaret och en boolean för när man är klart med spelet 
  let guess = "";
  let currentIndex = 0;
  let answers = [];
  let show = false;

  // funktion som kollra om man har rätt eller fel, gör även en localstorage 
  const compareGuess = () => {
    const currentArtist = artists[currentIndex];
    const isCorrect =
      guess.trim().toLowerCase() === currentArtist.toLowerCase();
    answers = [...answers, { guess, answer: currentArtist, isCorrect }];
    guess = "";
    currentIndex++;
    if (currentIndex >= lyrics.length) {
      show = true;
      const storedGameIds = get(lyricGameIds);
      const newGameIds = [...storedGameIds, answers];
      localStorage.setItem("lyricGameIds", JSON.stringify(newGameIds));
      lyricGameIds.set(newGameIds);
    }
  };

  // skickar hem spelaren efter spelet 
  const goHome = () => {
    goto("/");
  };
</script>

<!-- Resten av koden är utseende -->
<div class="flex justify-center">
  <div class="max-w-xl text-lg font-semibold m-20">
    {#if currentIndex < lyrics.length}
      {#each lyrics[currentIndex] as line}
        <p>{line}</p>
      {/each}
    {:else}
      <h1>Du har svarat på alla lyrics!</h1>
    {/if}
  </div>
</div>

{#if !show}
  <div class="flex justify-center space-x-2">
    <input
      class="border-2 border-slate-700 rounded-lg py-2 px-4"
      type="text"
      placeholder="Skriv artist"
      bind:value={guess}
    />
    <Button
      on:click={compareGuess}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
    >
      Skicka
    </Button>
  </div>
{/if}

<div class="flex justify-center mt-4">
  {#if show}
    <button
      on:click={goHome}
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
    >
      Home
    </button>
  {/if}
</div>

<div class="flex flex-col items-center mt-4">
  <h1 class="text-xl font-bold mb-4">Results</h1>
  <ul class="flex flex-col space-y-2">
    {#each answers as { guess, answer, isCorrect }}
      <li
        class="{isCorrect
          ? 'bg-green-200'
          : 'bg-red-200'} border border-gray-300 p-2 rounded shadow"
      >
        <strong>{isCorrect ? "Guessed" : "Wrong guess"}:</strong>
        {guess}, <strong>Correct:</strong>
        {answer}
      </li>
    {/each}
  </ul>
</div>