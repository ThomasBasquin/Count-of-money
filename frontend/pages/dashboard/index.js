import React, { use } from 'react';
import Header from '../../components/header';
import Dashboard from '../../components/dashboard';
import useStore from '../../store';

const HomePage = () => {


    return (
        <div className='flex flex-col w-screen h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900'>
            <Header />
            <Dashboard />
        </div>
    );
};

export default HomePage;
