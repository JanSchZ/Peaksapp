'use client';

import { useState } from 'react';
import { Button, Card, Input } from "@peaks/ui";
import { Search, Plus, MoreHorizontal, Mail, Phone, Calendar, ArrowUpRight, TrendingUp, AlertCircle, Users, UserPlus } from "lucide-react";
import Link from 'next/link';

// Mock Data
const ATHLETES = [
    {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        status: 'Active',
        plan: 'Road to Olympics',
        phase: 'Preparatory',
        compliance: 92,
        lastActive: '2 hours ago',
        avatar: 'AJ',
        trend: 'up'
    },
    {
        id: '2',
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        status: 'Active',
        plan: 'Marathon Build',
        phase: 'Base Building',
        compliance: 88,
        lastActive: '1 day ago',
        avatar: 'SW',
        trend: 'stable'
    },
    {
        id: '3',
        name: 'Mike Chen',
        email: 'mike.c@example.com',
        status: 'Injured',
        plan: 'Rehab Protocol',
        phase: 'Recovery',
        compliance: 100,
        lastActive: '3 days ago',
        avatar: 'MC',
        trend: 'down'
    },
    {
        id: '4',
        name: 'Emma Davis',
        email: 'emma.d@example.com',
        status: 'Active',
        plan: 'Powerlifting Meet',
        phase: 'Peaking',
        compliance: 95,
        lastActive: '5 hours ago',
        avatar: 'ED',
        trend: 'up'
    },
    {
        id: '5',
        name: 'James Wilson',
        email: 'james.w@example.com',
        status: 'Paused',
        plan: 'Off-Season',
        phase: 'Rest',
        compliance: 0,
        lastActive: '1 week ago',
        avatar: 'JW',
        trend: 'stable'
    }
];

const GROUPS = [
    {
        id: '1',
        name: 'Marathon Squad',
        members: 12,
        program: 'Marathon Build 2025',
        coach: 'Coach Jan',
        nextSession: 'Long Run (Sunday)'
    },
    {
        id: '2',
        name: 'Powerlifting Team',
        members: 8,
        program: 'Strength Block A',
        coach: 'Coach Jan',
        nextSession: 'Max Effort Lower'
    },
    {
        id: '3',
        name: 'Onboarding',
        members: 5,
        program: 'Intro to Peaks',
        coach: 'System',
        nextSession: 'Assessment'
    }
];

export default function AthletesPage() {
    const [activeTab, setActiveTab] = useState<'athletes' | 'groups'>('athletes');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAthletes = ATHLETES.filter(athlete =>
        athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Roster</h1>
                    <p className="text-muted-foreground">Manage your athletes and training groups.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <UserPlus className="mr-2 h-4 w-4" /> Invite Athlete
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Group
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border/50">
                <div className="flex gap-6">
                    <button
                        onClick={() => setActiveTab('athletes')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'athletes'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        All Athletes
                    </button>
                    <button
                        onClick={() => setActiveTab('groups')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'groups'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Groups & Teams
                    </button>
                </div>
            </div>

            {activeTab === 'athletes' ? (
                <>
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-6 border-border/50 bg-card/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Athletes</p>
                                    <h2 className="text-3xl font-bold mt-2">{ATHLETES.length}</h2>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-green-500">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                <span>+2 this month</span>
                            </div>
                        </Card>
                        <Card className="p-6 border-border/50 bg-card/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Average Compliance</p>
                                    <h2 className="text-3xl font-bold mt-2">
                                        {Math.round(ATHLETES.reduce((acc, curr) => acc + curr.compliance, 0) / ATHLETES.length)}%
                                    </h2>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <ActivityIcon className="h-5 w-5 text-green-500" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-muted-foreground">
                                <span>Last 7 days</span>
                            </div>
                        </Card>
                        <Card className="p-6 border-border/50 bg-card/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Requires Attention</p>
                                    <h2 className="text-3xl font-bold mt-2">
                                        {ATHLETES.filter(a => a.status === 'Injured' || a.compliance < 80).length}
                                    </h2>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-red-500">
                                <span>Low compliance or injured</span>
                            </div>
                        </Card>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search athletes..."
                                className="pl-10 bg-card/50 border-border/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Athletes List */}
                    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border/50 bg-muted/50">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Athlete</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Current Plan</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Compliance</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Active</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAthletes.map((athlete) => (
                                        <tr key={athlete.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold">
                                                        {athlete.avatar}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{athlete.name}</div>
                                                        <div className="text-xs text-muted-foreground">{athlete.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${athlete.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                                                        athlete.status === 'Injured' ? 'bg-red-500/10 text-red-500' :
                                                            'bg-yellow-500/10 text-yellow-500'
                                                    }`}>
                                                    {athlete.status}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="font-medium">{athlete.plan}</div>
                                                <div className="text-xs text-muted-foreground">{athlete.phase}</div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${athlete.compliance >= 90 ? 'bg-green-500' :
                                                                    athlete.compliance >= 75 ? 'bg-yellow-500' :
                                                                        'bg-red-500'
                                                                }`}
                                                            style={{ width: `${athlete.compliance}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-medium">{athlete.compliance}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">
                                                {athlete.lastActive}
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Mail className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GROUPS.map((group) => (
                        <Card key={group.id} className="p-6 border-border/50 bg-card/50 hover:border-primary/50 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <Users className="h-6 w-6" />
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{group.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{group.members} Athletes</p>

                            <div className="space-y-3 pt-4 border-t border-border/50">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Program</span>
                                    <span className="font-medium">{group.program}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Next Session</span>
                                    <span className="font-medium">{group.nextSession}</span>
                                </div>
                            </div>
                        </Card>
                    ))}

                    <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/50 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors h-full min-h-[200px]">
                        <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                            <Plus className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium">Create New Group</h3>
                        <p className="text-sm text-muted-foreground mt-1">Organize athletes by goal or level</p>
                    </button>
                </div>
            )}
        </div>
    );
}

function ActivityIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}
