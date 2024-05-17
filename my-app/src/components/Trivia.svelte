<script>
    import { onMount } from 'svelte';

    let triviaData = [];

    onMount(async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean');
            const data = await response.json();
            triviaData = data.results;
        } catch (error) {
            console.error('Error fetching trivia:', error);
        }
    });
</script>

<style>
    .question {
        border: 1px solid #ddd;
        padding: 10px;
        margin: 10px 0;
    }
</style>

<div>
    <h1>Trivia Questions</h1>
    {#each triviaData as question}
        <div class="question">
            <p><strong>Question:</strong> {@html question.question}</p>
        </div>
    {/each}
</div>
