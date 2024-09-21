import { IUser, IUserPagination } from '@/interfaces/users';

import AdminService from '@/services/admin.service';
import { useQuery } from '@tanstack/react-query';

interface IGetUsersResponse {
    data: IUser[];
    meta: {
        page: number;
        limit: number;
        timestamp: string
        totalCount: number;
    }
}


const useUsers = (filters: IUserPagination) => {
    const query = useQuery<IGetUsersResponse, Error>({
        queryKey: ['users', filters], // Query key includes the filters for refetching based on changes
        queryFn: () => AdminService.getUsers(filters), // Function to fetch users with the given filters
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


export default useUsers