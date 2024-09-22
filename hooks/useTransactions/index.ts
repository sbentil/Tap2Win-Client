import { IToken, ITokensPagination } from '../../interfaces/token';

import AdminService from '@/services/admin.service';
import { ITransaction } from '@/interfaces/transaction';
import OrganizerService from '@/services/organizer.service';
import { useAuthContext } from '../userContext';
import { useQuery } from '@tanstack/react-query';

interface IGetUsersResponse {
    data: ITransaction[];
    meta: {
        page: number;
        limit: number;
        timestamp: string
        totalCount: number;
    }
}


const useTransactions = (filters: ITokensPagination) => {
    const { user } = useAuthContext();
    const query = useQuery<IGetUsersResponse, Error>({
        queryKey: ['transactions', filters], // Query key includes the filters for refetching based on changes
        queryFn: () => user?.role === "admin" ? AdminService.getTransactions(filters) : OrganizerService.getTransactions(filters),
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


export default useTransactions