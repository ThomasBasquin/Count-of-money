import React, { useEffect, useRef, useState } from 'react';
import Header from '../../../components/header';
import axios from 'axios';

const HomePage = () => {

    const [cryptos, setCryptos] = useState([]);

    async function getCrypto() {
        const response = await axios.get('http://localhost:3000/api/cryptos');
        // TODO: Set the first crypto as default, it's always BTC and a temporary solution.
        let tab = [];
        for (let i = 0; i != response.data.length; i++) {
            tab.push(
            <div className="border border-gray-900 p-1 my-2">
                <h1>{response.data[i].name}</h1>
            </div>
            )
        }
        setCryptos(tab);
    }

    useEffect(() => {
        getCrypto();
        console.log(cryptos)
    })

    return (
        <div className='flex flex-col w-screen h-screen'>
            <Header />
            <div>
                {cryptos}
            </div>
        </div>
    );
};

export default HomePage;
