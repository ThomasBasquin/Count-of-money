"use client"
import React, { use, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import useStore from '../store';
import { toast } from 'sonner';

let tvScriptLoadingPromise;

export default function Dashboard() {
    const [cryptos, setCryptos] = useState([]);
    const [crypto, setCrypto] = useState({});
    const [favorites, setFavorites] = useState([]);
    const onLoadScriptRef = useRef();
    const searchString = useStore(state => state.searchString);
    const searchStatus = useStore(state => state.searchStatus);
    const setSearchStatus = useStore(state => state.setSearchStatus);
    const [isFavorite, setIsFavorite] = useState(false);

    async function getCrypto() {
        const response = await axios.get('http://localhost:3000/api/cryptos');
        console.log(response.data);
        setCryptos(response.data);
        // TODO: Set the first crypto as default, it's always BTC and a temporary solution.
        setCrypto(response.data[0]);
    }

    async function getFavorites() {
        const response = await axios.get('http://localhost:3000/api/users/favorites', {
            withCredentials: true
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                setFavorites(res.data.favorites);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    async function addToFavorites(cmid) {
        if (isFavorite) {
            const response = await axios.post('http://localhost:3000/api/users/favorites/remove', {
                "cmid": cmid
            }, {
                withCredentials: true
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    getFavorites();
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            const response = await axios.post('http://localhost:3000/api/users/favorites/add', {
                "cmid": cmid
            }, {
                withCredentials: true
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    getFavorites();
                }
            }).catch((err) => {
                if (err.response.status === 401) {
                    toast.error('You must be logged in to add a favorite.');
                }

                console.log(err);
            });
        }
    }

    useEffect(
        () => {
            getFavorites();
            getCrypto();
            setSearchStatus(!searchStatus);
        }
        , []);

    useEffect(
        () => {
            setIsFavorite(false);
            console.log(favorites)
            favorites.forEach(fav => {
                if (fav.cmid === crypto.cmid) {
                    setIsFavorite(true);
                }
            });
            console.log(isFavorite);
        }
        , [crypto, favorites]
    );

    useEffect(
        () => {
            onLoadScriptRef.current = createWidget;

            if (!tvScriptLoadingPromise) {
                tvScriptLoadingPromise = new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.id = 'tradingview-widget-loading-script';
                    script.src = 'https://s3.tradingview.com/tv.js';
                    script.type = 'text/javascript';
                    script.onload = resolve;

                    document.head.appendChild(script);
                });
            }

            tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

            return () => onLoadScriptRef.current = null;

            function createWidget() {
                let symbol = `${crypto.cmid}USD`;
                if (crypto.cmid === undefined) {
                    symbol = "BTCUSD";
                }
                if (document.getElementById('tradingview_0f7cf') && 'TradingView' in window) {
                    new window.TradingView.widget({
                        autosize: true,
                        symbol: symbol,
                        interval: "60",
                        timezone: "Etc/UTC",
                        theme: "dark",
                        style: "1",
                        locale: "fr",
                        enable_publishing: false,
                        allow_symbol_change: false,
                        container_id: "tradingview_0f7cf"
                    });
                }
            }
        },
        [searchStatus]
    );

    useEffect(
        () => {
            const filteredCryptos = cryptos.filter(crypto => crypto.name.toLowerCase().includes(searchString.toLowerCase()));
            if (filteredCryptos.length > 0) {
                setCrypto(filteredCryptos[0]);
            }
        },
        [searchString]
    );
    return (
        <div className="rounded-lg border h-full p-4 m-2 flex flex-row bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <div className="rounded-sm border mr-2 w-1/3 p-4 h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700">
                <div className="flex flex-col justify-between h-1/4">
                    <div className="flex flex-col sm:flex-row w-full items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-white">{crypto.name}</h1>
                            <p className="text-lg md:text-xl text-white">{crypto.cmid}</p>
                        </div>
                        <Image src={crypto.imageUrl} alt={crypto.name} width={50} height={50} className='mt-2 sm:mt-0' />
                    </div>
                    <div className='w-full border-2 border-gray-500 rounded-lg mt-2 mb-2 md:invisible'>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
                        <div className="flex flex-col">
                            <p className="text-md md:text-lg text-white">Current Price : {crypto.currentPrice?.toFixed(2)} €</p>
                            <p className="text-md md:text-lg text-white">Price change last 7d: {crypto.priceChangePercentage7d?.toFixed(2)} %</p>
                        </div>
                        <button onClick={() => addToFavorites(crypto.cmid)}>
                            {isFavorite ? (<img className='animate-bounce' width="40" height="40" src="https://img.icons8.com/fluency/48/star--v1.png" alt="star--v1" />) : (<img width="40" height="40" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />)
                            }
                        </button>
                    </div>
                    <div className='w-full border-2 border-gray-500 rounded-lg mt-4'>
                    </div>
                </div>
            </div>
            <div className='tradingview-widget-container' style={{ height: "100%", width: "100%" }}>
                <div id='tradingview_0f7cf' style={{ height: "calc(100% - 32px)", width: "100%" }} />
                <div className="tradingview-widget-copyright">
                    <a href="https://fr.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="white-text">Suivre tous les marchés sur TradingView</span></a>
                </div>
            </div>

        </div>
    );
}