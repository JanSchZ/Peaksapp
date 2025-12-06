'use client';

import { usePlannerStore } from '@/store/planner-store';
import { Button, Badge } from '@peaks/ui';
import { Plus, Calendar as CalendarIcon, MoreHorizontal, Save, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { saveSeasonPlan } from '@/actions/save-plan';
import { useState } from 'react';

const FOCUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    hypertrophy: { bg: 'bg-sky-50 text-sky-700', text: 'text-sky-700', border: 'border-sky-200' },
    strength: { bg: 'bg-violet-50 text-violet-700', text: 'text-violet-700', border: 'border-violet-200' },
    power: { bg: 'bg-amber-50 text-amber-700', text: 'text-amber-700', border: 'border-amber-200' },
    endurance: { bg: 'bg-teal-50 text-teal-700', text: 'text-teal-700', border: 'border-teal-200' },
    technique: { bg: 'bg-rose-50 text-rose-700', text: 'text-rose-700', border: 'border-rose-200' },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function PlannerPage() {
    const { seasonName, macrocycles, addMacrocycle, addMesocycle } = usePlannerStore();
    const [saving, setSaving] = useState(false);
    const [viewMode, setViewMode] = useState<'blocks' | 'timeline'>('blocks');

    const handleSave = async () => {
        setSaving(true);
        const result = await saveSeasonPlan({ seasonName, startDate: new Date(), macrocycles });
        setSaving(false);
        alert(result.success ? 'Saved!' : 'Failed');
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-border">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">{seasonName}</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Periodization structure</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 bg-secondary p-0.5 rounded border border-border">
                        {['blocks', 'timeline'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode as 'blocks' | 'timeline')}
                                className={`px-2.5 py-1 text-xs font-medium rounded transition-all capitalize ${viewMode === mode
                                    ? 'bg-white text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                    <Button onClick={handleSave} disabled={saving} variant="outline" size="sm" className="border-border text-muted-foreground hover:bg-secondary">
                        <Save className="w-3.5 h-3.5 mr-1.5" /> {saving ? '...' : 'Save'}
                    </Button>
                    <Button onClick={() => addMacrocycle('preparatory')} size="sm" className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="w-3.5 h-3.5 mr-1.5" /> Phase
                    </Button>
                </div>
            </div>

            {/* Timeline Header */}
            {viewMode === 'timeline' && (
                <div className="flex items-center gap-2 p-2 card-industrial rounded">
                    <button className="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary">
                        <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex-1 flex">
                        {MONTHS.map((month, i) => (
                            <div key={month} className="flex-1 text-center">
                                <span className={`text-[10px] font-medium ${i === new Date().getMonth() ? 'text-teal-600' : 'text-muted-foreground'}`}>
                                    {month}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary">
                        <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}

            {/* Content */}
            <div className="min-h-[400px]">
                {macrocycles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 card-industrial rounded-lg">
                        <CalendarIcon className="h-10 w-10 text-muted-foreground/50 mb-3" />
                        <h3 className="text-sm font-medium text-foreground">No phases yet</h3>
                        <p className="text-xs text-muted-foreground mb-4">Build your season structure</p>
                        <div className="flex gap-2">
                            <Button onClick={() => addMacrocycle('preparatory')} variant="outline" size="sm" className="border-border text-muted-foreground">
                                Prep Phase
                            </Button>
                            <Button onClick={() => addMacrocycle('competitive')} size="sm" className="bg-teal-600 hover:bg-teal-700">
                                Comp Phase
                            </Button>
                        </div>
                    </div>
                ) : viewMode === 'blocks' ? (
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {macrocycles.map((macro) => (
                            <div key={macro.id} className="min-w-[280px] max-w-[280px] card-industrial rounded-lg">
                                <div className="p-3 border-b border-muted">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Badge variant="outline" className={`text-[10px] mb-1.5 ${macro.type === 'competitive'
                                                ? 'border-amber-200 bg-amber-50 text-amber-700'
                                                : 'border-border bg-secondary/50 text-muted-foreground'
                                                }`}>
                                                {macro.type}
                                            </Badge>
                                            <h3 className="text-sm font-medium text-foreground">{macro.name}</h3>
                                        </div>
                                        <button className="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary">
                                            <MoreHorizontal className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground font-mono mt-1">
                                        {macro.startDate.toLocaleDateString()} — {macro.endDate.toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="p-3 space-y-1.5">
                                    {macro.mesocycles.map((meso) => {
                                        const colors = FOCUS_COLORS[meso.focus] || FOCUS_COLORS.technique;
                                        return (
                                            <div
                                                key={meso.id}
                                                className={`group p-2.5 rounded border cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] ${colors.bg} ${colors.border}`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className={`text-xs font-medium ${colors.text}`}>{meso.name}</span>
                                                    <span className="text-[10px] text-muted-foreground font-mono">{meso.weeks}w</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-[10px] text-muted-foreground capitalize">{meso.focus}</span>
                                                    <button className="text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                                                        <Users className="h-2.5 w-2.5" /> Assign
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <button
                                        className="w-full py-1.5 text-xs text-muted-foreground border border-dashed border-border rounded hover:border-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
                                        onClick={() => addMesocycle(macro.id)}
                                    >
                                        <Plus className="w-3 h-3" /> Block
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {macrocycles.map((macro) => (
                            <div key={macro.id} className="space-y-1.5">
                                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${macro.type === 'competitive' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-secondary text-muted-foreground border border-border'
                                    }`}>
                                    {macro.name}
                                </span>
                                <div className="flex gap-1 h-10">
                                    {macro.mesocycles.map((meso) => {
                                        const colors = FOCUS_COLORS[meso.focus] || FOCUS_COLORS.technique;
                                        const widthPercent = (meso.weeks / 52) * 100 * 4;
                                        return (
                                            <div
                                                key={meso.id}
                                                className={`flex items-center justify-center rounded border cursor-pointer transition-all hover:scale-y-110 ${colors.bg} ${colors.border}`}
                                                style={{ width: `${Math.max(widthPercent, 8)}%` }}
                                            >
                                                <span className={`text-[10px] font-medium truncate px-1 ${colors.text}`}>{meso.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Legend */}
            {macrocycles.length > 0 && (
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Focus</span>
                    {Object.entries(FOCUS_COLORS).map(([key, colors]) => (
                        <div key={key} className="flex items-center gap-1">
                            <div className={`h-2 w-2 rounded-sm ${colors.bg} border ${colors.border}`} />
                            <span className="text-[10px] text-muted-foreground capitalize">{key}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
