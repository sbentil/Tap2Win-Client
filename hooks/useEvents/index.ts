import { IEvent, IEventPagination } from './../../interfaces/event';

import AdminService from '@/services/admin.service';
import OrganizerService from '@/services/organizer.service';
import { useAuthContext } from '../userContext';
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
    const { user } = useAuthContext();
    const query = useQuery<IGetUsersResponse, Error>({
        queryKey: ['events', filters], // Query key includes the filters for refetching based on changes
        queryFn: () => user!.role === "admin" ? AdminService.getEvents(filters) : OrganizerService.getEvents(filters),
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