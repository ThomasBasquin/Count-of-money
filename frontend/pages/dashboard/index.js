import React, { use } from 'react';
import Header from '../../components/header';
import Dashboard from '../../components/dashboard';
import useStore from '../../store';

const HomePage = () => {


    return (
        <div className='flex flex-col w-screen h-screen'>
            <Header />
            <Dashboard />
        </div>
    );
};

export default HomePage;
