import {MyComponent} from "./mylib/MyComponent";


export class Counter extends MyComponent {

    constructor(name) {
        super();
        this.name = name;
        this.state = {value: 0};
    }

    increase() {
        this.setState({value: this.state.value + 1});
    }

    decrease() {
        this.setState({value: this.state.value - 1});
    }

    render() {

        const name = this.name != null ? this.name : "Default";

        return (
            "<div>" +
            "<div>Counter for " + this.name + ": " + this.state.value + "</div>" +
            "<div class='btn' onclick="+ this.methodHandler(this.increase)+">+</div>" +
            "<div class='btn' onclick="+ this.methodHandler(this.decrease)+">-</div>" +
            "</div>"
        );
    }

}