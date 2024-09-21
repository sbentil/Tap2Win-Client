import { IEvent, IEventPagination } from './../../interfaces/event';

import AdminService from '@/services/admin.service';
import { useQuery } from '@tanstack/react-query';

interface IGetUsersResponse {
    data: IEvent[];
    meta: {
        page: number;
        limit: number;
        timestamp: string
        totalCount: number;
    }
}


const useEvents = (filters: IEventPagination) => {
    const query = useQuery<IGetUsersResponse, Error>({
        queryKey: ['events', filters], // Query key includes the filters for refetching based on changes
        queryFn: () => AdminService.getEvents(filters), // Function to fetch users with the given filters
        staleTime: 5000, // Data will be considered fresh for 5 seconds
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,
        status: query.status,
        refetch: query.refetch
    };
};


export default useEvents