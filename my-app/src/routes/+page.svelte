<script>
    import { lyricGameIds, triviaGameIds } from "../stores.js";
    import { onMount } from "svelte";

    let lyricStoredAnswers = [];
    let triviaStoredAnswers = [];   

    onMount(() => {
        const storedLyricGameIds = JSON.parse(localStorage?.getItem("lyricGameIds") || "[]");
        lyricStoredAnswers = storedLyricGameIds;
        lyricGameIds.set(storedLyricGameIds);

        const storedTriviaGameIds = JSON.parse(localStorage?.getItem("triviaGameIds") || "[]");
        triviaStoredAnswers = storedTriviaGameIds;
        triviaGameIds.set(storedTriviaGameIds);
    });
</script>

<div class="flex flex-col mb-5 justify-center mt-5 items-center">
  <div class="flex flex-col items-center w-full max-w-md">
      <h1 class="text-xl font-bold mb-4">LyricsGuessr:</h1>
      <ul class="flex flex-col space-y-2 w-full">
          {#each lyricStoredAnswers as answers}
              <li class="border border-gray-300 p-2 rounded shadow w-full">
                  <h2 class="text-lg font-bold">Quiz Resultat</h2>
                  <ul class="mt-2">
                      {#each answers as { guess, answer, isCorrect }}
                          <li class="{isCorrect ? 'bg-green-200' : 'bg-red-200'} border border-gray-300 p-2 rounded shadow mt-2">
                              <strong>Ditt svar:</strong> {guess}, <strong>Rätt svar:</strong> {answer}
                          </li>
                      {/each}
                  </ul>
              </li>
          {/each}
      </ul>
  </div>

  <div class="flex flex-col items-center w-full max-w-md mt-5">
      <h1 class="text-xl font-bold mb-4">TriviaGuessr:</h1>
      <ul class="flex flex-col space-y-2 w-full">
          {#each triviaStoredAnswers as answers}
              <li class="border border-gray-300 p-2 rounded shadow w-full">
                  <h2 class="text-lg font-bold">Quiz Resultat</h2>
                  <ul class="mt-2">
                      {#each answers as { question, answer, correctAnswer }}
                          <li class="border border-gray-300 p-2 rounded shadow mt-2">
                              <strong>Fråga:</strong> {@html question}<br>
                              <strong>Ditt svar:</strong> {answer}<br>
                              <strong>Korrekt svar:</strong> {correctAnswer}
                          </li>
                      {/each}
                  </ul>
              </li>
          {/each}
      </ul>
  </div>
</div>


