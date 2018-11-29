import React from "react";

export class Counter extends React.Component{

    constructor(props){
        super(props);
        /*
            here in the constructor we can set the state directly with =,
            but it is a mistake to do it in the other methods, as otherwise
            the component would not be re-rendered on state change.
         */
        this.state = {value: 0};

        /*
            The following could be considered very confusing.
            Both "increase" and "decrease" are methods in this class.
            These will be used as callbacks in the button click even handlers.
            However, on a regular function, the keyword "this" would not resolve against this
            Counter object, because in a different context.
            So, to force the call on the Counter regardless of the context in
            which the functions are called, we need to explicitly "bind" them
            to "this" Counter here in the constructor.

            Recall that JS does not have "real" support for OO.
            The "class" keyword is just syntactic sugar.

            To avoid this issue, we can declare functions with the arrow notation,
            ie "() => {}". As we did it for decrease(), then we only need to bind
            increase().
            In general, we will prefer to use the arrow notation.
            However, we will need to use transform-class-properties in Babel to support it.
         */
        this.increase = this.increase.bind(this);
    }

    increase(){
        /*
            We must NOT use something like "this.state=..." here.
            Furthermore, we should not read the current counter
            directly with "this.state.value", because React could
            update such value asynchronously for performance reasons.
            This means that when 2 setState() are called in a row,
            by the time the second is called it might happen that the actual
            value of "this.state" has not been updated yet.

            Therefore, we need to use a version of setState() that takes
            as input a function reference. React will call such function
            for the update, by passing the previous state as input
         */
        this.setState(
            (prevState) => ({ value: prevState.value + 1})
        );
    }

    decrease = () => {
        /*
         *  This is technically wrong, as we should not read "this.state.value"
         *  directly. Recall comments from increase().
         *  However, in our example in which setState gets called only via
         *  button clicks, we might not see the fault (ie wrong counters), as
         *  the time between 2 clicks would likely be (much) higher then the
         *  asynchronous update.
         */
        this.setState({ value: this.state.value - 1});
    };

    render(){

        const name = this.props.name != null ? this.props.name : "Default";

        return(
            <div>
                <div>Counter for {name}: {this.state.value}</div>
                {/*
                    Note the use of "className" instead of "class".
                    React treats HTML attributes specially, and in camelCase.
                    For example, "onClick" instead of "onclick"

                    Also note the fact that this is not an HTML comment with
                    <!-- -->, but rather a JS comment, as inside {}.
                    Why? so the comment is not returned as string from this
                    function.
                  */}
                <div className="btn" onClick={this.increase}>+</div>
                <div className="btn" onClick={this.decrease}>-</div>
            </div>
        );
    }

}

