import { IToken, ITokensPagination } from '../../interfaces/token';

import AdminService from '@/services/admin.service';
import { useQuery } from '@tanstack/react-query';

interface IGetUsersResponse {
    data: IToken[];
    meta: {
        page: number;
        limit: number;
        timestamp: string
        totalCount: number;
    }
}


const useTokens = (filters: ITokensPagination) => {
    const query = useQuery<IGetUsersResponse, Error>({
        queryKey: ['tokens', filters], // Query key includes the filters for refetching based on changes
        queryFn: () => AdminService.fetchTokens(filters), // Function to fetch users with the given filters
        staleTime: 5000, 
        // keepPreviousData: true,
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,
        status: query.status,
        refetch: query.refetch
    };
};


export default useTokens