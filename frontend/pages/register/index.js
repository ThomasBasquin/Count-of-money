"use client"
import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

const Register = () => {
    const { width, height } = useWindowSize()
    const [success, isSuccessful] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', {
                email,
                username,
                password
            });
            console.log(response.data);
            toast.success('Votre compte a bien été créé !')
            isSuccessful(true);
            // Gérer la réponse ici, comme rediriger l'utilisateur ou afficher un message de succès
        } catch (error) {
            console.error('Erreur de connexion', error);
            toast.error('Une erreur est survenue')
            // Gérer les erreurs ici, comme afficher un message d'erreur
        }
    };

    return (
        <>
            {
                success && (
                    <Confetti width={width} height={height} />
                )
            }
            <section className="bg-gray-50 dark:bg-gray-900 w-screen h-screen">
                <Toaster position="bottom-center" />
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        Count Of Money
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign up an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                    <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Sign up</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account ? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;