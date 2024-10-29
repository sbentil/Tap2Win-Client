import { IToken, ITokensPagination } from '../../interfaces/token';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import AdminService from '@/services/admin.service';
import OrganizerService from '@/services/organizer.service';
import { useAuthContext } from '../userContext';

interface IGetUsersResponse {
    data: IToken[];
    meta: {
        page: number;
        limit: number;
        timestamp: string
        totalCount: number;
    }
}



const useTokens = (initialFilters: ITokensPagination) => {
    const { user } = useAuthContext();
    const queryClient = useQueryClient();

    // Standard query setup with the initial filters
    const query = useQuery<IGetUsersResponse, Error>({
        queryKey: ['tokens', initialFilters],
        queryFn: () =>
            user!.role === "admin"
                ? AdminService.fetchTokens(initialFilters)
                : OrganizerService.fetchRaffles(initialFilters),
        enabled: !!user, // Ensure user is defined before running query
    });

    // Custom refetch function to fetch with updated filters
    const refetchWithFilters = (newFilters: ITokensPagination) => {
        return queryClient.fetchQuery({
            queryKey: ['tokens', newFilters],
            queryFn: () =>
                user!.role === "admin"
                    ? AdminService.fetchTokens(newFilters)
                    : OrganizerService.fetchRaffles(newFilters),
        });
    };

    return {
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,
        status: query.status,
        refetch: refetchWithFilters,
    };
};

// export default useTokens;




export default useTokens