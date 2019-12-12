import React, {useState} from "react";

export function Counter(props) {

    /*
        - new state, with default value 0
        - useState will return an array with two values
        - the first array value will be saved in a variable called 'count'
        - the second array value will be saved in a variable called 'setCount'
     */
    const [count, setCount] = useState(0);

    const name = props.name != null ? props.name : "Default";

    return (
        <div>
            <div>Counter for {name}: {count}</div>
            <div className="btn" onClick={() => setCount(count + 1)}>+</div>
            <div className="btn" onClick={() => setCount(count - 1)}>-</div>
        </div>
    );
}



