import { IToken, ITokensPagination } from '../../interfaces/token';

import AdminService from '@/services/admin.service';
import OrganizerService from '@/services/organizer.service';
import { useAuthContext } from '../userContext';
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


const useTokens = (filters: ITokensPagination,) => {
    const { user } = useAuthContext();
    const query = useQuery<IGetUsersResponse, Error>({
        queryKey: ['tokens', filters], // Query key includes the filters for refetching based on changes
        queryFn: () => user!.role === "admin" ? AdminService.fetchTokens(filters) : OrganizerService.fetchRaffles(filters),
        staleTime: 5000,
        // keepPreviousData: true,
    });
    // console.log(">>",query.data  )
    return {
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,
        status: query.status,
        refetch: query.refetch
    };
};


export default useTokens