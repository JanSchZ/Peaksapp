'use client';

import { useState } from 'react';
import { Button, Card, Input } from "@peaks/ui";
import { Search, Plus, Filter, Dumbbell, Calendar, BookOpen, Clock, Tag } from "lucide-react";
import Link from 'next/link';

const TABS = ['Exercises', 'Workouts', 'Programs'];

const EXERCISES = [
    { id: 1, name: 'Back Squat', category: 'Strength', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate' },
    { id: 2, name: 'Bench Press', category: 'Strength', muscle: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate' },
    { id: 3, name: 'Deadlift', category: 'Strength', muscle: 'Back', equipment: 'Barbell', difficulty: 'Advanced' },
    { id: 4, name: 'Pull Up', category: 'Strength', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate' },
    { id: 5, name: 'Push Up', category: 'Strength', muscle: 'Chest', equipment: 'Bodyweight', difficulty: 'Beginner' },
    { id: 6, name: 'Running Intervals', category: 'Cardio', muscle: 'Legs', equipment: 'None', difficulty: 'Intermediate' },
];

const WORKOUTS = [
    { id: 1, name: 'Leg Day Hypertrophy', duration: '60 min', difficulty: 'Hard', exercises: 6 },
    { id: 2, name: 'Upper Body Power', duration: '45 min', difficulty: 'Intermediate', exercises: 5 },
    { id: 3, name: 'Recovery Run', duration: '30 min', difficulty: 'Easy', exercises: 1 },
];

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState('Exercises');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Library</h1>
                    <p className="text-muted-foreground">Manage your exercise database and workout templates.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Import</Button>
                    <Link href="/library/builder">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create New
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tabs & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-border/50 pb-4">
                <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab
                                ? 'bg-background text-foreground shadow-xs'
                                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={`Search ${activeTab.toLowerCase()}...`}
                            className="pl-10 bg-card/50 border-border/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === 'Exercises' && EXERCISES.map((item) => (
                    <Card key={item.id} className="group hover:border-primary/50 transition-colors cursor-pointer border-border/50 bg-card/50">
                        <div className="aspect-video bg-muted/30 relative overflow-hidden rounded-t-lg">
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                                <Dumbbell className="h-16 w-16" />
                            </div>
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${item.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-500' :
                                    item.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-500' :
                                        'bg-red-500/10 text-red-500'
                                    }`}>
                                    {item.difficulty}
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <div className="flex items-center text-xs text-muted-foreground bg-accent/50 px-2 py-1 rounded">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {item.category}
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground bg-accent/50 px-2 py-1 rounded">
                                    <Dumbbell className="h-3 w-3 mr-1" />
                                    {item.equipment}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}

                {activeTab === 'Workouts' && WORKOUTS.map((item) => (
                    <Card key={item.id} className="group hover:border-primary/50 transition-colors cursor-pointer border-border/50 bg-card/50">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${item.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                                    item.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-500' :
                                        'bg-red-500/10 text-red-500'
                                    }`}>
                                    {item.difficulty}
                                </span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {item.duration}
                                </div>
                                <div className="flex items-center">
                                    <Dumbbell className="h-4 w-4 mr-1" />
                                    {item.exercises} exercises
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}

                {activeTab === 'Programs' && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No programs created yet. Start by creating a new program.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
