<script>
    import { onMount } from 'svelte';
    import Button from './Button.svelte';

    let triviaData = [];
    let currentIndex = 0;
    let userAnswer = '';
    let score = 0;
    let gameFinished = false;

    onMount(async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean');
            const data = await response.json();
            console.log(data);
            triviaData = data.results;
        } catch (error) {
            console.error('Error fetching trivia:', error);
        }
    });

    function nextQuestion() {
        if (currentIndex < triviaData.length - 1) {
            currentIndex++;
            userAnswer = '';
        } else {
            gameFinished = true;
        }
    }

    function submitAnswer(answer) {
        console.log("Hejsan du klikade på mig!")
        if (answer === triviaData[currentIndex].correct_answer) {
            score++;
        }
        userAnswer = answer;
        nextQuestion();
    }

    function resultMessage(score, total) {
        const resultScore = (score / total) * 10;

        if (resultScore === 10) {
            return "Utmärkt! Alla rätt, snyggt jobbat! "; 
        } else if (resultScore >= 8) {
            return "Grymt jobbat! Nästan alla rätt";
        } else if (resultScore >= 5) {
            return "Bra jobbat!";
        } else if (resultScore >= 1) {
            return "Bättre lycka nästa gång!";
        } else {
            return "Du fick inga rätt, fick du sitta längst fram i klassrummet ofta när du var lite?";
        }
    }

</script>

<div>
    <h1 class="text-3xl font-bold flex justify-center mt-20 p-5">Trivia Questions</h1>
    {#if !gameFinished}
        {#if triviaData.length > 0}
            <div class="question flex flex-col items-center gap-10 pt-20 bg-cyan-400 h-80 ">
                <p class="font-medium text-center "><strong>Question:</strong> {@html triviaData[currentIndex].question}</p>
                <div class="button-container justify-center mt-4 space-x-8">
                    <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" on:click={() => submitAnswer('True')}>True</Button>
                    <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" on:click={() => submitAnswer('False')}>False</Button>
                </div>
            </div>
        {:else}
            <p class="text-center">Loading questions...</p>
        {/if}
    {:else}
        <div class="flex justify-center pt-20 bg-cyan-400 h-80">
            <p class="font-medium mt-10 justify-center">Ditt resultat är {score} ut av {triviaData.length}</p>
            <p class="font-normal mt-5 justify-center"> {resultMessage(score, triviaData.length)}</p>
        </div>
    {/if}
</div>
