import {useCallback} from 'react';

import {useFetch} from '@/hooks/useFetch';


const useUserService = () => {
    const fetchService = useFetch();

    const getModels = useCallback(
        (signal?: AbortSignal) => {
            return fetchService.post<any>(`/api/user_info`, {
                body: {},
                headers: {
                    'Content-Type': 'application/json',
                },
                signal,
            });
        },
        [fetchService],
    );

    return {
        getModels,
    };
};

export default useUserService;
