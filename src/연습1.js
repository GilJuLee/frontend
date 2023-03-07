import { useState, useEffect } from "react";
function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyWord] = useState("");
    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (e) => setKeyWord(e.target.value);
    // console.log("i run all the time");
    // const iRunOnlyOnce = () => {
    //   console.log("i run only once.");
    // };
    // useEffect(iRunOnlyOnce, []);
    useEffect(() => {
        if (keyword !== "" && keyword.length > 2)
            console.log("search for", keyword);
    }, [keyword]);
    useEffect(() => {
        console.log("call the api...");
    }, []);
    useEffect(() => {
        console.log("count up", counter);
    }, [counter]);
    useEffect(() => {
        console.log("something change");
    }, [counter, keyword]);
    return (
        <div>
            <input value={keyword} onChange={onChange} type="text" placeholder="Search here..." />
            <h1>clicks :{counter}</h1>
            <button onClick={onClick}>click me</button>
        </div>
    );
}

export default App;
