import { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { PurchasesPackage } from 'react-native-purchases';
import { RevenueCatService } from '../services/revenueCatService';
import { Colors } from '../constants/Colors';
import { X, Check } from 'lucide-react-native';

interface PaywallModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function PaywallModal({ visible, onClose, onSuccess }: PaywallModalProps) {
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        if (visible) {
            loadOfferings();
        }
    }, [visible]);

    const loadOfferings = async () => {
        setLoading(true);
        const offerings = await RevenueCatService.getOfferings();
        if (offerings && offerings.availablePackages.length > 0) {
            setPackages(offerings.availablePackages);
        }
        setLoading(false);
    };

    const handlePurchase = async (pack: PurchasesPackage) => {
        setPurchasing(true);
        try {
            const customerInfo = await RevenueCatService.purchasePackage(pack);
            if (customerInfo && typeof customerInfo.entitlements.active['pro'] !== 'undefined') {
                onSuccess();
                onClose();
            }
        } catch (e: any) {
            if (!e.userCancelled) {
                Alert.alert('Error', e.message);
            }
        } finally {
            setPurchasing(false);
        }
    };

    const handleRestore = async () => {
        setPurchasing(true);
        try {
            const customerInfo = await RevenueCatService.restorePurchases();
            if (customerInfo && typeof customerInfo.entitlements.active['pro'] !== 'undefined') {
                Alert.alert('Success', 'Purchases restored successfully');
                onSuccess();
                onClose();
            } else {
                Alert.alert('Info', 'No active subscriptions found to restore');
            }
        } catch (e: any) {
            Alert.alert('Error', e.message);
        } finally {
            setPurchasing(false);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <X size={24} color={Colors.light.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Upgrade to Pro</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.hero}>
                        <Text style={styles.heroTitle}>Unlock Full Potential</Text>
                        <Text style={styles.heroSubtitle}>Get access to advanced analytics, unlimited workout history, and more.</Text>
                    </View>

                    <View style={styles.features}>
                        <FeatureRow text="Advanced Performance Analytics" />
                        <FeatureRow text="Unlimited Workout History" />
                        <FeatureRow text="Coach Connection" />
                        <FeatureRow text="Custom Goal Tracking" />
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color={Colors.light.primary} style={styles.loader} />
                    ) : (
                        <View style={styles.packages}>
                            {packages.map((pack) => (
                                <TouchableOpacity
                                    key={pack.identifier}
                                    style={styles.packageCard}
                                    onPress={() => handlePurchase(pack)}
                                    disabled={purchasing}
                                >
                                    <View>
                                        <Text style={styles.packageTitle}>{pack.product.title}</Text>
                                        <Text style={styles.packageDesc}>{pack.product.description}</Text>
                                    </View>
                                    <Text style={styles.packagePrice}>{pack.product.priceString}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={handleRestore} disabled={purchasing}>
                        <Text style={styles.restoreText}>Restore Purchases</Text>
                    </TouchableOpacity>
                </View>
                {purchasing && (
                    <View style={styles.overlay}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                )}
            </View>
        </Modal>
    );
}

function FeatureRow({ text }: { text: string }) {
    return (
        <View style={styles.featureRow}>
            <View style={styles.checkContainer}>
                <Check size={16} color={Colors.light.primary} />
            </View>
            <Text style={styles.featureText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    closeButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    content: {
        padding: 24,
    },
    hero: {
        marginBottom: 32,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 16,
        color: Colors.light.mutedForeground,
        textAlign: 'center',
        lineHeight: 24,
    },
    features: {
        gap: 16,
        marginBottom: 32,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    checkContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.light.primary + '20',
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureText: {
        fontSize: 16,
        color: Colors.light.text,
    },
    loader: {
        marginTop: 32,
    },
    packages: {
        gap: 16,
    },
    packageCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 16,
        backgroundColor: Colors.light.card,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    packageTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    packageDesc: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
    },
    packagePrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    footer: {
        padding: 24,
        alignItems: 'center',
        paddingBottom: 48,
    },
    restoreText: {
        fontSize: 14,
        color: Colors.light.mutedForeground,
        textDecorationLine: 'underline',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
