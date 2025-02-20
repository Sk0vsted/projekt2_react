'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isRegistered) return;

        fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.error ? data.error : data.message);

                if (!data.success) {
                    setPassword('');
                  }

                if (data.message.includes('success')) {
                    setTimeout(() => {
                        router.push('/login');
                    }, 2000);
                }
            })
            .catch((err) => { 
                setMessage('An error occurred. Please try again later.'); 
            });

        setIsRegistered(false);
    }, [isRegistered]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsRegistered(true);
    }

    return (
        <div className='flex w-full h-[calc(100vh-5rem)] justify-center bg-[url("../images/bg_register.jpg")] bg-cover bg-center'>
            <div className="flex justify-center w-2/5 h-full items-center">
                <div className="flex-col w-[465px] py-12 bg-white shadow-xl rounded-lg">
                    <div className="py-4 px-8 text w-full">
                        <h1 className="text-4xl font-bold mb-6 text-left select-none">New here?</h1>
                        <p className="text-gray-700">Don't worry! Use the form below to sign up. </p>
                    </div>
                    <div className="py-4 px-8 rounded w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email"
                                    className="block text-gray-700 text-sm font-bold mb-2 select-none">Email</label>
                                <input type="email" name="email" placeholder="E-mail" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded transition-all duration-200 ease-in-out focus:outline-none focus:border-indigo-500 border-t-0 border-r-0 border-l-0 border-b-3 focus:bg-linear-to-t focus:from-gray-100 focus:to-white"
                                    required>
                                </input>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password"
                                    className="block text-gray-700 text-sm font-bold mb-2 select-none">Password</label>
                                <input type="password" name="password" placeholder="Password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded transition-all duration-200 ease-in-out focus:outline-none focus:border-indigo-500 border-t-0 border-r-0 border-l-0 border-b-3 focus:bg-linear-to-t focus:from-gray-100 focus:to-white"
                                    required>
                                </input>
                            </div>
                            <button type="submit"
                                className="w-full bg-indigo-500 hover:bg-indigo-700 transition-all duration-150 ease-in-out hover:cursor-pointer text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline">
                                Register
                            </button>
                            <p className="mt-4 text-left" style={{ 
                                color: message.includes('success') ? 'green' : 'red'
                            }}>{message}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;