export const quizzes = [
    {
        question: "What kind of language is JavaScript?",
        answers: [
            "Strongly and statically typed",
            "Strongly and dynamically typed",
            "Weakly and statically typed",
            "Weakly and dynamically typed",
        ],
        indexOfRightAnswer: 3,
        id: 0
    },
    {
        question: "In JavaScript, what is the result of the following?\n\n+(!![]+!![]+!![]+!![]+[]+(!![]+!![]))",
        answers: [
            "Compilation exception",
            "Runtime exception",
            "42",
            "'42'"
        ],
        indexOfRightAnswer: 2,
        id: 1
    },
    {
        question: "In JavaScript, what is the result of the following?\n\n[3,18,1,2].sort()\n",
        answers: [
            "[1, 2, 3, 18]",
            "[1, 18, 2, 3]",
            "[18, 1, 2, 3]",
            "Runtime exception"
        ],
        indexOfRightAnswer: 1,
        id: 2
    },
    {
        question: "In JavaScript, what is the result  of the following?\n\nfalse + true?",
        answers: [
            "false",
            "true",
            "'falsetrue'",
            "1"
        ],
        indexOfRightAnswer: 3,
        id: 3
    },
    {
        question: "What is Babel mainly used for?",
        answers: [
            "To transpile code into valid JS code",
            "To bundle together the code of different JS files",
            "To download third-party dependencies",
            "To run test cases"
        ],
        indexOfRightAnswer: 0,
        id: 4
    }
];


/*
    Note the "async" here.
 */
export async function getRandomQuizzes(numberOfQuizzes) {

    if (numberOfQuizzes < 1) {
        throw "Invalid number of requested quizzes: " + n;
    }


    const url = "https://opentdb.com/api.php?type=multiple&amount=" + numberOfQuizzes;
    let response;
    let payload;

    try {
        response = await fetch(url);
        payload = await response.json();
    } catch (err) {
        return null;
    }

    if (response.status !== 200) {
        return null;
    }

    /*
    Example for:
    https://opentdb.com/api.php?type=multiple&amount=2

    {
    "response_code": 0,
    "results": [{
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Which computer hardware device provides an interface for all other connected devices to communicate?",
        "correct_answer": "Motherboard",
        "incorrect_answers": ["Central Processing Unit", "Hard Disk Drive", "Random Access Memory"]
      }, {
        "category": "Celebrities",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Which famous New York Yankees outfielder did Marilyn Monroe marry?",
        "correct_answer": "Joe DiMaggio",
        "incorrect_answers": ["Tino Martinez", "Babe Ruth", "Mason Williams"]
      }]
    }
    */

    /*
        We need to "map" such representation with the one we use internally
     */

    return payload.results.map(q => {

        const correct = Math.floor(Math.random() * Math.floor(3));
        const answers = q.incorrect_answers;
        answers.splice(correct, 0, q.correct_answer);

        return {
            question: q.question,
            answers: answers,
            indexOfRightAnswer: correct,
            id: 0
        };
    })
}


