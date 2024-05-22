<script>
    import Button from './Button.svelte';

    let triviaData = [];
    let currentIndex = 0;
    let userAnswer = '';
    let score = 0;
    let gameFinished = false;
    let quizStarted = false;
    let selectedDifficulty = '';

    //Funktion för att hämta frågor från API, använder difficulty som parameter
    async function fetchTriviaQuestions(difficulty) {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=boolean`);
            const data = await response.json();
            console.log(data);
            triviaData = data.results;
        } catch (error) {
            console.error('Error fetching trivia:', error);
        }
    };

    //Börjar quizet efter vald svårighetsgrad
    function quizDifficulty(difficulty) {
        selectedDifficulty = difficulty;
        quizStarted = true;
        fetchTriviaQuestions(difficulty);
    }

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

    //Funktion som ger ut olika svar beroende på användarens prestanda
    function resultMessage(score, total) {
        const resultScore = (score / total) * 10;

        if (resultScore === 10) {
            return '<span class="text-amber-600 font-bold">Utmärkt! Alla rätt, snyggt jobbat!</span>';
        } else if (resultScore >= 7) {
            return '<span class="text-sky-500 font-bold">Grymt jobbat! Nästan alla rätt</span>';
        } else if (resultScore >= 5) {
            return '<span class="text-yellow-400 font-bold">Bra jobbat!</span>';
        } else if (resultScore >= 1) {
            return '<span class="text-orange-500 font-bold">Bättre lycka nästa gång!</span>';
        } else {
            return '<span class="text-red-500 font-bold">Du fick inga rätt, fick du sitta längst fram i klassrummet ofta när du var liten?</span>';
        }
    }

</script>

<div>
    <h1 class="text-3xl font-bold flex justify-center mt-20 p-5">Trivia Questions</h1>
    {#if !quizStarted}
        <div class="flex flex-col items-center gap-4 mt-20">
            <p class="text-xl font-semibold">Välj svårighetsgrad:</p>
            <nav class="flex justify-center mt-5 space-x-5 " >
                <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" on:click={() => quizDifficulty('easy')}>Easy</Button>
                <Button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full" on:click={() => quizDifficulty('medium')}>Medium</Button>
                <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" on:click={() => quizDifficulty('hard')}>Hard</Button>
            </nav>
        </div>
    {:else if quizStarted && !gameFinished}
        {#if triviaData.length > 0}
            <div class="question flex flex-col items-center gap-10 pt-20 bg-cyan-400 h-80">
                <p class="font-medium text-center"><strong>Question:</strong> {@html triviaData[currentIndex].question}</p>
                <div class="button-container flex justify-center mt-4 space-x-8">
                    <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 text-xl rounded-full" on:click={() => submitAnswer('True')}>True</Button>
                    <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 text-xl rounded-full" on:click={() => submitAnswer('False')}>False</Button>
                </div>
            </div>
        {:else}
            <p class="text-center">Loading questions...</p>
        {/if}
    {:else}
        <div class="flex flex-col items-center gap-10 pt-20 bg-cyan-400 h-80">
            <p class="font-medium mt-10">Ditt resultat är {score} ut av {triviaData.length}</p>
            <p class="font-normal mt-5 text-center">{@html resultMessage(score, triviaData.length)}</p>
        </div>
    {/if}
</div>