import React, { useEffect, useState } from "react";

import { MessageQuestion } from "iconsax-react";

type Props = {
  targetDate: Date;
};

const Countdown: React.FC<Props> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      } else {
        const days = String(
          Math.floor(distance / (1000 * 60 * 60 * 24))
        ).padStart(2, "0");
        const hours = String(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).padStart(2, "0");
        const minutes = String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");
        const seconds = String(
          Math.floor((distance % (1000 * 60)) / 1000)
        ).padStart(2, "0");

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center md:mt-12 p-4 rounded-3xl bg-white md:bg-transparent md:shadow-none sm:bg-glass-bg sm:backdrop-blur-md sm:shadow-glass-shadow">
      <h1 className="text-xl md:text-3xl font-semibold flex gap-2 justify-center items-center md:mb-4 text-primary font-BeVietnamPro">
        Draw Countdown
        {/* <span className='h-4 w-4 text-gray-500 cursor-pointer' onClick={() => setShowModal(!showModal)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
        </span> */}
        <MessageQuestion
          size={20}
          className="text-sm cursor-pointer"
          onClick={() => setShowModal(!showModal)}
        />
      </h1>
      <div className="flex space-x-4 text-center">
        <div className="p-2 bg-zinc-200 rounded-lg">
          <span className="text-3xl font-semibold font-GeistMono text-primary">
            {timeLeft.days}
          </span>
          <div className="text-sm text-text">Days</div>
        </div>
        <div className="p-2 bg-zinc-200 rounded-lg">
          <span className="text-3xl font-semibold font-GeistMono text-primary">
            {timeLeft.hours}
          </span>
          <div className="text-sm text-text">Hours</div>
        </div>
        <div className="p-2 bg-zinc-200 rounded-lg">
          <span className="text-3xl font-semibold font-GeistMono text-primary">
            {timeLeft.minutes}
          </span>
          <div className="text-sm text-text">Minutes</div>
        </div>
        <div className="p-2 bg-zinc-200 rounded-lg">
          <span className="text-3xl font-semibold font-GeistMono text-primary">
            {timeLeft.seconds}
          </span>
          <div className="text-sm text-text">Seconds</div>
        </div>
      </div>

      {showModal && (
        <div className="absolute flex flex-col items-center justify-start mt-12 w-[315px] bg-white rounded-3xl ">
          <div className="text-sidebar py-4 px-1 rounded-lg ">
            <h2 className="text-xl font-BeVietnamPro font-medium">
              Contact Information
            </h2>
            <p className="mb-2 font-BeVietnamPro text-sm">
              For more information, please contact
            </p>
            <p className="font-CabinetGrotesk font-semibold">
              +233 55 511 1333 · +233 20 191 1493
            </p>
            <p className="font-CabinetGrotesk">example@gmail.com</p>
            <button
              className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-full"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
