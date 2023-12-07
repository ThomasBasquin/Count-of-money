import React from "react";
import SearchBar from "./searchBar";
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <div className="flex items-center justify-center p-2">
            <div className="w-full flex justify-between items-center py-1 rounded-lg border-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
                <Image src="/icon.png" width={90} height={90}/>
                <div className="flex items-center justify-end w-full">
                    <div className="md:inline-flex hidden w-full">
                        <SearchBar />
                    </div>
                    <div>
                        <Link href="/" className="text-jumbo-500 hover:text-grey-600 px-4">Home</Link>
                        <Link href="/dashboard/list" className="text-jumbo-500 hover:text-grey-600 px-4">Cryptos</Link>
                        <Link href="/dashboard/contact" className="text-jumbo-500 hover:text-grey-600 px-4">Contact</Link>
                    </div>
                </div>
            </div>
            <div className="flex justify-between py-2 mx-1 items-center md:hidden">
                <SearchBar />
            </div>
        </div>
    );
};