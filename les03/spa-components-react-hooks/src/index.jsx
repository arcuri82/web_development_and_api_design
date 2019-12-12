import React from "react";
import ReactDOM from "react-dom";
import {Container} from "./container";

const App = () => {

    return(
        <div>
            <h2>Example of Single-Page Application Components with React Hooks</h2>
            {/*
                This will render the HTML from the Container component with
                3 Counter components inside it.
                We simply call the name of component inside a tag.
            */}
            <Container ncounters={3}/>
        </div>
    );
};

/*
    This is where we bind our generated HTML via React to the .html file.
    Changes in the state of the React Components will automatically trigger
    the re-rendering of the HTML.
 */
ReactDOM.render(<App />, document.getElementById("root"));