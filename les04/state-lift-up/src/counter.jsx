import React from "react";

export class Counter extends React.Component{

    constructor(props){
        super(props);

        this.state = {value: 0};
    }

    /*
        Every time we increase/decrease the local counter, we also
        update the global one in the container
     */

    increase = () =>{
        this.setState(prev => ({ value: prev.value + 1}));
        this.props.containerIncrease();
    };

    decrease = () => {
        this.setState(prev => ({ value: prev.value - 1}));
        this.props.containerDecrease();
    };


    render(){

        /*
            The "local" counter is stored in a _mutable_ state inside this
            class in "this.state".
            The "global" counter is passed as input to this component
            as a property in "this.props".
            Properties are supposed to be "read-only" and should not be modified
            directly. To modify them, we need to trigger a state change in the
            parent component, which will pass the new modified value when re-rendering
            this component.
            So, to trigger such state change in parent component, we need to have a call
            on a method on the parent component.
            But a child component has no direct reference to the parent.
            So, such method need to be given as input by the parent itself, passing their
            references as properties in "this.props".
         */

        const name = this.props.name != null ? this.props.name : "Default";

        return(
            <div>
                <div>Counter for {name}: {this.state.value}</div>
                <div>Container counter: {this.props.containerCounterValue}</div>
                <div className="btn" onClick={this.increase}>+</div>
                <div className="btn" onClick={this.decrease}>-</div>
            </div>
        );
    }

}

