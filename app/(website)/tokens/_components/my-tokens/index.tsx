import React, { useState } from 'react';
import { Button } from '@/components/core';
import { ArrowUp } from 'lucide-react';
import GeneralService from '@/services';
import { formatPhoneNumber } from '@/helpers/string';
import { formatDate } from '@/helpers/datetime';
import { IToken } from '@/interfaces/token';
import toasts from '@/utils/toasts';

const MyToken = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tokenDetails, setTokenDetails] = useState<IToken[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!phoneNumber) {
            setError('Please enter a phone number.');
            setTokenDetails([]);
            return;
        }

        setLoading(true);
        setError('');
        setTokenDetails([]);

        GeneralService.myTokens(phoneNumber, (err, data) => {
            setLoading(false);
            if (err) {
                return toasts.error('My-Tokens', err, {
                    toastId: 'my-tokens',
                    position: 'bottom-center'
                });
            } else {
                setTokenDetails(data);
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-start h-full p-4 mt-10">
            <div className="flex flex-col items-center w-full max-w-md">
                <h2 className="text-lg text-primary font-thin mb-4">Enter your Phone number to check tokens</h2>
                <div className="relative w-full mb-4">
                    <input
                        type="text"
                        placeholder="Enter your Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-4 rounded-full border border-gray bg-gray-light text-primary placeholder-gray-400 outline-none text-lg"
                    />
                    <Button
                        onClick={handleVerify}
                        loading={loading}
                        className="flex gap-x-1 absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-4 py-2 bg-primary text-white text-sm font-semibold"
                    >
                        <ArrowUp />
                        <span>Lookup</span>
                    </Button>
                </div>
                {/* {error && <p className="text-red-500 my-4">{error}</p>} */}
                {tokenDetails.length > 0 && (
                    <div className="w-full space-y-4 text-gray">
                        <h3 className="font-semibold text-xl">Your Token Details - ({tokenDetails.length}):</h3>
                        {/* Added max-height and overflow-y-auto for scrolling */}
                        <div className="grid gap-4 max-h-96 overflow-y-auto pb-6">
                            {tokenDetails.map((tokenDetail, index) => (
                                <div key={tokenDetail._id} className="p-4 bg-white cursor-pointer hover:shadow-sm rounded-lg border border-gray">
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm text-gray font-bold'>{index + 1}</p>
                                        <p className='text-sm text-gray'>{tokenDetail._id}</p>
                                    </div>
                                    <h4 className="text-primary font-semibold">Token: {tokenDetail.token}</h4>
                                    <div>
                                        <p className="text-gray">Purchased on: {formatDate(tokenDetail.createdAt, true)}</p>
                                        <p className="text-gray">Via: {tokenDetail.transaction?.channel ?? "USSD"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyToken;
