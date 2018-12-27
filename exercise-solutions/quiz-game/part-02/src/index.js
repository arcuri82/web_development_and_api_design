import {getRandomQuizzes} from './quizzes';


function answerTag(prefix, answer, correct) {

    let onclick;

    if(correct) {
        onclick = "alert('Correct!!!');  EntryPoint.displayNewQuiz();";
    } else {
        onclick = "alert('Wrong answer');";
    }

    const html = "<div class='gameBtn' onclick=\""+onclick+"\">" + prefix + answer + "</div>";

    return html;
}

function displayQuiz (quiz) {

    let html = "<p class='question'>Question: \"" + quiz.question + "\"</p>";
    html += answerTag("A: ", quiz.answers[0], quiz.indexOfRightAnswer === 0);
    html += answerTag("B: ", quiz.answers[1], quiz.indexOfRightAnswer === 1);
    html += answerTag("C: ", quiz.answers[2], quiz.indexOfRightAnswer === 2);
    html += answerTag("D: ", quiz.answers[3], quiz.indexOfRightAnswer === 3);

    const quizDiv = document.getElementById("quizDivId");

    quizDiv.innerHTML = html;
}

export function displayNewQuiz(){

    const quiz = getRandomQuizzes(1)[0];

    displayQuiz(quiz);
}
