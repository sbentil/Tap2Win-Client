import { Barcode, Calendar, Clock, Code1, MoneyRecive } from 'iconsax-react';

import { IEvent } from '@/interfaces/event';
import Link from 'next/link';
import React from 'react';
import { Link as RouterLink } from 'lucide-react';
import { formatDate } from '@/helpers/datetime';
import { formatMoney } from '@/helpers/string';

const EventCard = ({ event }: { event: IEvent }) => {
    // console.log({ event })
    return (
        <Link href={`/dashboard/${event._id}`} key={event._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-primary group-hover:text-secondary transition-colors duration-300">
                {event.name}
            </h2>
            <p className="text-gray-600 mb-4 text-sm">{event.description}</p>

            <div className="space-y-2">
                <div className="flex items-center text-sm">
                    <Calendar className="mr-2 text-primary" />
                    <strong className="text-primary">Start Date:</strong>
                    <span className="ml-1 text-gray-700">{formatDate(event.startDate)}</span>
                </div>
                <div className="flex items-center text-sm">
                    <Calendar className="mr-2 text-primary" />
                    <strong className="text-primary">End Date:</strong>
                    <span className="ml-1 text-gray-700">{formatDate(event.endDate)}</span>
                </div>
                <div className="flex items-center text-sm">
                    <Code1 className="mr-2 text-primary" />
                    <strong className="text-primary">Channel:</strong>
                    <span className="ml-1 text-gray-700">*{event.channel}#</span>
                </div>
                <div className="flex items-center text-sm">
                    <Barcode className="mr-2 text-primary" />
                    <strong className="text-primary">Tickets:</strong>
                    <span className="ml-1 text-gray-700">{event.tokensCount}</span>
                </div>
                <div className="flex items-center text-sm">
                    <MoneyRecive className="mr-2 text-primary" />
                    <strong className="text-primary">Total Sales (GHS):</strong>
                    <span className="ml-1 text-gray-700">{formatMoney(Number(event.tokensCount) * Number(event.price))}</span>
                </div>
            </div>

            {/* Created at and Updated at */}
            <div className="mt-4 border-t pt-3 space-y-2 text-xs text-gray-500">
                <div className="flex items-center">
                    <Clock className="mr-2" />
                    <span>Created at: {formatDate(event.createdAt)}</span>
                </div>
                <div className="flex items-center">
                    <Clock className="mr-2" />
                    <span>Updated at: {formatDate(event.updatedAt)}</span>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
