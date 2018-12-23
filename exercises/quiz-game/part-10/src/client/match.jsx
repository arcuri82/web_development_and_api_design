import React from "react";
import {withRouter} from 'react-router-dom'


export class Match extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentQuizIndex: 0
        };
    }

    answerTag(prefix, answer, correct) {
        let onclick;

        if (correct) {
            onclick = () => {alert('Correct!!!');  this.displayNewQuiz();}
        } else {
            onclick = () => {alert('Wrong answer');};
        }

        return (
            <div className={"quizBtn"}
                 onClick={onclick}>
                {prefix + answer}
            </div>
        );
    }

    displayNewQuiz = () => {

        let index = Math.floor(Math.random() * quizzes.length);

        if (index === this.state.currentQuizIndex) {
            index = (index + 1) % quizzes.length;
        }

        this.setState({currentQuizIndex: index});
    };

    render() {

        const quiz = quizzes[this.state.currentQuizIndex];

        return (
            <div>
                <p className={"quizQuestion"}>
                    Question: {quiz.question}
                </p>
                {this.answerTag("A: ", quiz.answer_0, quiz.indexOfRightAnswer === 0)}
                {this.answerTag("B: ", quiz.answer_1, quiz.indexOfRightAnswer === 1)}
                {this.answerTag("C: ", quiz.answer_2, quiz.indexOfRightAnswer === 2)}
                {this.answerTag("D: ", quiz.answer_3, quiz.indexOfRightAnswer === 3)}

                <MyHomeLink/>
            </div>
        );
    }
}


export default withRouter(Match);

