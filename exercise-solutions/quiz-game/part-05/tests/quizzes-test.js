const {getRandomQuizzes} = require("../src/client/quizzes");


test("Test invalid n", () =>{

    expect(() => getRandomQuizzes(-1)).toThrow();
    expect(() => getRandomQuizzes(0)).toThrow();
    expect(() => getRandomQuizzes(100000000)).toThrow();
});


test("Test get 1", () => {

    const quizzes = getRandomQuizzes(1);

    expect(quizzes.length).toBe(1);
    expect(quizzes[0].question).toBeDefined();
    expect(quizzes[0].answers).toBeDefined();
    expect(quizzes[0].answers.length).toBe(4);
});

test("Test get 2", () => {

    for(let i=0; i<100; i++) {
        const quizzes = getRandomQuizzes(2);

        expect(quizzes.length).toBe(2);
        expect(quizzes[0].question).not.toBe(quizzes[1].question);
    }
});