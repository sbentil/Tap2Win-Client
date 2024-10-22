"use client"

import React, { useEffect } from 'react';

import Head from 'next/head';
import HeaderFragment from './fragments/Header';
import ImageCarousel from './fragments/ImageCarousel';
import PaymentConfirmation from '@/components/confirmPayment';
import TokenPurchaseForm from '@/components/forms/buy';
import TripDetailsPage from './fragments/TripDetails';

type Props = {};
export interface IPaymentData {
    status: "success" | "failure",
    reference: string,
    checkoutid: string,
}

const Page = (props: Props) => {
    const [buying, setBuying] = React.useState(false);
    const [payment, setPayment] = React.useState(false);
    const [paymentData, setPaymentData] = React.useState<IPaymentData | null>(null)

    useEffect(() => {
        // Get the current URL's search parameters
        const urlParams = new URLSearchParams(window.location.search);
        const action = urlParams.get('action');


        // Check if action is 'purchase' and set buying status accordingly
        if (action === 'purchase') {
            setBuying(true);
        }
        if (action === 'payment') {
            setPaymentData({
                status: urlParams.get('status') as "success" | "failure",
                reference: urlParams.get('reference') as string,
                checkoutid: urlParams.get('checkoutid') as string,
            });
            setPayment(true);
        }
    }, []); // Empty dependency array ensures this runs once on mount

    const handleBuyClick = (state: boolean) => {
        //set action to purchase in the URL if state is true, else remove the action parameter
        const urlParams = new URLSearchParams(window.location.search);
        if (state) {
            urlParams.set('action', 'purchase');
        } else {
            urlParams.delete('action');
        }
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, '', newUrl);
        setBuying(state);
    }

    return (
        <div className='explore h-screen w-screen'>
            <Head>
                <title>ROTARY D9104 CAR RAFFLE</title>
                <meta name="description" content="ROTARY D9104 CAR RAFFLE" />
                <link rel="icon" href="/assets/logo.png" />
            </Head>

            <HeaderFragment buying={buying} />

            <ImageCarousel />
            {
                buying ? <TokenPurchaseForm onClose={() => handleBuyClick(false)} /> : (payment && paymentData) ? <PaymentConfirmation {...paymentData} /> : (
                    <div className="w-full md:w-[750px] md:h-1/3 md:px-16 py-4 absolute bottom-4 md:bottom-6">
                        <p className='px-4 text-xl font-bold text-[#F3A118] font-GeistMono text-shadow-lg'>
                            A raffle to fundraise to
                        </p>
                        <h1 className='p-4 text-white text-xl md:text-2xl leading-tight text-pretty font-semibold font-VietnamPro text-shadow-md'>
                            support the construction of 300 Solar Vaccine Shelters in deprived communities across Ghana
                        </h1>
                        <TripDetailsPage onBuyClose={() => handleBuyClick(true)} />
                    </div>
                )
            }
            {

            }
        </div>
    );
}

export default Page;
