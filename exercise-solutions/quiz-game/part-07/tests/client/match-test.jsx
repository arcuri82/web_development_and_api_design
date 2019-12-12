const React = require('react');
const {mount} = require('enzyme');
const {Match} = require("../../src/client/match");
const {quizzes} = require("../../src/server/db/quizzes");
const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const app = require('../../src/server/app');



function isQuizDisplayed(driver) {

    const quiz = driver.find('.quiz');
    const questions = driver.find('.question');
    const answers = driver.find('.gameBtn');

    return quiz.length === 1 && questions.length === 1 && answers.length === 4;
}

function getDisplayedQuiz(driver) {

    const quizDiv = driver.find('.quiz').at(0);
    const html_id = quizDiv.prop('id');
    const id = parseInt(html_id.substring("quiz_".length, html_id.length));

    const quiz = quizzes.find(e => e.id === id);
    return quiz;
}

async function waitForQuizDisplayed(driver){

    const displayed = await asyncCheckCondition(()=>{
        driver.update();
        return isQuizDisplayed(driver);
    }, 2000 ,200);

    return displayed;
}

test("Test rendered quiz", async () => {

    overrideFetch(app);

    const driver = mount(<Match/>);

    const displayed = await waitForQuizDisplayed(driver);

    expect(displayed).toEqual(true);
});


test("Test do answer wrongly", async () => {

    overrideFetch(app);

    const driver = mount(<Match/>);

    await waitForQuizDisplayed(driver);

    const quiz = getDisplayedQuiz(driver);
    const wrong = (quiz.indexOfRightAnswer + 1) % 4;

    const first = driver.find('.gameBtn').at(wrong);
    first.simulate('click');

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(true);
    expect(won).toEqual(false);
});



test("Test do answer correctly", async () => {

    overrideFetch(app);

    const driver = mount(<Match/>);

    await waitForQuizDisplayed(driver);

    const quiz = getDisplayedQuiz(driver);
    const correct = quiz.indexOfRightAnswer ;

    const first = driver.find('.gameBtn').at(correct);
    first.simulate('click');

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(false);
    expect(won).toEqual(false);

    //game still on
    const displayed = await waitForQuizDisplayed(driver);
    expect(displayed).toEqual(true);
});

test("Test win match", async () => {

    overrideFetch(app);

    const driver = mount(<Match/>);

    await waitForQuizDisplayed(driver);

    for(let i=0; i<3; i++) {
        const quiz = getDisplayedQuiz(driver);
        const correct = quiz.indexOfRightAnswer;

        const first = driver.find('.gameBtn').at(correct);
        first.simulate('click');

        driver.update();
        /*
            Note: to be precise, here we should wait until a new Quiz
            is displayed, or the Win/Lose page.
            However, as those do not require any async operation in the app,
            then we should still be fine in this case even without an explicit wait
         */
    }

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(false);
    expect(won).toEqual(true);
});

