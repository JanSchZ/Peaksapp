import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Types (Move to @peaks/core later if shared)
export type PeriodType = 'preparatory' | 'competitive' | 'transition';

export interface Macrocycle {
    id: string;
    name: string;
    type: PeriodType;
    startDate: Date;
    endDate: Date;
    mesocycles: Mesocycle[];
}

export interface Mesocycle {
    id: string;
    name: string;
    weeks: number;
    focus: string;
}

interface PlannerState {
    seasonName: string;
    startDate: Date;
    macrocycles: Macrocycle[];

    // Actions
    setSeasonName: (name: string) => void;
    addMacrocycle: (type: PeriodType) => void;
    updateMacrocycle: (id: string, data: Partial<Macrocycle>) => void;
    addMesocycle: (macrocycleId: string) => void;
}

export const usePlannerStore = create<PlannerState>((set) => ({
    seasonName: 'New Season',
    startDate: new Date(),
    macrocycles: [],

    setSeasonName: (name) => set({ seasonName: name }),

    addMacrocycle: (type) => set((state) => {
        const lastMacro = state.macrocycles[state.macrocycles.length - 1];
        const startDate = lastMacro ? lastMacro.endDate : state.startDate;
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1); // Default 1 month duration

        const newMacro: Macrocycle = {
            id: uuidv4(),
            name: `${type.charAt(0).toUpperCase() + type.slice(1)} Phase`,
            type,
            startDate,
            endDate,
            mesocycles: [],
        };

        return { macrocycles: [...state.macrocycles, newMacro] };
    }),

    updateMacrocycle: (id, data) => set((state) => ({
        macrocycles: state.macrocycles.map((m) =>
            m.id === id ? { ...m, ...data } : m
        ),
    })),

    addMesocycle: (macrocycleId) => set((state) => ({
        macrocycles: state.macrocycles.map((m) => {
            if (m.id !== macrocycleId) return m;
            return {
                ...m,
                mesocycles: [
                    ...m.mesocycles,
                    {
                        id: uuidv4(),
                        name: `Block ${m.mesocycles.length + 1}`,
                        weeks: 4,
                        focus: 'General',
                    },
                ],
            };
        }),
    })),
}));
