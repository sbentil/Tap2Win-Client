/* eslint-disable @next/next/no-img-element */
"use client"; // Ensure this is a client component

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Head from 'next/head';
import ImageCarousel from '../fragments/ImageCarousel';
import Link from 'next/link';
import MyToken from './_components/my-tokens';
import { Tabs } from '@/components/core';
import VerifyToken from './_components/verify';

const Tokens = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const myTokenValue = searchParams.get('my-token');
    const verifyValue = searchParams.get('verify');

    // Determine the active tab based on URL params
    const initialTab = myTokenValue === '1' ? 'my-token' : verifyValue === '1' ? 'verify' : 'my-token';
    const [activeTab, setActiveTab] = useState(initialTab);

    // Tabs configuration
    const tabs = [
        { value: 'my-token', label: 'My Tickets(s)' },
        { value: 'verify', label: 'Verify Tickets' },
    ];

    // Effect to update URL when active tab changes
    useEffect(() => {
        const params = new URLSearchParams();
        if (activeTab === "my-token") {
            params.set('my-token', '1');
        } else if (activeTab === 'verify') {
            params.set('verify', '1');
        }
        router.replace(`/tokens?${params.toString()}`);
    }, [activeTab, router]);

    return (
        <div className='bg-white h-screen w-screen relative flex flex-col'>
            <Head>
                <title>ROTARY D9104 CAR RAFFLE</title>
                <meta name="description" content="ROTARY D9104 CAR RAFFLE" />
                <link rel="icon" href="/assets/logo.png" />
            </Head>
            <ImageCarousel />
            {/* Navbar */}
            <div className="bg-gray-light flex items-center justify-between px-4 shadow-md z-50">
                <Link href={"/"} className="flex">
                    <img
                        src="/assets/logo.png"
                        className="object-contain w-36 rounded"
                        alt="COMPSSA"
                    />
                </Link>
                <div>
                    <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            </div>
            <div className="tab-content min-h-screen z-50">
                {activeTab === 'my-token' && <MyToken />}
                {activeTab === 'verify' && <VerifyToken />}
            </div>
        </div>
    );
};

export default Tokens;
