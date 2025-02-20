'use client';
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isLogged) return;

        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.error ? data.error : data.message);

                if (data.message.includes('success')) {
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 2000);
                }
            })
            .catch((err) => { setMessage('An error occurred. Please try again later.'); });

        setIsLogged(false);
    }, [isLogged]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLogged(true);
    }

    return (
        <div className='flex w-full h-[calc(100vh-5rem)]'>
            <div className='w-4/6 bg-[url("../images/bg_login.jpg")] bg-cover bg-center'>
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={
                        {
                            duration: 2,
                            ease: "easeInOut",
                            delay: 0.5
                        }
                    }
                    className='text-3xl pl-16 pr-64 pt-48 text-white italic select-none'>If a program is designed to think, but only within the boundaries of its code, is it truly intelligent – or just a prisoner of logic, unaware of the world beyond its loops and algorithms?</motion.h1>
            </div>
            <div className="flex justify-center px-auto bg-white w-2/5 h-full items-center">
                <div className="flex-col w-[465px]">
                    <div className="py-4 px-8 text">
                        <h1 className="text-4xl font-bold mb-6 text-left select-none">Welcome back!</h1>
                        <p className="text-gray-700">Don't have an account? <Link href="/register" className='font-bold text-indigo-600 hover:underline hover:text-indigo-900'>Create a new account here!</Link>
                        </p>
                        <p className="text-gray-700">It's completely free and takes less than a minute!</p>
                    </div>
                    <div className="py-4 px-8 rounded w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email"
                                    className="block text-gray-700 text-sm font-bold mb-2 select-none">Email</label>
                                <input type="email" id="email" name="email" placeholder="E-mail" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded transition-all duration-200 ease-in-out focus:outline-none focus:border-indigo-500 border-t-0 border-r-0 border-l-0 border-b-3 focus:bg-linear-to-t focus:from-gray-100 focus:to-white"
                                    required>
                                </input>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password"
                                    className="block text-gray-700 text-sm font-bold mb-2 select-none">Password</label>
                                <input type="password" id="password" name="password" placeholder="Password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded transition-all duration-200 ease-in-out focus:outline-none focus:border-indigo-500 border-t-0 border-r-0 border-l-0 border-b-3 focus:bg-linear-to-t focus:from-gray-100 focus:to-white"
                                    required>
                                </input>
                            </div>
                            <button type="submit"
                                className="w-full bg-indigo-500 hover:bg-indigo-700 transition-all duration-150 ease-in-out hover:cursor-pointer text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline">
                                Login
                            </button>
                            <p className="mt-4 text-left" style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;