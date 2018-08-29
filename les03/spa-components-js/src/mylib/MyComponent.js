import {update} from "./MyDOM"

let id_counter = 0;

export class MyComponent {

    constructor() {
        //each component will have a unique id
        this.id = "MyComponent_id_" + id_counter;
        id_counter++;
    }

    setState(state) {

        this.state = state;

        //every time there is a state change, we render the components
        update();
    }

    doesMatchId(id) {
        return this.id === id;
    }

    /*
        In the generated HTML for the component, we will need to be able to
        register event handlers.
        But those handlers need to refer to the specific component they belong to.
        So, the generated JS in the page somehow needs to find the right component to
        use its state.
        We will use a global support function registered in MyDOM.js.

        This works, but it has limitations: the method must not have input parameters,
        and should be a method belonging to the class of the component.
     */
    methodHandler(method) {

        const name = method.name;

        return "'MyDOM_callMethodOnComponent(\"" + this.id + "\", \"" + name + "\")'";
    }
}