import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
    const [blockNumber, setBlockNumber] = useState();
    const [transactions, setTransactions] = useState([]);

    async function getBlockNumber() {
        setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getBlockWithTransactions() {
        const blockWithTransactions =
            await alchemy.core.getBlockWithTransactions();
        setTransactions(blockWithTransactions.transactions);
    }

    useEffect(() => {
        getBlockNumber();
        getBlockWithTransactions();
    }, []);

    return (
        <>
            <div className="App">Block Number: {blockNumber}</div>
            <div className="App">Transactions: {console.log(transactions)}</div>
        </>
    );
}

export default App;
