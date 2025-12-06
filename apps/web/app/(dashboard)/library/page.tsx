'use client';

import { useState } from 'react';
import { Button, Input } from "@peaks/ui";
import { Search, Plus, Filter, Dumbbell, Clock, Tag, Play, Copy, Star, MoreHorizontal, Upload } from "lucide-react";
import Link from 'next/link';

const TABS = ['My Library', 'Standard', 'Templates'];

const MY_EXERCISES = [
    { id: 1, name: 'Paused Back Squat', muscle: 'Legs', timesUsed: 24, hasVideo: true, isFavorite: true },
    { id: 2, name: 'Tempo Bench (3-1-2)', muscle: 'Chest', timesUsed: 18, hasVideo: true, isFavorite: false },
    { id: 3, name: 'RDL w/ Band', muscle: 'Hamstrings', timesUsed: 15, hasVideo: false, isFavorite: true },
];

const STANDARD_EXERCISES = [
    { id: 101, name: 'Back Squat', muscle: 'Legs', difficulty: 'Int' },
    { id: 102, name: 'Bench Press', muscle: 'Chest', difficulty: 'Int' },
    { id: 103, name: 'Deadlift', muscle: 'Back', difficulty: 'Adv' },
    { id: 104, name: 'Pull Up', muscle: 'Back', difficulty: 'Int' },
    { id: 105, name: 'Push Up', muscle: 'Chest', difficulty: 'Beg' },
    { id: 106, name: 'Romanian DL', muscle: 'Hamstrings', difficulty: 'Int' },
];

const TEMPLATES = [
    { id: 1, name: 'Leg Day Hypertrophy', exercises: 6, duration: '60 min', timesUsed: 12 },
    { id: 2, name: 'Upper Push Focus', exercises: 5, duration: '45 min', timesUsed: 8 },
    { id: 3, name: 'Full Body Strength', exercises: 8, duration: '75 min', timesUsed: 5 },
];

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState('My Library');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Library</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Exercises and templates</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:bg-secondary">
                        <Upload className="mr-1.5 h-3.5 w-3.5" /> Import
                    </Button>
                    <Link href="/library/builder">
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                            <Plus className="mr-1.5 h-3.5 w-3.5" /> Create
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tabs & Search */}
            <div className="flex items-center justify-between">
                <div className="flex gap-0.5 bg-secondary p-0.5 rounded border border-border">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${activeTab === tab
                                ? 'bg-white text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-48">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            className="pl-8 h-8 text-sm bg-white border-border text-foreground placeholder:text-muted-foreground"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="h-8 w-8 rounded flex items-center justify-center border border-border text-muted-foreground hover:bg-secondary">
                        <Filter className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'My Library' && (
                <div className="grid grid-cols-4 gap-3">
                    {MY_EXERCISES.map((item) => (
                        <div key={item.id} className="card-industrial rounded-lg overflow-hidden group cursor-pointer hover:border-teal-500/30 transition-colors">
                            <div className="aspect-video bg-secondary relative flex items-center justify-center border-b border-border">
                                {item.hasVideo ? (
                                    <>
                                        <Dumbbell className="h-8 w-8 text-muted-foreground/50" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                            <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                                                <Play className="h-4 w-4 text-teal-600 ml-0.5" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Dumbbell className="h-8 w-8 text-muted-foreground/30" />
                                )}
                                {item.isFavorite && (
                                    <Star className="absolute top-2 right-2 h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                                )}
                            </div>
                            <div className="p-3">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-sm font-medium text-foreground group-hover:text-teal-600 transition-colors">{item.name}</h3>
                                    <button className="h-5 w-5 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary -mr-1 -mt-0.5">
                                        <MoreHorizontal className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
                                    <span className="flex items-center gap-0.5"><Tag className="h-2.5 w-2.5" /> {item.muscle}</span>
                                    <span>• {item.timesUsed}x used</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="aspect-[4/3] flex flex-col items-center justify-center border border-dashed border-border rounded-lg bg-secondary/30 hover:bg-secondary hover:border-muted-foreground transition-all">
                        <Plus className="h-5 w-5 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">Add New</span>
                    </button>
                </div>
            )}

            {activeTab === 'Standard' && (
                <div className="grid grid-cols-4 gap-3">
                    {STANDARD_EXERCISES.map((item) => (
                        <div key={item.id} className="card-industrial rounded-lg overflow-hidden group cursor-pointer hover:border-teal-500/30 transition-colors">
                            <div className="aspect-video bg-secondary relative flex items-center justify-center border-b border-border">
                                <Dumbbell className="h-8 w-8 text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors" />
                                <span className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-medium ${item.difficulty === 'Beg' ? 'bg-teal-50 text-teal-600 border border-teal-100' :
                                    item.difficulty === 'Int' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                        'bg-red-50 text-red-600 border border-red-100'
                                    }`}>
                                    {item.difficulty}
                                </span>
                            </div>
                            <div className="p-3">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-sm font-medium text-foreground group-hover:text-teal-600 transition-colors">{item.name}</h3>
                                    <button className="h-5 w-5 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" title="Copy to My Library">
                                        <Copy className="h-3 w-3" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-muted-foreground">
                                    <Tag className="h-2.5 w-2.5" /> {item.muscle}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'Templates' && (
                <div className="grid grid-cols-4 gap-3">
                    {TEMPLATES.map((item) => (
                        <div key={item.id} className="card-industrial rounded-lg p-4 group cursor-pointer hover:border-teal-500/30 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div className="h-8 w-8 rounded bg-teal-50 flex items-center justify-center border border-teal-100">
                                    <Clock className="h-4 w-4 text-teal-600" />
                                </div>
                                <button className="h-5 w-5 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary">
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            <h3 className="text-sm font-medium text-foreground group-hover:text-teal-600 transition-colors">{item.name}</h3>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1">
                                <span>{item.exercises} ex</span>
                                <span>•</span>
                                <span>{item.duration}</span>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-muted">
                                <span className="text-[10px] text-muted-foreground">{item.timesUsed}x used</span>
                                <button className="text-[10px] font-medium text-teal-600 hover:text-teal-700">Use</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
