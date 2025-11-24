import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { RevenueCatService } from '../services/revenueCatService';

type UserType = 'athlete' | 'coach';

interface UserContextType {
    user: User | null;
    session: Session | null;
    userType: UserType;
    loading: boolean;
    isPro: boolean;
    setUserType: (type: UserType) => void;
    toggleUserType: () => void;
    checkSubscriptionStatus: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [userType, setUserType] = useState<UserType>('athlete');
    const [loading, setLoading] = useState(true);
    const [isPro, setIsPro] = useState(false);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserProfile(session.user.id);
                RevenueCatService.login(session.user.id);
                checkSubscriptionStatus();
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserProfile(session.user.id);
                RevenueCatService.login(session.user.id);
                checkSubscriptionStatus();
            } else {
                setUserType('athlete'); // Reset to default
                RevenueCatService.logout();
                setIsPro(false);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('user_type')
                .eq('id', userId)
                .single();

            if (data && !error) {
                setUserType(data.user_type as UserType);
            }
        } catch (e) {
            console.error('Error fetching user profile:', e);
        }
    };

    const checkSubscriptionStatus = async () => {
        const status = await RevenueCatService.checkEntitlement();
        setIsPro(status);
    };

    const toggleUserType = () => {
        setUserType(prev => prev === 'athlete' ? 'coach' : 'athlete');
    };

    return (
        <UserContext.Provider value={{
            user,
            session,
            userType,
            loading,
            isPro,
            setUserType,
            toggleUserType,
            checkSubscriptionStatus
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
