import React from "react";

//Note the use of "alias" in webpack.config.js to handle "~"
import {MyHomeLink} from "~/my_home_link";

//See "style-loader" and  "css-loader" in webpack.config.js, which need to be installed.
//Note: this is installed globally, and not just for this component
import "./silly.css"

export class Silly extends React.Component {

    constructor(props) {
        super(props);

        this.state = {first: true};
    }

    static showResult() {
        alert("Congratulation! You admitted that you are silly!");
    };

    changeNo = (isLeft) => {

        if(isLeft !== this.state.first){
            this.setState((prev) => ({first: ! prev.first}));
        }
    };

    render() {

        let left = "Yes";
        let right = "No";

        if(!this.state.first){
            left = "No";
            right = "Yes";
        }

        return (
            <div>
                <h2> A Silly Game </h2>

                <p>Are you silly?</p>
                <div>
                    <div className="sillyBtn"
                         onClick={Silly.showResult}
                         onMouseOver={() => this.changeNo(true)}>
                        {left}
                        </div>
                    <div className="sillyBtn"
                         onClick={Silly.showResult}
                         onMouseOver={() => this.changeNo(false)}>
                        {right}
                        </div>
                </div>
                <MyHomeLink/>
            </div>
        );
    }
}

