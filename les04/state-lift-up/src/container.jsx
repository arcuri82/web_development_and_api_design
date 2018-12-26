import React from "react";
import {Counter} from "./counter"

export class Container extends React.Component {

    constructor(props) {
        super(props);

        this.state = {containerCounterValue: 0}
    }

    containerIncrease = () =>{
        this.setState(prev => ({ containerCounterValue: prev.containerCounterValue + 1}));
    };

    containerDecrease = () => {
        this.setState(prev => ({ containerCounterValue: prev.containerCounterValue - 1}));
    };


    render() {

        const n = this.props.ncounters != null ? this.props.ncounters : 1;

        return (
            <div>
                <h4>Counters</h4>
                {
                    /*
                        Each child will get the value of the "global" counter, plus
                        references to methods in this container component to modify
                        such state.
                        Every time these methods are invoked by a child and the state changes,
                        each child component is re-drawn, and gets as input the new modified
                        "global" counter, passed as a property.
                     */
                    Array.from(Array(n))
                        .map((e,i) => <Counter
                            name={"C" + i}
                            key={"counter_unique_key_" + i}
                            containerCounterValue={this.state.containerCounterValue}
                            containerIncrease={this.containerIncrease}
                            containerDecrease={this.containerDecrease}
                        />)
                }
            </div>
        );
    }
}