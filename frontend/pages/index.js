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
          y: 40,
          ease: "elastic"
        });
        gsap.to(".content", {
          duration: 1,
          y: 20,
          ease: "elastic"
        });
      }, root)

      return () => ctx.revert();
    }
      , []);
  }
  return (
    <div className='flex flex-col w-screen h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 items-center justify-around' ref={root}>
      <h1 className="text-4xl font-bold text-grey-800 text-white text-center title">Count Of Money</h1>
      <div className='coin h-fit w-fit'>
        <Spline scene="https://draft.spline.design/SC5GjCTuXT3BkWH0/scene.splinecode" />
      </div>
      <div className='w-2/3 flex flex-col items-center justify-center'>
        <p className='text-white font-semibold text-center content'>
          Hello, welcome to Count Of Money. This is a simple app that allows you to track your cryptocurrencies and have lot of statistics about them.
        </p>
        <div className='content mt-12'>
          <button className='bg-black border-2 border-solid border-white rounded-lg text-white p-3 hover:bg-white hover:text-black animate-bounce hover:animate-none'><Link href="/dashboard">Dashboard</Link></button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
