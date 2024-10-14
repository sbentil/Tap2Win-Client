import React, { useState } from 'react';
import { Button } from '@/components/core';
import { ArrowUp } from 'lucide-react';
import GeneralService from '@/services';
import { formatDate } from '@/helpers/datetime';
import { IToken } from '@/interfaces/token';
import { Verify } from 'iconsax-react';
import toasts from '@/utils/toasts';

const VerifyToken = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [token, setToken] = useState('');
    const [tokenDetails, setTokenDetails] = useState<IToken | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!phoneNumber || !token) {
            setError('Please enter both phone number and token.');
            setTokenDetails(null);
            return;
        }

        setLoading(true);
        setError('');
        setTokenDetails(null);

        GeneralService.verifyToken(phoneNumber, token, (err, data) => {
            setLoading(false);
            if (err) {
                return toasts.error('Verify-Token', err, {
                    toastId: 'verify-tokens',
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
                <h2 className="text-lg text-primary font-thin mb-4">Enter your Phone number and Token to verify</h2>

                <div className="relative w-full mb-4">
                    <input
                        type="text"
                        placeholder="Enter your Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-4 rounded-full border border-gray bg-gray-light text-primary placeholder-gray-400 outline-none text-lg"
                    />
                </div>

                <div className="relative w-full mb-4">
                    <input
                        type="text"
                        placeholder="Enter your Token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="w-full p-4 rounded-full border border-gray bg-gray-light text-primary placeholder-gray-400 outline-none text-lg"
                    />
                </div>

                <Button
                    onClick={handleVerify}
                    loading={loading}
                    className="flex gap-x-1 rounded-full w-full px-4 py-4 bg-primary text-white text-sm font-semibold"
                >
                    <ArrowUp />
                    <span>Verify</span>
                </Button>

                {/* {error && <p className="text-red-500 my-4">{error}</p>} */}

                {tokenDetails && (
                    <div className="w-full space-y-4 text-gray mt-6">
                        <h3 className="text-black font-semibold text-xl">Token Validity Details:</h3>
                        <div className="p-4 bg-white cursor-pointer hover:shadow-sm rounded-lg border border-gray hover:border-primary">
                            <p className="text-primary font-semibold">Token: {tokenDetails.token}</p>
                            <p className="text-gray">Name: {tokenDetails.name}</p>
                            <p className="text-gray">Phone: {tokenDetails.phone}</p>
                            <p className="text-gray">Via: {tokenDetails.transaction?.channel || "USSD"}</p>
                            <p className="text-gray">Purchased on: {formatDate(tokenDetails.createdAt, true)}</p>
                            <Verify className='text-primary my-2' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyToken;
