'use client';

import { usePlannerStore } from '@/store/planner-store';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@peaks/ui';
import { Plus, Calendar as CalendarIcon, MoreHorizontal, Save } from 'lucide-react';
import { saveSeasonPlan } from '@/actions/save-plan';
import { useState } from 'react';

export default function PlannerPage() {
    const { seasonName, macrocycles, addMacrocycle, addMesocycle } = usePlannerStore();
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        // For demonstration, using a placeholder startDate. In a real app, this would be dynamic.
        const result = await saveSeasonPlan({ seasonName, startDate: new Date(), macrocycles });
        setSaving(false);
        if (result.success) {
            alert('Season saved successfully!');
        } else {
            alert('Failed to save season.');
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end border-b border-border/50 pb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">{seasonName}</h1>
                    <p className="text-muted-foreground">Strategic periodization overview</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={handleSave} disabled={saving} variant="outline">
                        <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Plan'}
                    </Button>
                    <Button onClick={() => addMacrocycle('preparatory')} variant="outline">
                        <Plus className="w-4 h-4 mr-2" /> Prep Phase
                    </Button>
                    <Button onClick={() => addMacrocycle('competitive')} variant="default">
                        <Plus className="w-4 h-4 mr-2" /> Comp Phase
                    </Button>
                </div>
            </header>

            <div className="min-h-[500px]">
                {macrocycles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border/50 rounded-xl bg-accent/5">
                        <CalendarIcon className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No phases planned</h3>
                        <p className="text-sm text-muted-foreground mb-4">Start by adding a macrocycle to your season.</p>
                        <Button onClick={() => addMacrocycle('preparatory')}>Create First Phase</Button>
                    </div>
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-6 snap-x">
                        {macrocycles.map((macro) => (
                            <Card key={macro.id} className="min-w-[320px] max-w-[320px] snap-start border-border/50 bg-card/50">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <Badge variant="outline" className="capitalize mb-2">
                                                {macro.type}
                                            </Badge>
                                            <CardTitle className="text-lg">{macro.name}</CardTitle>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground font-mono mt-2">
                                        {macro.startDate.toLocaleDateString()} — {macro.endDate.toLocaleDateString()}
                                    </p>
                                </CardHeader>

                                <CardContent className="space-y-3">
                                    {macro.mesocycles.map((meso) => (
                                        <div
                                            key={meso.id}
                                            className="group relative bg-accent/30 hover:bg-accent/50 border border-border/50 p-3 rounded-lg transition-all cursor-pointer"
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-medium text-sm">{meso.name}</span>
                                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                                                    {meso.weeks} WKS
                                                </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground">{meso.focus}</div>
                                        </div>
                                    ))}

                                    <Button
                                        variant="ghost"
                                        className="w-full border border-dashed border-border/50 hover:border-border hover:bg-accent/50 text-muted-foreground"
                                        onClick={() => addMesocycle(macro.id)}
                                    >
                                        <Plus className="w-3 h-3 mr-2" /> Add Block
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
