import {update} from "./MyDOM"

let id_counter = 0;

export class MyComponent {

    constructor() {
        this.id = "MyComponent_id_" + id_counter;
        id_counter++;
    }

    setState(state) {

        this.state = state;

        update();
    }

    doesMatchId(id) {
        return this.id === id;
    }

    methodHandler(method) {

        const name = method.name;

        return "'MyDOM_callMethodOnComponent(\"" + this.id + "\", \"" + name + "\")'";
    }
}