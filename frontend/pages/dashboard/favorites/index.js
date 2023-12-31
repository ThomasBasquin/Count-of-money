import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/header';
import Image from 'next/image';
import useStore from '../../../store';

const HomePage = () => {

    const [cryptos, setCryptos] = useState([]);
    const [filteredCryptos, setFilteredCryptos] = useState([]);
    const [data, setData] = useState([]);

    const searchString = useStore(state => state.searchString);
    const searchStatus = useStore(state => state.searchStatus);

    function fillPage(tabToSearchIn) {
        let tabToFill = [];
        for (let i = 0; i != tabToSearchIn.length; i++) {
            tabToFill.push(
            <div className=" px-3 py-1 m-2 rounded-full bg-gradient-to-r from-gray-700 via-gray-900 to-black border border-gray-500" key={i}>
                <div className='grid grid-cols-6'>
                    <div className='grid grid-cols-2 my-auto'>
                        <div className='mx-3 w-fit m-auto'>
                            <Image src={tabToSearchIn[i].imageUrl} alt={tabToSearchIn[i].name} width={75} height={75} />
                        </div>
                        <div className='text-white font-bold'>
                            <h1 className='font-bold'>{tabToSearchIn[i].name}</h1>
                            <h1>[{tabToSearchIn[i].cmid}]</h1><br/>
                            <h1>{tabToSearchIn[i].currentPrice.toFixed(2)} €</h1>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <h1 className='m-auto text-white text-lg'>Today: </h1>
                        <div className='flex flex-col text-white font-bold m-auto'>
                            <h1 className='text-green-500'>{tabToSearchIn[i].highestPriceOfDay} € ↑</h1>
                            <h1 className='mx-auto'>|</h1>
                            <h1 className='text-red-500'>{tabToSearchIn[i].lowestPriceOfDay} € ↓</h1>
                        </div>
                    </div>
                    <div className='grid grid-rows-2 w-1/2'>
                        <div className='ml-5 underline underline-offset-2 text-white'>
                            <h1>Last Hour :</h1>
                        </div>
                        <div className='m-auto'>
                            {
                                tabToSearchIn[i].priceChangePercentage1h != null ? (
                                    tabToSearchIn[i].priceChangePercentage1h > 0 ? (
                                        <div className='text-green-500 font-bold'>
                                            <h1>{tabToSearchIn[i].priceChangePercentage1h.toFixed(2)}%</h1><br/>
                                        </div>
                                    ) :
                                    (
                                        <div className='text-red-500 font-bold'>
                                            <h1>{tabToSearchIn[i].priceChangePercentage1h.toFixed(2)}%</h1><br/>
                                        </div>
                                    )
                                ) :
                                (
                                    <div className='text-gray-500 font-bold'>
                                        <h1>No Data</h1><br/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='grid grid-rows-2 w-1/2'>
                        <div className='ml-5 underline underline-offset-2 text-white'>
                            <h1>Last Day :</h1>
                        </div>
                        <div className='m-auto'>
                            {
                                tabToSearchIn[i].priceChangePercentage24h != null ? (
                                    tabToSearchIn[i].priceChangePercentage24h > 0 ? (
                                        <div className='text-green-500 font-bold'>
                                            <h1>{tabToSearchIn[i].priceChangePercentage24h.toFixed(2)}%</h1><br/>
                                        </div>
                                    ) :
                                    (
                                        <div className='text-red-500 font-bold'>
                                            <h1>{tabToSearchIn[i].priceChangePercentage24h.toFixed(2)}%</h1><br/>
                                        </div>
                                    )
                                ) :
                                (
                                    <div className='text-gray-500 font-bold'>
                                        <h1>No Data</h1><br/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='grid grid-rows-2 w-1/2'>
                        <div className='ml-5 underline underline-offset-2 text-white'>
                            <h1>Last 7 Days :</h1>
                        </div>
                        <div className='m-auto'>
                            {
                                tabToSearchIn[i].priceChangePercentage7d != null ? (
                                    tabToSearchIn[i].priceChangePercentage7d > 0 ? (
                                        <div className='text-green-500 font-bold'>
                                            <h1>{tabToSearchIn[i].priceChangePercentage7d.toFixed(2)}%</h1><br/>
                                        </div>
                                    ) :
                                    (
                                        <div className='text-red-500 font-bold'>
                                            <h1>{tabToSearchIn[i].priceChangePercentage7d.toFixed(2)}%</h1><br/>
                                        </div>
                                    )
                                ) :
                                (
                                    <div className='text-gray-500 font-bold'>
                                        <h1>No Data</h1><br/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='grid grid-rows-2 w-1/2'>
                        <div className='ml-5 underline underline-offset-2 text-white'>
                            <h1>Last Month :</h1>
                        </div>
                        <div className='m-auto'>
                            {
                                tabToSearchIn[i].priceChangePercentage30d != null ? (
                                    tabToSearchIn[i].priceChangePercentage30d > 0 ? (
                                        <div className='text-green-500 font-bold'>
                                            <h1>{tabToSearchIn[i].priceChangePercentage30d.toFixed(2)}%</h1><br/>
                                        </div>
                                    ) :
                                    (
                                        <div className='text-red-500 font-bold'>
                                            <h1>{tabToSearchIn[i].priceChangePercentage30d.toFixed(2)}%</h1><br/>
                                        </div>
                                    )
                                ) :
                                (
                                    <div className='text-gray-500 font-bold'>
                                        <h1>No Data</h1><br/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        return tabToFill;
    }

    async function getCrypto() {
        const response = await axios.get('http://localhost:3000/api/users/favorites', {
            withCredentials: true
        }).catch((err) => {
            if (err.response.status === 401) {
                window.location.href = '/login';
            }
            console.log(err);
        }
        );


        setData(response.data?.favorites);
        setCryptos(fillPage(response.data.favorites));
    }

    useEffect(() => {
        getCrypto();
    }, [])

    useEffect(
        () => {
            const filteredCryptos = data.filter(crypto => crypto.name.toLowerCase().includes(searchString.toLowerCase()));
            setCryptos(fillPage(filteredCryptos));
        },
        [searchString]
    );

    return (
        <div className='flex flex-col w-screen h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900'>
            <Header />
            <div className='overflow-x-auto'>
                {cryptos}
            </div>
        </div>
    );
};

export default HomePage;