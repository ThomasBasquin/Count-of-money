import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function Dashboard() {
    const onLoadScriptRef = useRef();

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
            <div className="rounded-sm border mr-2 w-1/3 p-4">
                <p>Test</p>
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