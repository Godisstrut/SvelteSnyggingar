<script>
    import { onMount } from 'svelte';
    import Button from './Button.svelte';

    let triviaData = [];
    let currentIndex = 0;
    let userAnswer = '';

    onMount(async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean');
            const data = await response.json();
            triviaData = data.results;
        } catch (error) {
            console.error('Error fetching trivia:', error);
        }
    });

    function nextQuestion() {
        if (currentIndex < triviaData.length - 1) {
            currentIndex++;
            userAnswer = '';
        }
    }

    function submitAnswer(answer) {
        console.log("Hejsan du klikade på mig!")
        userAnswer = answer;
        nextQuestion();
    }
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
    {#if triviaData.length > 0}
        <div class="question">
            <p><strong>Question:</strong> {@html triviaData[currentIndex].question}</p>
            <Button class="bg-green-500" on:click={() => submitAnswer('True')}>True</Button>
            <Button class="bg-red-500" on:click={() => submitAnswer('False')}>False</Button>
        </div>
    {:else}
        <p>Loading questions...</p>
    {/if}
</div>
