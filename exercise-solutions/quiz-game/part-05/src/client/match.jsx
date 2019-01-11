import React from "react";

import {getRandomQuizzes} from './quizzes';


export class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            match: null
        }
    }

    componentDidMount() {
        this.startNewMatch();
    }

    startNewMatch = () => {

        const quizzes = getRandomQuizzes(3);

        this.setState({
            match: {
                victory: false,
                defeat: false,
                quizzes: quizzes,
                currentIndex: 0,
                numberOfQuizzes: quizzes.length
            }
        });

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
        return <div className='gameBtn' onClick={() => this.handleClick(correct)}> {prefix + answer} </div>;
    }

    render() {

        if (!this.state.match) {
            return <h2>Loading...</h2>;
        }

        if (this.state.match.victory) {
            return (
                <div>
                    <h2>You Won!</h2>
                    <div className="btn" onClick={this.startNewMatch}>New Match</div>
                </div>
            );
        }

        if (this.state.match.defeat) {
            return (
                <div>
                    <h2>Wrong Answer! You Lost!</h2>
                    <div className="btn" onClick={this.startNewMatch}>New Match</div>
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