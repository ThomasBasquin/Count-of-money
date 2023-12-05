"use client"
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useStore } from '../store'

let tvScriptLoadingPromise;

export default function Dashboard() {
    const [cryptos, setCryptos] = useState([]);
    const [crypto, setCrypto] = useState({});
    const onLoadScriptRef = useRef();

    async function getCrypto() {
        const response = await axios.get('http://localhost:3000/api/cryptos');
        setCryptos(response.data);
        // TODO: Set the first crypto as default, it's always BTC and a temporary solution.
        let tab = [];
        for (let i = 0; i != response.data.length; i++) {
            tab.push(
            <div className="border border-gray-900 p-1 my-2">
                <h1>{response.data[i].name}</h1>
            </div>
            )
        }
        setCrypto(response.data[0]);
        setCryptos(tab);
    }

    useEffect(
        () => {
            getCrypto();
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
                if (document.getElementById('tradingview_0f7cf') && 'TradingView' in window) {
                    new window.TradingView.widget({
                        autosize: true,
                        symbol: "BITSTAMP:BTCUSD",
                        interval: "60",
                        timezone: "Etc/UTC",
                        theme: "light",
                        style: "1",
                        locale: "fr",
                        enable_publishing: false,
                        allow_symbol_change: false,
                        container_id: "tradingview_0f7cf"
                    });
                }
            }
        },
        []
    );
    return (
        <div className="rounded-lg border h-full p-4 m-2 flex flex-row">
            <div className="rounded-sm border mr-2 w-1/3 p-4 h-full">
                <div className="flex flex-col justify-between h-1/4">
                    <div className="flex flex-row w-full items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">{crypto.name}</h1>
                            <p className="text-xl">{crypto.cmid}</p>
                        </div>
                        <Image src={crypto.imageUrl} alt={crypto.name} width={50} height={50} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xl">Current Price : {crypto.currentPrice} €</p>
                        <p className="text-xl">Price change last 7d: {crypto.priceChangePercentage7d} %</p>
                    </div>
                </div>
            </div>
            <div className='tradingview-widget-container' style={{ height: "100%", width: "100%" }}>
                <div id='tradingview_0f7cf' style={{ height: "calc(100% - 32px)", width: "100%" }} />
                <div className="tradingview-widget-copyright">
                    <a href="https://fr.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Suivre tous les marchés sur TradingView</span></a>
                </div>
            </div>

        </div>
    );
}