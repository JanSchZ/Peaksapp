'use client';

import { useState } from 'react';
import { Button, Card, Input } from "@peaks/ui";
import {
    Search, Plus, MoreHorizontal,
    Users, UserPlus, Flame, MessageSquare,
    Send, ChevronRight
} from "lucide-react";

const ATHLETES = [
    { id: '1', name: 'Alex Johnson', group: 'Elite', avatar: 'AJ', status: 'Active', streak: 12, lastRPE: 7, weeklyCompliance: [true, true, true, true, false, null, null], nextSession: 'Upper Body' },
    { id: '2', name: 'Sarah Williams', group: 'Marathon', avatar: 'SW', status: 'Active', streak: 8, lastRPE: 9, weeklyCompliance: [true, true, false, true, true, null, null], nextSession: 'Long Run' },
    { id: '3', name: 'Mike Chen', group: 'Rehab', avatar: 'MC', status: 'Injured', streak: 0, lastRPE: null, weeklyCompliance: [true, true, true, null, null, null, null], nextSession: 'Mobility' },
    { id: '4', name: 'Emma Davis', group: 'Powerlifting', avatar: 'ED', status: 'Active', streak: 21, lastRPE: 8, weeklyCompliance: [true, true, true, true, true, null, null], nextSession: 'Max Effort' },
    { id: '5', name: 'James Wilson', group: 'General', avatar: 'JW', status: 'Paused', streak: 0, lastRPE: null, weeklyCompliance: [false, false, false, null, null, null, null], nextSession: null },
];

const GROUPS = [
    { id: '1', name: 'Elite Squad', members: 4, compliance: 95 },
    { id: '2', name: 'Marathon', members: 8, compliance: 88 },
    { id: '3', name: 'Powerlifting', members: 6, compliance: 92 },
    { id: '4', name: 'Rehab', members: 3, compliance: 100 },
];

export default function AthletesPage() {
    const [activeTab, setActiveTab] = useState<'athletes' | 'groups'>('athletes');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAthletes = ATHLETES.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Roster</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Athletes and training groups</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:bg-secondary">
                        <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Invite
                    </Button>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> New Group
                    </Button>
                </div>
            </div>

            {/* Tabs + Search */}
            <div className="flex items-center justify-between">
                <div className="flex gap-0.5 bg-secondary p-0.5 rounded border border-border">
                    {['athletes', 'groups'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as 'athletes' | 'groups')}
                            className={`px-3 py-1.5 text-xs font-medium rounded transition-all capitalize ${activeTab === tab
                                ? 'bg-white text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative w-56">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        className="pl-8 h-8 text-sm bg-white border-border text-foreground placeholder:text-muted-foreground"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {activeTab === 'athletes' ? (
                <div className="space-y-1">
                    {/* Table Header */}
                    <div className="grid grid-cols-[2fr,1fr,1fr,1fr,120px] gap-3 px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <span>Athlete</span>
                        <span>Status</span>
                        <span>Week</span>
                        <span>RPE</span>
                        <span className="text-right">Actions</span>
                    </div>

                    {filteredAthletes.map((athlete) => (
                        <div
                            key={athlete.id}
                            className="grid grid-cols-[2fr,1fr,1fr,1fr,120px] gap-3 items-center card-industrial rounded p-3 hover:border-teal-500/30 transition-colors cursor-pointer group"
                        >
                            {/* Athlete */}
                            <div className="flex items-center gap-2.5">
                                <div className={`h-8 w-8 rounded flex items-center justify-center text-xs font-bold ${athlete.status === 'Active' ? 'bg-teal-50 text-teal-600 border border-teal-100' :
                                    athlete.status === 'Injured' ? 'bg-red-50 text-red-600 border border-red-100' :
                                        'bg-secondary text-muted-foreground border border-border'
                                    }`}>
                                    {athlete.avatar}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-medium text-foreground">{athlete.name}</span>
                                        {athlete.streak >= 7 && (
                                            <span className="flex items-center gap-0.5 text-[10px] text-amber-500">
                                                <Flame className="h-3 w-3" />{athlete.streak}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">{athlete.group}</div>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${athlete.status === 'Active' ? 'bg-teal-50 text-teal-600' :
                                    athlete.status === 'Injured' ? 'bg-red-50 text-red-600' :
                                        'bg-secondary text-muted-foreground'
                                    }`}>
                                    {athlete.status}
                                </span>
                            </div>

                            {/* Week Timeline */}
                            <div className="flex items-center gap-0.5">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-5 w-5 rounded-sm flex items-center justify-center text-[10px] font-medium ${athlete.weeklyCompliance[i] === true ? 'bg-teal-50 text-teal-600' :
                                            athlete.weeklyCompliance[i] === false ? 'bg-red-50 text-red-600' :
                                                'bg-secondary text-muted-foreground/30'
                                            }`}
                                    >
                                        {athlete.weeklyCompliance[i] === true ? '✓' :
                                            athlete.weeklyCompliance[i] === false ? '✗' : '—'}
                                    </div>
                                ))}
                            </div>

                            {/* RPE */}
                            <div>
                                <span className={`text-sm font-semibold ${athlete.lastRPE === null ? 'text-muted-foreground' :
                                    athlete.lastRPE >= 9 ? 'text-red-500' :
                                        athlete.lastRPE >= 7 ? 'text-amber-500' :
                                            'text-teal-600'
                                    }`}>
                                    {athlete.lastRPE ?? '—'}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-teal-600 transition-colors">
                                    <MessageSquare className="h-3.5 w-3.5" />
                                </button>
                                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-teal-600 transition-colors">
                                    <Send className="h-3.5 w-3.5" />
                                </button>
                                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors">
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-3">
                    {GROUPS.map((group) => (
                        <div key={group.id} className="card-industrial rounded-lg p-4 hover:border-teal-500/30 transition-colors cursor-pointer group">
                            <div className="flex items-start justify-between mb-3">
                                <div className="h-9 w-9 rounded bg-teal-50 flex items-center justify-center border border-teal-100">
                                    <Users className="h-4 w-4 text-teal-600" />
                                </div>
                                <button className="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary">
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            <h3 className="font-medium text-foreground group-hover:text-teal-600 transition-colors">{group.name}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{group.members} athletes</p>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-muted">
                                <span className="text-xs text-muted-foreground">Compliance</span>
                                <span className={`text-xs font-semibold ${group.compliance >= 90 ? 'text-teal-600' : group.compliance >= 70 ? 'text-amber-500' : 'text-red-500'
                                    }`}>
                                    {group.compliance}%
                                </span>
                            </div>
                        </div>
                    ))}
                    <button className="flex flex-col items-center justify-center p-4 border border-dashed border-border rounded-lg bg-secondary/30 hover:bg-secondary hover:border-muted-foreground transition-all">
                        <Plus className="h-5 w-5 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">New Group</span>
                    </button>
                </div>
            )}
        </div>
    );
}
