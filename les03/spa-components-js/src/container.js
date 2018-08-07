import {MyComponent} from "./mylib/MyComponent";
import {Counter} from "./counter";


export class Container extends MyComponent {

    constructor(n) {
        super();
        this.children = Array(n);

        for (let i = 0; i < n; i++) {
            this.children[i] = new Counter(i);
        }
    }

    render() {

        return (
            " <div>" +
            "<h4>Counters</h4>" +
            this.children.map(e => e.render()).join("") +
            "</div>"
        );
    }
}