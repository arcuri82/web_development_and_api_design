import React from "react";
import ReactDOM from "react-dom";

import {getRandomQuizzes} from './quizzes';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {quiz: getRandomQuizzes(1)[0]}
    }


    handleClick = (correct) => {
        if (correct) {
            alert('Correct!!!');
            this.setState({quiz: getRandomQuizzes(1)[0]})
        } else {
            alert('Wrong answer');
        }
    };


    renderAnswerTag(prefix, answer, correct) {
        return <div className='answer' onClick={() => this.handleClick(correct)}> {prefix + answer} </div>;
    }

    render() {

        const quiz = this.state.quiz;

        return (
            /*This <></> is a shorthand React fragment, full tag is <React.Fragment></React.Fragment>, 
            the shorthand is just so much cleaner. 
            It is usfull when we dont want another html tag, 
            like a div to be added to the html three but need something that collects other elemnts. 
            If you look at this from the development tools in your browser, it wont be visable. 
            Doc: https://reactjs.org/docs/fragments.html
            */
            <>
                <p className='question'>Question: {quiz.question} </p>
                {this.renderAnswerTag("A: ", quiz.answers[0], quiz.indexOfRightAnswer === 0)}
                {this.renderAnswerTag("B: ", quiz.answers[1], quiz.indexOfRightAnswer === 1)}
                {this.renderAnswerTag("C: ", quiz.answers[2], quiz.indexOfRightAnswer === 2)}
                {this.renderAnswerTag("D: ", quiz.answers[3], quiz.indexOfRightAnswer === 3)}
            </>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById("root"));


