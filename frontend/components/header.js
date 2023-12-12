import React from "react";
import SearchBar from "./searchBar";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";

    return (
        <div className="flex flex-col items-center justify-center p-2">
            <div className="w-full flex justify-between items-center py-1 rounded-lg border-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
                <Link href="/dashboard">
                    <Image src="/icon.png" width={90} height={90} />
                </Link>
                <div className="flex items-center justify-end w-full">
                    <div className="md:inline-flex hidden w-full">
                        <SearchBar />
                    </div>
                    <div className="flex flex-row items-center mr-4">
                        <Link href="/dashboard/list" className="text-jumbo-500 hover:text-grey-600 px-4">Cryptos</Link>
                        <button id="dropdownHoverButton" onClick={toggle} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Profile <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>
                        <div id="dropdownHover" className={`z-10 absolute top-20 right-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${transClass}`}>
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 w-full" aria-labelledby="dropdownHoverButton">
                                <li>
                                    <a href="#" class="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your crypto</a>
                                </li>
                                <li>
                                    <a href="#" class="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" class="w-full block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
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