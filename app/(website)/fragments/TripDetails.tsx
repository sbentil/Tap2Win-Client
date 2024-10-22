import Link from 'next/link';
import React from 'react';

type Props = {
    btnText: string;
    caption: string;
    places: {
        place: string;
    }[];
    action: () => void;
};


const TripDetails: React.FC<Props> = ({ btnText, caption, places, action }) => {
    return (
        <>
            <div className='bg-white w-[95%] mx-2 md:mx-0 md:w-full h-[65px] bg-transparent rounded-full flex justify-between items-center p-2'>
                <div className='w-1/2 h-full flex gap-2 items-center justify-start'>
                    <span className='border rounded-full h-[40px] w-[40px] p-2 text-[#777]'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-5'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' />
                        </svg>
                    </span>
                    <div className=''>
                        <h1 className='text-sm md:text-lg text-primary font-medium font-CabinetGrotesk'>{caption}</h1>
                        <ul className='flex gap-1'>
                            {places.map((place, index) => (
                                <li key={index} className='text-xs text-[#777] font-BeVietnamPro'>
                                    {place.place}
                                    {index < places.length - 1 && <span>{' · '}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <span className='border-r w-1 h-2'></span>
                <div className='w-auto'>
                    <button
                        onClick={action}
                        className='w-32 text-sm font-BeVietnamPro h-[55px] bg-primary hover:bg-opacity-50 hover:cursor-pointer text-white rounded-full'
                    >
                        {btnText}
                    </button>
                </div>

            </div>
            {/* Action Links for "My Tokens" and "Verify Token" */}
            <div className='flex gap-4 font-semibold rounded-full w-max py-2 px-4'>
                <Link href="/tokens?my-tokens=1" passHref>
                    <p className='text-sm font-BeVietnamPro text-primary underline'>
                        My Tokens
                    </p>
                </Link>
                <Link href="/tokens?verify=1" passHref>
                    <p className='text-sm font-BeVietnamPro text-primary underline'>
                        Verify Token
                    </p>
                </Link>
            </div>
        </>
    );
};


const TripDetailsPage: React.FC<{ onBuyClose: () => void }> = ({ onBuyClose }) => {
    const btnText = 'Buy Ticket';
    const caption = 'D9104 Car Raffle';
    const places = [{ place: 'For USSD' }, { place: 'Dial' }, { place: '*713*2206#' }];
    // const places = [{ place: 'Rottary' }, { place: 'D9104' }, { place: 'Car' }, { place: 'Raffle' }];

    return <TripDetails action={onBuyClose} btnText={btnText} caption={caption} places={places} />;
};

export default TripDetailsPage;
