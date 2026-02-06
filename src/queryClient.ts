import { QueryCache, QueryClient } from '@tanstack/react-query';
import { useAppState } from './state';

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (err) => {
            console.info('Query error:', err);
            const message = err instanceof Error ? err.message : 'Something went wrong';
            useAppState.getState().setError(message);
        },
    }),
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 60_000,
        },
    },
});
