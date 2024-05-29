<script>
  import { onMount } from 'svelte';
  import { createAnswersStore } from '../answersStores.js';
  let gameId = 'musixmatch'; 
  const answers = createAnswersStore(gameId);
  let storedAnswers = [];

  onMount(() => {
    const unsubscribe = answers.subscribe(value => {
      storedAnswers = value;
    });

    return () => unsubscribe();
  });
</script>

<div class="flex flex-col items-center mt-4">
  <h1 class="text-xl font-bold mb-4">Results from Musixmatch</h1>
  <ul class="flex flex-col space-y-2">
    {#each storedAnswers as { guess, answer, isCorrect }}
      <li class="{ isCorrect ? 'bg-green-200' : 'bg-red-200' } border border-gray-300 p-2 rounded shadow">
        <strong>{isCorrect ? 'Guessed' : 'Wrong guess'}:</strong> {guess}, <strong>Correct:</strong> {answer}
      </li>
    {/each}
  </ul>
</div>
