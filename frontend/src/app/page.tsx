'use client';
import React, { useState } from 'react';
import Navigation from '../components/nav';
import Login from './login/page';
import { motion } from "motion/react"
import Link from "next/link";

function Home() {
  return (
    <motion.div className='bg-radial-gradient h-[calc(100vh-5rem)]'
      initial={{ background: 'radial-gradient(circle at bottom, rgba(237,233,254,1) 0%, rgba(255,255,255,1) 100%)' }}
      animate={{ background: 'radial-gradient(circle at bottom, rgba(165,180,252,1) 0%, rgba(255,255,255,1) 100%)' }}
      transition={{ duration: 2, ease: "easeInOut" }}>
      <div className='flex justify-center items-center h-full flex-col'>
      <motion.h1 initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} transition={
          {
            duration: 2,
            ease: "easeInOut",
            delay: 0.5
          }
        } className='text-5xl text-center font-bold capitalize'>Ideas are the blueprint. <br />Execution is the reality.</motion.h1>
        <div className='buttons flex space-x-6 mt-6'>
          <motion.button initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} transition={
              {
                duration: 0.5,
                ease: "easeInOut",
                delay: 2.5
              }
            } className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-8 rounded-full w-36'><Link href="/login">Login</Link></motion.button>
          <motion.button initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} transition={
              {
                duration: 0.5,
                ease: "easeInOut",
                delay: 2.5
              }
            } className='bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-8 rounded-full w-36'><Link href="/register">Register</Link></motion.button>
        </div>
        </div>
    </motion.div>
  );
}

export default Home;