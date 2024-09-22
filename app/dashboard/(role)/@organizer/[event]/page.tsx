
"use client"

import React, { useEffect, useState } from 'react'

import { Tabs } from '@/components/core';
import UseOrganizerTokens from '@/components/organizer/tokens';
import { usePathname } from 'next/navigation';

const tabs = [
    { label: 'Tokens', value: 'tokens' },
    { label: 'Transactions', value: "trans" },
];





const Page = () => {
    const [activeTab, setActiveTab] = useState("tokens");
    const [event, setEvent] = useState<string | null>(null);
    const pathname = usePathname()

    useEffect(() => {
        const event = pathname.split('/')[2]
        console.log(event)
        setEvent(event)
    }, [pathname])

    return (
        <main className="flex min-h-screen flex-col items-start gap-y-4 p-4">
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {
                !event && <p className="text-center">A moment please...</p>
            }
            {
                event && activeTab === "tokens" && <UseOrganizerTokens event={event} />
            }
            {
                event && activeTab === "trans" && <p>Transactions</p>
            }

        </main>
    )
}

export default Page