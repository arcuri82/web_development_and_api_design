import React from "react";

//Note the use of "alias" in webpack.config.js to handle "~"
import {MyHomeLink} from "~/my_home_link";

//See "style-loader" and  "css-loader" in webpack.config.js, which need to be installed
//Note: this is installed globally, and not just for this component
import "./cards.css"

const positions = [0, 1, 2];

const spadesImg = "games/cards/img/2_of_spades.png";
const jokerImg = "games/cards/img/black_joker.png";
const backCoverImg = "games/cards/img/cover_card.jpg";


export class Cards extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.defaultState();
        this.startGame();
    }

    defaultState(){
        return {
            jokerPosition: Math.floor(Math.random() * 3),
            firstChoice: null,
            secondChoice: null,
            uncovered: null
        };
    }

    startGame = () => {
        this.setState(this.defaultState());
    };

    render() {
        return (
            <div>
                <h2>Find The Joker</h2>

                <p>
                    In this game, you need to find the Joker among the 3 covered cards.
                    Once you make your choice, the game will uncover 1 of the other 2 cards
                    that is not the Joker.
                    You will then be asked if you want to stick with your original choice, or
                    if your rather prefer to choose the other uncovered card.
                </p>

                <p>
                    What is the best strategy to play this game?
                    Always stick to your first choice?
                    Always change choice?
                    Change at random?
                    Regardless of your strategy, can you prove it is optimal?
                </p>

                <div>
                    {this.renderCards()}
                    {this.renderOutputMessage()}
                    <MyHomeLink/>
                </div>

                <p>
                    Disclaimer: the card images are in the public domain, taken from
                    {" "}<a href="https://code.google.com/archive/p/vector-playing-cards/">here</a>.
                    License of the back-cover is of unclear license, and taken from
                    {" "}<a href="http://clipart-library.com/clipart/8cxrbGE6i.htm">here</a>.
                </p>
            </div>
        );
    }

    renderOutputMessage() {

        let msg;

        if (this.state.secondChoice !== null) {

            if (this.state.secondChoice === this.state.jokerPosition) {
                msg = <div>YOU WON!!! Congratulation! The luck is strong in you!</div>
            } else {
                msg = <div>You Lost! You need to work on your luck skills</div>
            }

            let startGameLink =
                <div>
                    Click <span onClick={this.startGame}
                                className={"cardsFakeLink"}>here</span>
                    for a new game.
                </div>;

            msg =
                <div>
                    {msg}
                    {startGameLink}
                </div>;

        } else if (this.state.firstChoice !== null) {

            msg = <div>
                You can change your choice if you want.
                Or confirm your current choice.
                Just re-click on a covered card to find the Joker.
            </div>;

        } else {

            msg = <div>Choose a card to try to find the Joker by clicking on it.</div>;
        }

        return (
            <div className="cardsOutputMessage">
                {msg}
            </div>
        );
    }

    renderCards() {

        const cards = [
            {className: "cardsCard", src: backCoverImg},
            {className: "cardsCard", src: backCoverImg},
            {className: "cardsCard", src: backCoverImg}
        ];

        const first = this.state.firstChoice;
        const second = this.state.secondChoice;
        const joker = this.state.jokerPosition;

        if(second !== null){
            for(let i=0; i<cards.length; i++){
                cards[i].className += " cardsUncovered";
                cards[i].src = spadesImg;
            }

            cards[joker].src = jokerImg;
            cards[second].className += " cardsSelectedCard";

        } else if(first !== null) {

            cards[first].className += " cardsSelectedCard";

            cards[this.state.uncovered].className += " cardsUncovered";
            cards[this.state.uncovered].src = spadesImg;
        }

        return (
            <div>
                {cards.map((e,i) =>
                    <img className={e.className} src={e.src} onClick={() => this.clickCard(i)}/>
                )}
            </div>
        );
    }

    clickCard = (index) => {

        if (this.state.secondChoice !== null) {
            //game is finished, nothing to do
            return;
        }

        this.setState(prev => {
            if (prev.secondChoice !== null) {
                return {};
            } else if (prev.firstChoice === null) {

                const options = positions.filter(p => p !== index && p !== this.state.jokerPosition);
                const toDisplay = options[Math.floor(Math.random() * options.length)];

                return {firstChoice: index, uncovered: toDisplay};
            } else {
                return {secondChoice: index};
            }
        });
    };
}


