"use client"
import React from 'react'
import ImageCarousel from './fragments/ImageCarousel'
import Head from 'next/head'
import TripDetailsPage from './fragments/TripDetails'
import HeaderFragment from './fragments/Header'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='explore h-screen w-screen'>
            <Head>
                <title>ROTARY D9104 CAR RAFFLE</title>
                <meta name="description" content="ROTARY D9104 CAR RAFFLE" />
                <link rel="icon" href="/assets/logo.png" />
            </Head>
            <HeaderFragment />
            <ImageCarousel />
            <div className="w-full md:w-[750px] md:h-1/3 md:px-16 py-4 absolute bottom-4 md:bottom-6">
                <p className='px-4 text-xl font-bold text-[#F3A118] font-GeistMono text-shadow-lg'>
                    A raffle to fundraise to 
                </p>
                <h1 className='p-4 text-white text-xl md:text-2xl leading-tight text-pretty font-semibold font-VietnamPro text-shadow-md'>
                    support the construction of 300 Solar Vaccine Shelters in deprived communities across Ghana
                </h1>
                <TripDetailsPage />
            </div>
        </div>
    )
}

export default page
