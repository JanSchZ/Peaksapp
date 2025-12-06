'use client';

import { useState } from 'react';
import { Button, Card, Input } from "@peaks/ui";
import { ArrowLeft, Plus, Save, Trash2, GripVertical, Dumbbell } from "lucide-react";
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
            sets: [{ id: Math.random().toString(36).substr(2, 9), type: 'working', reps: '10', weight: '', rpe: '8', rest: '90s' }],
            notes: ''
        };
        setBlocks([...blocks, newBlock]);
    };

    const addSet = (blockId: string) => {
        setBlocks(blocks.map(block => {
            if (block.id === blockId) {
                const lastSet = block.sets[block.sets.length - 1];
                return { ...block, sets: [...block.sets, { ...lastSet, id: Math.random().toString(36).substr(2, 9) }] };
            }
            return block;
        }));
    };

    const removeSet = (blockId: string, setId: string) => {
        setBlocks(blocks.map(block => {
            if (block.id === blockId) {
                return { ...block, sets: block.sets.filter(s => s.id !== setId) };
            }
            return block;
        }));
    };

    const removeBlock = (blockId: string) => {
        setBlocks(blocks.filter(b => b.id !== blockId));
    };

    const updateBlock = (blockId: string, field: keyof ExerciseBlock, value: string) => {
        setBlocks(blocks.map(block => block.id === blockId ? { ...block, [field]: value } : block));
    };

    const updateSet = (blockId: string, setId: string, field: keyof Set, value: string) => {
        setBlocks(blocks.map(block => {
            if (block.id === blockId) {
                return { ...block, sets: block.sets.map(set => set.id === setId ? { ...set, [field]: value } : set) };
            }
            return block;
        }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-5 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[hsl(220,10%,18%)]">
                <div className="flex items-center gap-3">
                    <Link href="/library">
                        <button className="h-8 w-8 rounded flex items-center justify-center text-[hsl(220,8%,50%)] hover:bg-[hsl(220,13%,14%)]">
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                    </Link>
                    <div>
                        <Input
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            className="text-lg font-semibold border-none bg-transparent px-0 h-auto focus-visible:ring-0 text-[hsl(40,15%,90%)]"
                            placeholder="Workout Name"
                        />
                        <p className="text-xs text-[hsl(220,8%,45%)]">Build your session</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href="/library">
                        <Button variant="outline" size="sm" className="border-[hsl(220,10%,22%)] text-[hsl(220,8%,60%)]">Cancel</Button>
                    </Link>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => router.push('/library')}>
                        <Save className="mr-1.5 h-3.5 w-3.5" /> Save
                    </Button>
                </div>
            </div>

            {/* Content */}
            {blocks.length === 0 ? (
                <div className="text-center py-16 card-industrial rounded-lg">
                    <Dumbbell className="h-10 w-10 mx-auto text-[hsl(220,8%,25%)] mb-3" />
                    <h3 className="text-sm font-medium text-[hsl(40,15%,80%)]">Start Building</h3>
                    <p className="text-xs text-[hsl(220,8%,45%)] mb-4">Add your first exercise</p>
                    <Button size="sm" onClick={addBlock} className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Exercise
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {blocks.map((block, index) => (
                        <div key={block.id} className="card-industrial rounded-lg p-4 group">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="mt-2 cursor-grab text-[hsl(220,8%,35%)] hover:text-[hsl(220,8%,55%)]">
                                    <GripVertical className="h-4 w-4" />
                                </div>
                                <div className="flex-1 grid grid-cols-3 gap-3">
                                    <div className="col-span-2 space-y-1">
                                        <label className="text-[10px] text-[hsl(220,8%,45%)] uppercase tracking-wider">Exercise</label>
                                        <Input
                                            value={block.exerciseName}
                                            onChange={(e) => updateBlock(block.id, 'exerciseName', e.target.value)}
                                            placeholder="e.g. Back Squat"
                                            className="h-8 text-sm bg-[hsl(220,13%,10%)] border-[hsl(220,10%,20%)] text-[hsl(40,15%,88%)]"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-[hsl(220,8%,45%)] uppercase tracking-wider">Notes</label>
                                        <Input
                                            value={block.notes}
                                            onChange={(e) => updateBlock(block.id, 'notes', e.target.value)}
                                            placeholder="Tempo, cues..."
                                            className="h-8 text-sm bg-[hsl(220,13%,10%)] border-[hsl(220,10%,20%)] text-[hsl(40,15%,88%)]"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeBlock(block.id)}
                                    className="h-7 w-7 rounded flex items-center justify-center text-[hsl(220,8%,40%)] hover:text-red-400 hover:bg-red-500/10"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            {/* Sets Table */}
                            <div className="rounded border border-[hsl(220,10%,18%)] overflow-hidden ml-7">
                                <table className="w-full text-xs">
                                    <thead className="bg-[hsl(220,13%,10%)]">
                                        <tr className="text-[hsl(220,8%,45%)]">
                                            <th className="px-3 py-2 text-left font-medium w-12">Set</th>
                                            <th className="px-3 py-2 text-left font-medium">Type</th>
                                            <th className="px-3 py-2 text-left font-medium">Reps</th>
                                            <th className="px-3 py-2 text-left font-medium">Weight</th>
                                            <th className="px-3 py-2 text-left font-medium">RPE</th>
                                            <th className="px-3 py-2 text-left font-medium">Rest</th>
                                            <th className="w-8"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[hsl(220,10%,15%)]">
                                        {block.sets.map((set, setIndex) => (
                                            <tr key={set.id} className="group/row hover:bg-[hsl(220,13%,11%)]">
                                                <td className="px-3 py-2 text-[hsl(220,8%,50%)] font-mono">{setIndex + 1}</td>
                                                <td className="px-3 py-2">
                                                    <select
                                                        className="bg-transparent border-none text-[hsl(40,15%,80%)] text-xs p-0"
                                                        value={set.type}
                                                        onChange={(e) => updateSet(block.id, set.id, 'type', e.target.value as Set['type'])}
                                                    >
                                                        <option value="working">Working</option>
                                                        <option value="warmup">Warmup</option>
                                                        <option value="drop">Drop</option>
                                                    </select>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input className="bg-transparent border-none text-[hsl(40,15%,85%)] text-xs w-12 p-0" value={set.reps} onChange={(e) => updateSet(block.id, set.id, 'reps', e.target.value)} />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input className="bg-transparent border-none text-[hsl(40,15%,85%)] text-xs w-16 p-0" value={set.weight} placeholder="—" onChange={(e) => updateSet(block.id, set.id, 'weight', e.target.value)} />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input className="bg-transparent border-none text-[hsl(40,15%,85%)] text-xs w-10 p-0" value={set.rpe} placeholder="—" onChange={(e) => updateSet(block.id, set.id, 'rpe', e.target.value)} />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input className="bg-transparent border-none text-[hsl(40,15%,85%)] text-xs w-12 p-0" value={set.rest} onChange={(e) => updateSet(block.id, set.id, 'rest', e.target.value)} />
                                                </td>
                                                <td className="px-2 py-2 text-right">
                                                    <button onClick={() => removeSet(block.id, set.id)} className="text-[hsl(220,8%,35%)] hover:text-red-400 opacity-0 group-hover/row:opacity-100">
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-2 bg-[hsl(220,13%,9%)] border-t border-[hsl(220,10%,15%)]">
                                    <button onClick={() => addSet(block.id)} className="w-full text-[10px] text-[hsl(220,8%,50%)] hover:text-teal-400 flex items-center justify-center gap-1 py-1">
                                        <Plus className="h-3 w-3" /> Add Set
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button onClick={addBlock} className="w-full py-6 border border-dashed border-[hsl(220,10%,20%)] rounded-lg text-sm text-[hsl(220,8%,50%)] hover:border-[hsl(220,10%,28%)] hover:text-[hsl(220,8%,65%)] flex items-center justify-center gap-2">
                        <Plus className="h-4 w-4" /> Add Exercise
                    </button>
                </div>
            )}
        </div>
    );
}
