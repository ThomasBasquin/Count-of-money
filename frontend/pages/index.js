"use client"
import React from 'react';
import Header from '../components/header';
import Dashboard from '../components/dashboard';
import Spline from '@splinetool/react-spline';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

const HomePage = () => {
  const root = useRef();

  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
      const tlCoin = gsap.timeline({ repeat: -1 });
      tlCoin.to(".coin", {
        duration: 1,
        y: "-=10",
        ease: "Sine.easeInOut"
      }).to(".coin", {
        duration: 1,
        y: "+=10",
        ease: "Sine.easeInOut"
      });
      let ctx = gsap.context(() => {
        gsap.to(".title", {
          duration: 1,
          y: 5,
          ease: "elastic"
        });
        gsap.to(".content", {
          duration: 1,
          y: 10,
          ease: "elastic"
        });
      }, root)

      return () => ctx.revert();
    }
      , []);
  }
  return (
    <div className='flex flex-col w-screen h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 items-center justify-center' ref={root}>
      <div className='flex flex-col items-center justify-center w-9/12 h-4/5 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-2xl p-2'>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-500 via-blue-300 to-blue-200 inline-block text-transparent bg-clip-text text-center title h-full">Count Of Money</h1>
        <div className='w-full flex-col h-full items-center justify-center'>
          <div className='flex flex-row justify-center items-center'>
            <p className='coin text-4xl font-semibold md:w-2/5 text-center bg-gradient-to-r from-blue-500 via-blue-300 to-blue-200 md:inline-block text-transparent bg-clip-text hidden subpixel-antialiased'>
              Track your crypto
            </p>
            <div className='coin h-fit w-fit'>
              <Spline scene="https://draft.spline.design/SC5GjCTuXT3BkWH0/scene.splinecode" />
            </div>
            <p className='coin text-4xl font-semibold md:w-2/5 text-center bg-gradient-to-r from-blue-500 via-blue-300 to-blue-200 md:inline-block text-transparent bg-clip-text hidden subpixel-antialiased'>
              ...have lot of statistics
            </p>
          </div>

          <div className='w-full flex flex-col items-center justify-center'>
            <div className='w-2/3'>
              <p className='text-white font-semibold text-center content'>
                Hello, welcome to Count Of Money. This is a simple app that allows you to track your cryptocurrencies and have lot of statistics about them.
              </p>
            </div>
            <div className='content m-10'>
              <Link href="/dashboard">
                <button className='bg-black border-2 border-solid border-white rounded-lg text-white p-3 hover:bg-white hover:text-black animate-bounce hover:animate-none'>Dashboard</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
