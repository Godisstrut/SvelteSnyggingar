    let triviaData = [];
    let currentIndex = 0;
    let userAnswer = '';
    let score = 0;
    let gameFinished = false;
    let quizStarted = false;
    let selectedDifficulty = '';
    let questionType = '';

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


    function nextQuestion() {
        if (currentIndex < triviaData.length - 1) {
            currentIndex++;
            userAnswer = '';
        } else {
            gameFinished = true;
        }
    }

    function submitAnswer(answer) {
        console.log("Hejsan du klickade på mig!")
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