import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { UserProvider } from '../context/UserContext';
import { RevenueCatService } from '../services/revenueCatService';

export default function RootLayout() {
    const [queryClient] = useState(() => new QueryClient());

    useEffect(() => {
        RevenueCatService.init();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <Slot />
            </UserProvider>
        </QueryClientProvider>
    );
}
