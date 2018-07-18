let quizzes = [
    {
        question: "What kind of language is JavaScript?",
        answer_0: "Strongly and statically typed",
        answer_1: "Strongly and dynamically typed",
        answer_2: "Weakly and statically typed",
        answer_3: "Weakly and dynamically typed",
        indexOfRightAnswer: 3
    },
    {
        question: "In JavaScript, what is the result of the following?\n\n+(!![]+!![]+!![]+!![]+[]+(!![]+!![]))",
        answer_0: "Compilation exception",
        answer_1: "Runtime exception",
        answer_2: "42",
        answer_3: "'42'",
        indexOfRightAnswer: 2
    },
    {
        question: "What is the result  of the following?\n\nfalse + true?",
        answer_0: "false",
        answer_1: "true",
        answer_2: "'falsetrue'",
        answer_3: "1",
        indexOfRightAnswer: 3
    }
];

let currentQuizIndex = 0;

answerTag = function (prefix, answer, correct) {

    let onclick;

    if(correct) {
        onclick = "alert('Correct!!!');  displayNewQuiz();";
    } else {
        onclick = "alert('Wrong answer');";
    }

    let html = "<div class='gameBtn answer' onclick=\""+onclick+"\">" + prefix + answer + "</div>";

    return html;
};

displayQuiz = function (quiz) {

    let html = "<p class='question'>Question: \"" + quiz.question + "\"</p>";
    html += answerTag("A: ", quiz.answer_0, quiz.indexOfRightAnswer === 0);
    html += answerTag("B: ", quiz.answer_1, quiz.indexOfRightAnswer === 1);
    html += answerTag("C: ", quiz.answer_2, quiz.indexOfRightAnswer === 2);
    html += answerTag("D: ", quiz.answer_3, quiz.indexOfRightAnswer === 3);

    let quizDiv = document.getElementById("quizDivId");

    quizDiv.innerHTML = html;
};

displayNewQuiz = function(){

    let index = Math.floor(Math.random() * quizzes.length);

    if(index === currentQuizIndex){
        index = (index + 1) % quizzes.length;
    }

    let quiz = quizzes[index];
    currentQuizIndex = index;

    displayQuiz(quiz);
};