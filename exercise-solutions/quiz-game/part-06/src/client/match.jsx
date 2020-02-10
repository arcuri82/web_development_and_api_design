import React from "react";

import {getRandomQuizzes} from './quizzes';


export class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            match: null,
            error: null
        }
    }

    componentDidMount() {
        this.startNewMatch();
    }

    startNewMatch = async () => {

        //because getRandomQuizzes is async, it does return a Promise we can await on
        const quizzes = await getRandomQuizzes(3);

        this.setState(
            !quizzes ? {error: "Error when connecting to server"}
                : {
                    error: null,
                    match: {
                        victory: false,
                        defeat: false,
                        quizzes: quizzes,
                        currentIndex: 0,
                        numberOfQuizzes: quizzes.length
                    }
                }
        );

    };

    handleClick = (correct) => {
        if (correct) {
            if (this.state.match.currentIndex === (this.state.match.numberOfQuizzes - 1)) {
                //last quiz
                this.setState({match: {victory: true}});
            } else {
                //go on to next quiz
                this.setState(prev => ({
                    match: {
                        currentIndex: prev.match.currentIndex + 1,
                        quizzes: prev.match.quizzes,
                        numberOfQuizzes: prev.match.numberOfQuizzes
                    }
                }));
            }

        } else {
            this.setState({match: {defeat: true}});
        }
    };


    renderAnswerTag(prefix, answer, correct) {
        return <div className='answer' onClick={() => this.handleClick(correct)} tabindex="0"> {prefix + answer} </div>;
    }
    /* Tabindex is important to add for universal design. Tabindex make html elements able to reach from the key tab. 
    Like in this case where we use a <div></div> as a button. If we did not add tabindex inside the div, 
    it whould not have been possibøle to navigate to it with the keyboard. With tabindex we can also decide the order of tab-able elements. 
    As we now have it set to 0 we use default order. But by giving them nr 1-2-3-4 we can decide the order, but this is considered bad practice.
    more info: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex 
    */


    render() {

        if (this.state.error) {
            return <h2>{this.state.error}</h2>
        }

        if (!this.state.match) {
            return <h2>Loading...</h2>;
        }

        if (this.state.match.victory) {
            return (
                <div className="game-result">
                    <h2>You Won!</h2>
                    <div className="action">
                    <button className="play new-game-button" onClick={this.startNewMatch}>New Match</button>
                </div>
                </div>
            );
        }

        if (this.state.match.defeat) {
            return (
                <div className="game-result">
                    <h2>Wrong Answer! You Lost!</h2>
                    <div className="action">
                    <button className="play new-game-button" onClick={this.startNewMatch}>New Match</button>
                </div>
                </div>
            );
        }

        const match = this.state.match;
        const count = "" + (match.currentIndex + 1) + "/" + match.numberOfQuizzes;
        const quiz = match.quizzes[match.currentIndex];

        return (
            <div id={"quiz_" + quiz.id} className="quiz">
                <p className='question'>Question {count}: {quiz.question} </p>
                {this.renderAnswerTag("A: ", quiz.answers[0], quiz.indexOfRightAnswer === 0)}
                {this.renderAnswerTag("B: ", quiz.answers[1], quiz.indexOfRightAnswer === 1)}
                {this.renderAnswerTag("C: ", quiz.answers[2], quiz.indexOfRightAnswer === 2)}
                {this.renderAnswerTag("D: ", quiz.answers[3], quiz.indexOfRightAnswer === 3)}
            </div>
        );
    }
}