<script>
    import Button from './Button.svelte';

    function resetCookiesQuiz() {
        eraseCookie('triviaData');
        eraseCookie('currentIndex');
        eraseCookie('score');
        eraseCookie('gameFinished');
        eraseCookie('quizStarted');
        eraseCookie('selectedDifficulty');
        eraseCookie('questionType');
    }

    let triviaData = [];
    let currentIndex = 0;
    let userAnswer = '';
    let score = 0;
    let gameFinished = false;
    let quizStarted = false;
    let selectedDifficulty = '';
    let questionType = '';

    function setCookie(name, value, exDays) {
        const d = new Date();
        d.setTime(d.getTime() + (exDays*24*60*60*1000));
        const expires = "expires" + d.toUTCString();
        document.cookie = name + "=" + value + "," + expires + ";path=/";
    }

    function getCookie(name) {
        const Cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == '') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age= -999999';
    }

    //Funktion för att hämta frågor sant/falskt från API, använder difficulty som parameter
    async function getTrueOrFalseQuestions(difficulty) {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=boolean`);
            const data = await response.json();
            console.log(data);
            triviaData = data.results;
        } catch (error) {
            console.error('Error fetching trivia:', error);
        }
    };

    //Funktion för att hämta flervalsfrågor från API, använder difficulty som parameter
    async function getMultipleChoiceQuestions(difficulty) {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`);
            const data = await response.json();
            console.log(data);
            triviaData = data.results;
        } catch (error) {
            console.error('Error fetching trivia', error);
        }
    };

    function selectedQuestionType(type) {
        questionType = type;
        saveCookiesQuiz();
    }

    //Börjar quizet efter vald svårighetsgrad
    function quizDifficulty(difficulty) {
        selectedDifficulty = difficulty;
        quizStarted = true;

        if (questionType === 'boolean') {
            getTrueOrFalseQuestions(difficulty)
        } else if (questionType === 'multiple') {
            getMultipleChoiceQuestions(difficulty);
        }
    }

    function saveCookiesQuiz() {
        setCookie('triviaData', JSON.stringify(triviaData), 1);
        setCookie('currentIndex', currentIndex, 1);
        setCookie('score', score, 1);
        setCookie('gameFinished', gameFinished, 1);
        setCookie('quizStarted', quizStarted, 1);
        setCookie('selectedDifficulty', selectedDifficulty, 1);
        setCookie('questionType', questionType, 1);
    }

    function loadCookiesQuiz() {
        const savedTriviaData = getCookie('triviaData');
        const savedCurrentIndex = getCookie('CurrentIndex');
        const savedScore = getCookie('score');
        const savedGameFinished = getCookie('gameFinished');
        const savedQuizStarted = getCookie('quizStarted');
        const savedSelectedDifficulty = getCookie('selectedDifficulty');
        const savedQuestionType = getCookie('questionType');

        if (savedTriviaData) triviaData = JSON.parse(savedTriviaData);
        if (savedCurrentIndex) currentIndex = parseInt(savedCurrentIndex);
        if (savedScore) score = parseInt(savedScore);
        if (savedGameFinished) gameFinished = (savedGameFinished === 'true');
        if (savedQuizStarted) quizStarted = (savedQuizStarted === 'true');
        if (savedSelectedDifficulty) selectedDifficulty = savedSelectedDifficulty;
        if (savedQuestionType) questionType = savedQuestionType;
    }

    function nextQuestion() {
        if (currentIndex < triviaData.length - 1) {
            currentIndex++;
            userAnswer = '';
        } else {
            gameFinished = true;
        }
        saveCookiesQuiz();
    }

    function submitAnswer(answer) {
        console.log("Hejsan du klickade på mig!")
        if (answer === triviaData[currentIndex].correct_answer) {
            score++;
        }
        userAnswer = answer;
        nextQuestion();
        saveCookiesQuiz();
    }

    //Funktion som ger ut olika svar beroende på användarens prestanda
    function resultMessage(score, total) {
        const resultScore = (score / total) * 10;

        if (resultScore === 10) {
            return '<span class="text-xl text-amber-600 font-bold">Utmärkt! Alla rätt, snyggt jobbat!</span>';
        } else if (resultScore >= 7) {
            return '<span class="text-xl text-sky-700 font-bold">Grymt jobbat! Nästan alla rätt</span>';
        } else if (resultScore >= 5) {
            return '<span class="text-xl text-yellow-500 font-bold">Bra jobbat!</span>';
        } else if (resultScore >= 1) {
            return '<span class="text-xl text-red-700 font-bold">Bättre lycka nästa gång!</span>';
        } else {
            return '<span class="text-xl text-red-950 font-bold">Du fick inga rätt, fick du sitta längst fram i klassrummet ofta när du var liten?</span>';
        }
    }

</script>

<div>
    <h1 class="mt-20 text-2xl font-extrabold text-center text-gray-900 dark:text-white md:text-2xl lg:text-4xl"><span class="text-transparent pb-10 bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-300">Trivia! Spelet om meningslös kunskap</span></h1>
    {#if !quizStarted}
        {#if !questionType}
            <div class="flex flex-col items-center gap-4 mt-10">
                <p class="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">Välj frågetyp:</p>
                <nav class="flex justify-center mt-5 space-x-5">
                    <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full" on:click={() => selectedQuestionType('boolean')}>Sant/Falskt</Button>
                    <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full" on:click={() => selectedQuestionType('multiple')}>Flervals</Button>
                </nav>
            </div>
        {:else}
            <div class="flex flex-col items-center gap-4 mt-10">
                <p class="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">Välj svårighetsgrad:</p>
                <nav class="flex justify-center mt-5 space-x-5">
                    <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full" on:click={() => quizDifficulty('easy')}>Easy</Button>
                    <Button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-full" on:click={() => quizDifficulty('medium')}>Medium</Button>
                    <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full" on:click={() => quizDifficulty('hard')}>Hard</Button>
                </nav>
            </div>
        {/if}
    {:else if quizStarted && !gameFinished}
        {#if triviaData.length > 0}
            <div class="question flex flex-col items-center gap-10 pt-20 bg-cyan-300 h-80">
                <p class="font-medium text-center"><strong>Question:</strong> {@html triviaData[currentIndex].question}</p>
                {#if questionType === 'boolean'}
                    <div class="button-container flex justify-center mt-4 space-x-8">
                        <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 text-xl rounded-full" on:click={() => submitAnswer('True')}>Sant</Button>
                        <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 text-xl rounded-full" on:click={() => submitAnswer('False')}>Falskt</Button>
                    </div>
                {:else if questionType === 'multiple'}
                    <div class="button-container flex justify-center mt-4 space-x-8">
                        {#each [...triviaData[currentIndex].incorrect_answers, triviaData[currentIndex].correct_answer].sort() as answer}
                            <Button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full" on:click={() => submitAnswer(answer)}>{answer}</Button>
                        {/each}
                    </div>
                {/if}
            </div>
        {:else}
            <p class="text-center">Loading questions...</p>
        {/if}
    {:else}
        <div class="flex flex-col items-center gap-10 pt-20 bg-cyan-400 h-80">
            <p class="text-xl font-semibold mt-10">Ditt resultat är {score} ut av {triviaData.length}</p>
            <p class="font-normal mt-5 text-center">{@html resultMessage(score, triviaData.length)}</p>
        </div>
    {/if}
</div>