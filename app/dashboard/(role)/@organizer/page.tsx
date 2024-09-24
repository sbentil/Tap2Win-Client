"use client"

import React, { useState } from 'react';

import { Button } from '@/components/core';
import EventCard from '@/components/cards/event';
import Link from 'next/link';
import NoRecordsFound from '@/components/empty';
import dayjs from 'dayjs';
import useEvents from '@/hooks/useEvents';

const Page = () => {
    // State for handling pagination
    const [page, setPage] = useState(1);
    const limit = 10;

    // Fetch events using the useEvents hook
    const { data, isLoading, error, refetch } = useEvents({ page, limit });

    const events = data?.data || [];
    const totalCount = data?.meta.totalCount || 0;

    const paginationHandler = (action: 'first' | 'last' | 'next' | 'prev') => {
        const totalPages = Math.ceil(totalCount / limit);

        switch (action) {
            case 'first':
                setPage(1);
                break;
            case 'last':
                setPage(totalPages);
                break;
            case 'next':
                if (page < totalPages) {
                    setPage(page + 1);
                }
                break;
            case 'prev':
                if (page > 1) {
                    setPage(page - 1);
                }
                break;
        }
    };

    if (isLoading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return (
            <div>
                Error loading events: {error.message}
                <pre>{JSON.stringify(error, null, 2)}</pre>
                {/* retry text */}
                <Button onClick={() => refetch()} className="">
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-[92vh] p-4 w-full">
            {events.length === 0 ? (
                <div className="flex h-screen flex-col items-center justify-center p-4">
                    <NoRecordsFound entity="Events" />
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-8">
                        <Button
                            onClick={() => paginationHandler('prev')}
                            disabled={page === 1}
                            className="disabled:opacity-50"
                        >
                            Previous
                        </Button>
                        <span>
                            Page {page} of {Math.ceil(totalCount / limit)}
                        </span>
                        <Button
                            onClick={() => paginationHandler('next')}
                            disabled={page >= Math.ceil(totalCount / limit)}
                            className="disabled:opacity-50"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
