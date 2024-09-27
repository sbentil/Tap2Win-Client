/* eslint-disable @next/next/no-img-element */

import React from 'react'
import Countdown from './Countdown'

type Props = {}

const HeaderFragment = (props: Props) => {
    const targetDate = new Date('2025-03-24T00:00:00');

    return (
        <div className='absolute flex flex-col md:flex-row   md:p-16 justify-between items-center text-white  md:w-full h-[100px] rounded-3xl z-10'>
            <div className="flex gap-2 mt-12 md:mx-0 mx-4 md:mt-0 bg-white rounded-xl">
                <img
                    src="/assets/logo.png"
                    className="object-contain w-36 rounded"
                    alt="COMPSSA"
                />
                {/* <p className='text-lg text-primary hidden md:block'>ROTARY D9104 CAR RAFFLE</p> */}
                {/* <p className='text-lg text-primary block md:hidden'>CAR RAFFLE</p> */}
            </div>

            <div className="absolute left-[22%] md:left-0 top-[12rem] md:top-0 md:relative md:mx-0">
                <Countdown targetDate={targetDate} />
            </div>
        </div>
    )
}

export default HeaderFragment