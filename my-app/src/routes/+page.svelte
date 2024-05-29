<script>
    import { gameIds } from "../stores.js";
    import { onMount } from "svelte";

    let storedAnswers = [];

    onMount(() => {
        const storedGameIds = JSON.parse(
            localStorage?.getItem("gameIds") || "[]",
        );
        storedAnswers = storedGameIds;
        gameIds.set(storedGameIds);
    });
</script>

<div class="flex flex-col items-center mt-4">
    <h1 class="text-xl font-bold mb-4">Results from Musixmatch</h1>
    <ul class="flex flex-col space-y-2">
        {#each storedAnswers as answers}
            <li class="border border-gray-300 p-2 rounded shadow">
                <h2 class="text-lg font-bold">Quiz Result</h2>
                <ul class="ml-4 mt-2">
                    {#each answers as { guess, answer, isCorrect }}
                        <li
                            class="{isCorrect
                                ? 'bg-green-200'
                                : 'bg-red-200'} border border-gray-300 p-2 rounded shadow mt-2"
                        >
                            <strong
                                >{isCorrect
                                    ? "Guessed"
                                    : "Wrong guess"}:</strong
                            >
                            {guess}, <strong>Correct:</strong>
                            {answer}
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul>
</div>