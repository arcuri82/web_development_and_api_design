const React = require('react');
const {mount} = require('enzyme');
const {Match} = require("../src/client/match");
const {quizzes} = require("../src/client/quizzes");

function checkQuizIsDisplayed(driver) {

    const quiz = driver.find('.quiz');
    expect(quiz.length).toEqual(1);

    const questions = driver.find('.question');
    expect(questions.length).toEqual(1);

    const answers = driver.find('.gameBtn');
    expect(answers.length).toEqual(4);
}

function getDisplayedQuiz(driver) {

    const quizDiv = driver.find('.quiz').at(0);
    const html_id = quizDiv.prop('id');
    const id = parseInt(html_id.substring("quiz_".length, html_id.length));

    const quiz = quizzes.find(e => e.id === id);
    return quiz;
}

test("Test rendered quiz", () => {

    const driver = mount(<Match/>);
    checkQuizIsDisplayed(driver);
});


test("Test do answer wrongly", () => {

    const driver = mount(<Match/>);

    checkQuizIsDisplayed(driver);

    const quiz = getDisplayedQuiz(driver);
    const wrong = (quiz.indexOfRightAnswer + 1) % 4;

    const first = driver.find('.gameBtn').at(wrong);
    first.simulate('click');

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(true);
    expect(won).toEqual(false);
});



test("Test do answer correctly", () => {

    const driver = mount(<Match/>);

    checkQuizIsDisplayed(driver);

    const quiz = getDisplayedQuiz(driver);
    const correct = quiz.indexOfRightAnswer ;

    const first = driver.find('.gameBtn').at(correct);
    first.simulate('click');

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(false);
    expect(won).toEqual(false);

    //game still on
    checkQuizIsDisplayed(driver);
});

test("Test win match", () => {

    const driver = mount(<Match/>);

    for(let i=0; i<3; i++) {
        checkQuizIsDisplayed(driver);

        const quiz = getDisplayedQuiz(driver);
        const correct = quiz.indexOfRightAnswer;

        const first = driver.find('.gameBtn').at(correct);
        first.simulate('click');
    }

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(false);
    expect(won).toEqual(true);
});

