import React from "react";
import {Counter} from "./counter"

export class Container extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        const n = this.props.ncounters ? this.props.ncounters : 1;

        return (
            <div>
                <h4>Counters</h4>
                {
                    Array.from(Array(n))
                        .map((e,i) => <Counter name={i} key={"counter_unique_key_" + i}/>)
                }
            </div>
        );
    }
}