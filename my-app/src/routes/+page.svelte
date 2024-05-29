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

<div class="flex flex-col items-center mt-4">
    <h1 class="text-xl font-bold mb-4">LyricsGuessr:</h1>
    <ul class="flex flex-col space-y-2">
        {#each lyricStoredAnswers as answers}
            <li class="border border-gray-300 p-2 rounded shadow">
                <h2 class="text-lg font-bold">Quiz Resultat</h2>
                <ul class="ml-4 mt-2">
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

<div class="flex flex-col items-center mt-4">
    <h1 class="text-xl font-bold mb-4">TriviaGuessr:</h1>
    <ul class="flex flex-col space-y-2">
        {#each triviaStoredAnswers as answers}
            <li class="border border-gray-300 p-2 rounded shadow">
                <h2 class="text-lg font-bold">Quiz Resultat</h2>
                <ul class="ml-4 mt-2">
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