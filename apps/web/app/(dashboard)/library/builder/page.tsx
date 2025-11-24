'use client';

import { useState } from 'react';
import { Button, Card, Input, Badge } from "@peaks/ui";
import { ArrowLeft, Plus, Save, Trash2, GripVertical, Clock, Dumbbell, MoreHorizontal } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Set {
    id: string;
    type: 'warmup' | 'working' | 'drop';
    reps: string;
    weight: string;
    rpe: string;
    rest: string;
}

interface ExerciseBlock {
    id: string;
    exerciseName: string;
    sets: Set[];
    notes: string;
}

export default function WorkoutBuilderPage() {
    const router = useRouter();
    const [workoutName, setWorkoutName] = useState('Untitled Workout');
    const [blocks, setBlocks] = useState<ExerciseBlock[]>([]);

    const addBlock = () => {
        const newBlock: ExerciseBlock = {
            id: Math.random().toString(36).substr(2, 9),
            exerciseName: '',
            sets: [
                { id: Math.random().toString(36).substr(2, 9), type: 'working', reps: '10', weight: '', rpe: '8', rest: '90s' }
            ],
            notes: ''
        };
        setBlocks([...blocks, newBlock]);
    };

    const addSet = (blockId: string) => {
        setBlocks(blocks.map(block => {
            if (block.id === blockId) {
                const lastSet = block.sets[block.sets.length - 1];
                return {
                    ...block,
                    sets: [...block.sets, { ...lastSet, id: Math.random().toString(36).substr(2, 9) }]
                };
            }
            return block;
        }));
    };

    const removeSet = (blockId: string, setId: string) => {
        setBlocks(blocks.map(block => {
            if (block.id === blockId) {
                return {
                    ...block,
                    sets: block.sets.filter(s => s.id !== setId)
                };
            }
            return block;
        }));
    };

    const removeBlock = (blockId: string) => {
        setBlocks(blocks.filter(b => b.id !== blockId));
    };

    const updateBlock = (blockId: string, field: keyof ExerciseBlock, value: any) => {
        setBlocks(blocks.map(block => {
            if (block.id === blockId) {
                return { ...block, [field]: value };
            }
            return block;
        }));
    };

    const updateSet = (blockId: string, setId: string, field: keyof Set, value: any) => {
        setBlocks(blocks.map(block => {
            if (block.id === blockId) {
                return {
                    ...block,
                    sets: block.sets.map(set => {
                        if (set.id === setId) {
                            return { ...set, [field]: value };
                        }
                        return set;
                    })
                };
            }
            return block;
        }));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b border-border/50">
                <div className="flex items-center gap-4">
                    <Link href="/library">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <Input
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            className="text-xl font-bold border-none bg-transparent px-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50"
                            placeholder="Workout Name"
                        />
                        <p className="text-sm text-muted-foreground">Design your workout session</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Discard</Button>
                    <Button onClick={() => router.push('/library')}>
                        <Save className="mr-2 h-4 w-4" /> Save Workout
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
                {blocks.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-border/50 rounded-xl bg-accent/5">
                        <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                        <h3 className="text-lg font-medium">Start Building</h3>
                        <p className="text-muted-foreground mb-6">Add your first exercise to this workout.</p>
                        <Button onClick={addBlock}>
                            <Plus className="mr-2 h-4 w-4" /> Add Exercise
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {blocks.map((block, index) => (
                            <Card key={block.id} className="p-6 border-border/50 bg-card/50 relative group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="mt-2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                                        <GripVertical className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="text-xs font-medium text-muted-foreground mb-1 block">Exercise</label>
                                                <Input
                                                    value={block.exerciseName}
                                                    onChange={(e) => updateBlock(block.id, 'exerciseName', e.target.value)}
                                                    placeholder="e.g. Back Squat"
                                                    className="font-medium"
                                                />
                                            </div>
                                            <div className="w-1/3">
                                                <label className="text-xs font-medium text-muted-foreground mb-1 block">Notes</label>
                                                <Input
                                                    value={block.notes}
                                                    onChange={(e) => updateBlock(block.id, 'notes', e.target.value)}
                                                    placeholder="Tempo, cues, etc."
                                                />
                                            </div>
                                        </div>

                                        {/* Sets Table */}
                                        <div className="rounded-lg border border-border/50 overflow-hidden">
                                            <table className="w-full text-sm">
                                                <thead className="bg-muted/30">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground w-16">Set</th>
                                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Type</th>
                                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Reps</th>
                                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Weight</th>
                                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">RPE</th>
                                                        <th className="px-4 py-2 text-left font-medium text-muted-foreground">Rest</th>
                                                        <th className="w-10"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-border/50">
                                                    {block.sets.map((set, setIndex) => (
                                                        <tr key={set.id} className="group/row hover:bg-muted/20">
                                                            <td className="px-4 py-2 font-medium text-muted-foreground">{setIndex + 1}</td>
                                                            <td className="px-4 py-2">
                                                                <select
                                                                    className="bg-transparent border-none focus:ring-0 text-sm p-0 w-full"
                                                                    value={set.type}
                                                                    onChange={(e) => updateSet(block.id, set.id, 'type', e.target.value)}
                                                                >
                                                                    <option value="working">Working</option>
                                                                    <option value="warmup">Warmup</option>
                                                                    <option value="drop">Drop Set</option>
                                                                </select>
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                <input
                                                                    className="bg-transparent border-none focus:ring-0 text-sm p-0 w-full"
                                                                    value={set.reps}
                                                                    onChange={(e) => updateSet(block.id, set.id, 'reps', e.target.value)}
                                                                />
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                <input
                                                                    className="bg-transparent border-none focus:ring-0 text-sm p-0 w-full"
                                                                    value={set.weight}
                                                                    placeholder="-"
                                                                    onChange={(e) => updateSet(block.id, set.id, 'weight', e.target.value)}
                                                                />
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                <input
                                                                    className="bg-transparent border-none focus:ring-0 text-sm p-0 w-full"
                                                                    value={set.rpe}
                                                                    placeholder="-"
                                                                    onChange={(e) => updateSet(block.id, set.id, 'rpe', e.target.value)}
                                                                />
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                <input
                                                                    className="bg-transparent border-none focus:ring-0 text-sm p-0 w-full"
                                                                    value={set.rest}
                                                                    onChange={(e) => updateSet(block.id, set.id, 'rest', e.target.value)}
                                                                />
                                                            </td>
                                                            <td className="px-4 py-2 text-right">
                                                                <button
                                                                    onClick={() => removeSet(block.id, set.id)}
                                                                    className="text-muted-foreground hover:text-destructive opacity-0 group-hover/row:opacity-100 transition-opacity"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="bg-muted/10 p-2 border-t border-border/50">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full text-xs h-8"
                                                    onClick={() => addSet(block.id)}
                                                >
                                                    <Plus className="h-3 w-3 mr-2" /> Add Set
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-destructive"
                                        onClick={() => removeBlock(block.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))}

                        <Button onClick={addBlock} variant="outline" className="w-full py-8 border-dashed">
                            <Plus className="mr-2 h-4 w-4" /> Add Exercise
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
