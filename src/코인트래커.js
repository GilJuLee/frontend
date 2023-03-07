import { useState, useEffect } from "react";

function App() {
    const [loading, setLoding] = useState(true);
    const [coin, setCoins] = useState([]);
    const [cost, setCost] = useState(1);
    const [need, setNeed] = useState(1);
    const handleInput = (event) => {
        setNeed(event.target.value);
    }
    const onChange = (event) => {
        setCost(event.target.value);
        setNeed(1);
    }
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoding(false);
            });
    }, []);

    return (
        <div>
            <h1>The coins!{loading ? "" : `Here are..${coin.length} coins`}</h1>
            {loading ? <strong>loading...</strong> : <select onChange={onChange}>
                <option>Select Coin!</option>
                {coin.map((coin, index) =>
                    <option
                        key={index}
                        value={coin.quotes.USD.price}
                        id={coin.symbol}
                        symbol={coin.symbol} >
                        {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
                    </option>
                )}
            </select>}
            <h2>Please enter the amount</h2>
            <div>
                <input type="number" value={need} onChange={handleInput} placeholder="dollor" />$
            </div>
            <h2>You can get {need / cost}</h2>
        </div>
    );
}

export default App;
