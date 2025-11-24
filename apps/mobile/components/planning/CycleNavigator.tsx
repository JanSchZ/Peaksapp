import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ChevronLeft, ChevronRight, ZoomOut } from 'lucide-react-native';

interface CycleNavigatorProps {
    currentPeriod: string;
    periodLabel: string;
    onPrevious: () => void;
    onNext: () => void;
    onZoomOut: () => void;
}

export function CycleNavigator({ currentPeriod, periodLabel, onPrevious, onNext, onZoomOut }: CycleNavigatorProps) {
    return (
        <View style={styles.container}>
            <View style={styles.controls}>
                <TouchableOpacity onPress={onPrevious} style={styles.arrowButton}>
                    <ChevronLeft size={24} color={Colors.light.text} />
                </TouchableOpacity>

                <View style={styles.centerInfo}>
                    <Text style={styles.periodLabel}>{periodLabel}</Text>
                    <Text style={styles.currentPeriod}>{currentPeriod}</Text>
                </View>

                <TouchableOpacity onPress={onNext} style={styles.arrowButton}>
                    <ChevronRight size={24} color={Colors.light.text} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onZoomOut} style={styles.zoomOutButton}>
                <ZoomOut size={16} color={Colors.light.mutedForeground} />
                <Text style={styles.zoomOutText}>Macro View</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
        paddingVertical: 12,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    arrowButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: Colors.light.input,
    },
    centerInfo: {
        alignItems: 'center',
    },
    periodLabel: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 2,
    },
    currentPeriod: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    zoomOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 4,
    },
    zoomOutText: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
        fontWeight: '500',
    },
});
