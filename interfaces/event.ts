import { IPagination } from ".";
import { IUser } from "./users";

export interface IEventInput {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number
    channel: string
    organizer: string | IUser
}

export interface IEvent extends IEventInput {
    tokensCount: number;
    organizer: IUser;
    createdBy: IUser;
    lastUpdatedBy: IUser;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IEventPagination extends IPagination {
    organizer?: string
}

export const eventTemplate: IEvent = {
    _id: 'event_id_placeholder',
    name: 'Annual Tech Conference',
    description: 'A conference that brings together tech enthusiasts and professionals.',
    startDate: new Date('2024-12-01T09:00:00Z'),
    endDate: new Date('2024-12-03T17:00:00Z'),
    price: 100,
    channel: 'online', // Example: 'online' or any other relevant channel
    organizer: {
      _id: 'organizer_id_placeholder',
      name: 'Organizer Name',
      email: 'organizer@example.com',
      role: 'organizer',
      status: 'active',
      phone: '1234567890',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    tokensCount: 200,
    createdBy: {
      _id: 'creator_id_placeholder',
      name: 'Creator Name',
      email: 'creator@example.com',
      role: 'admin',
      status: 'active',
      phone: '0987654321',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    lastUpdatedBy: {
      _id: 'updater_id_placeholder',
      name: 'Updater Name',
      email: 'updater@example.com',
      role: 'admin',
      status: 'active',
      phone: '1122334455',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  