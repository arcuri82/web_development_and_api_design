import {MyComponent} from "./mylib/MyComponent";
import {render} from "./mylib/MyDOM";
import {Container} from "./container";

class App extends MyComponent {

    constructor() {
        super();

        this.container = new Container(3);
        this.children = [this.container];
    }

    render() {
        return (
            "<div>" +
            "<h2>Example of Single-Page Application Components with Vanilla JavaScript</h2>" +
            this.container.render() +
            "</div>"
        );
    }
}


render(new App(), document.getElementById("root"));