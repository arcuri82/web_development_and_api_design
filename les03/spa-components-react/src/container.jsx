import React from "react";
import {Counter} from "./counter"

export class Container extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        const n = this.props.ncounters != null ? this.props.ncounters : 1;

        return (
            <div>
                <h4>Counters</h4>
                {
                    /*
                        This might look bit tricky.
                        First of all, we need to instantiate Counter components.
                        This is done by directly using JSX tag <Counter>, based
                        on the name of the component.

                        We want to do it n times.
                        So we start to create an Array(n).
                        But such array created with the Array() constructor has
                        no property. To create an array with properties from an
                        array of length n, we use "from()", otherwise the map()
                        function will NOT work. Confusing, isn't it?

                        On such array, we apply map(), which takes 2 inputs: the
                        element "e" we iterate on, but also the index "i" in the
                        iteration.
                        What we finally get from the map is an array of <Counter>
                        components, each one with different attribute "name".

                        Besides single components, in JSX we can display arrays/lists,
                        which will just concatenate the generated HTML.
                        However, we need to specify a "key" attribute that must
                        be unique. This is needed for React to optimize when components
                        need to be re-rendered
                     */
                    Array.from(Array(n))
                        .map((e,i) => <Counter name={i} key={"counter_unique_key_" + i}/>)
                }
            </div>
        );
    }
}