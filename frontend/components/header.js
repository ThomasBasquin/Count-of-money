import React, { useEffect } from "react";
import SearchBar from "./searchBar";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import useStore from '../store';
import { Toaster, toast } from "sonner";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});

    const toggle = () => {
        setIsOpen(old => !old);
    }

    async function Logout() {
        const response = await axios.post('http://localhost:3000/api/users/logout', {
        }, {
            withCredentials: true
        }).then((res) => {
            if (res.status === 200) {
                toast.success('Logged out successfully!');
                useStore.setState({ user: {} });
                setInterval(() => {
                    window.location.replace('/dashboard');
                }, 3000);
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    useEffect(() => {
        async function getUser() {
            const dropdownHover = document.getElementById('dropdownHoverButton');
            const login = document.getElementById('login');
            const response = await axios.get('http://localhost:3000/api/users/profile', {
                withCredentials: true
            }).then((res) => {
                if (res.data) {
                    useStore.setState({ user: res.data });
                    setUser(res.data);
                    login.classList.add('hidden');
                }
            }).catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 401) {
                    dropdownHover.classList.add('hidden');
                }
            });
        }
        getUser();
    }, []);

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";

    return (
        <div className="flex flex-col items-center justify-center p-2">
            <Toaster position="bottom-center" />
            <div className="w-full flex justify-between items-center py-1 rounded-lg border border-gray-500 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
                <Link href="/dashboard">
                    <Image src="/icon.png" width={90} height={90} />
                </Link>
                <div className="flex items-center justify-end w-full">
                    <div className="md:inline-flex hidden w-full">
                        <SearchBar />
                    </div>
                    <div className="flex flex-row items-center mr-4">
                        <Link href="/dashboard/list" className="text-jumbo-500 hover:text-grey-600 px-4">Cryptos</Link>
                        <button id="dropdownHoverButton" onClick={toggle} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> {user.username}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>
                        <div id="dropdownHover" className={`z-10 absolute top-20 right-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${transClass}`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 w-full" aria-labelledby="dropdownHoverButton">
                                <li>
                                    <Link href="/dashboard/favorites" className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Crypto</Link>
                                </li>
                                <li>
                                    <a href="#" className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a onClick={() => Logout()} className="w-full block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
                        </div>
                        <div id="login">
                            <Link href="/login">
                                <button className="flex items-center focus:outline-none border rounded-full py-2 px-6 leading-none border-transparent bg-blue-700 hover:bg-blue-800 text-white mt-4 md:mt-0">Connect</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center md:hidden w-full mt-3">
                <SearchBar />
            </div>
        </div>
    );
};