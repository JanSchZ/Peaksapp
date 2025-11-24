import Purchases, { PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import { Platform } from 'react-native';

const API_KEYS = {
    ios: process.env.EXPO_PUBLIC_RC_IOS_KEY || '',
    android: process.env.EXPO_PUBLIC_RC_ANDROID_KEY || '',
};

export const RevenueCatService = {
    async init(userId?: string) {
        if (Platform.OS === 'ios') {
            Purchases.configure({ apiKey: API_KEYS.ios, appUserID: userId });
        } else if (Platform.OS === 'android') {
            Purchases.configure({ apiKey: API_KEYS.android, appUserID: userId });
        }
    },

    async login(userId: string) {
        await Purchases.logIn(userId);
    },

    async logout() {
        await Purchases.logOut();
    },

    async getOfferings(): Promise<PurchasesOffering | null> {
        try {
            const offerings = await Purchases.getOfferings();
            if (offerings.current !== null) {
                return offerings.current;
            }
            return null;
        } catch (e) {
            console.error('Error fetching offerings', e);
            return null;
        }
    },

    async purchasePackage(pack: PurchasesPackage) {
        try {
            const { customerInfo } = await Purchases.purchasePackage(pack);
            return customerInfo;
        } catch (e: any) {
            if (!e.userCancelled) {
                console.error('Error purchasing package', e);
                throw e;
            }
        }
    },

    async checkEntitlement(entitlementId: string = 'pro'): Promise<boolean> {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            return typeof customerInfo.entitlements.active[entitlementId] !== 'undefined';
        } catch (e) {
            console.error('Error checking entitlement', e);
            return false;
        }
    },

    async restorePurchases() {
        try {
            const customerInfo = await Purchases.restorePurchases();
            return customerInfo;
        } catch (e) {
            console.error('Error restoring purchases', e);
            throw e;
        }
    }
};
