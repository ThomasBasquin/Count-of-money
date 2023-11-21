import React from 'react';

export default function Home() {
    return (
        <div className="bg-gray-200 h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Bienvenue sur mon site avec Next.js et Tailwind CSS</h1>
                <p className="text-gray-700">C'est un exemple de code Next.js avec Tailwind CSS.</p>
                <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700">
                Cliquez-moi
                </button>
            </div>
        </div>
    )
}