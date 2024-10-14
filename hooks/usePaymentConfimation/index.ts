import { IToken, ITokensPagination } from '../../interfaces/token';

import AdminService from '@/services/admin.service';
import GeneralService from '@/services';
import OrganizerService from '@/services/organizer.service';
import { useAuthContext } from '../userContext';
import { useQuery } from '@tanstack/react-query';

interface IPaymentConfimation {
    message: String,
    success: Boolean,
}


const usePaymentVerification = (ref: string,) => {
    const query = useQuery<IPaymentConfimation, Error>({
        queryKey: ['payment confimation', ref], // Query key includes the filters for refetching based on changes
        queryFn: () => GeneralService.verifyPayment({ ref }),
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


export default usePaymentVerification