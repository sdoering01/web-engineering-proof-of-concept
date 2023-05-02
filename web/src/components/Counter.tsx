import { useState } from "react";

function Counter() {
    let [count, setCount] = useState(0);

    function handleClick() {
        console.log("clicked");
        setCount(count + 1);
    }

    return <div>
        <h1>Counter</h1>
        <button onClick={handleClick}>+</button>
        <span>{count}</span>
    </div>
}

export default Counter
