'use client';

import { Button, Card } from "@peaks/ui";
import {
    ArrowRight,
    AlertTriangle,
    CheckCircle2,
    MessageSquare,
    Trophy,
    ChevronRight,
    Flame,
    TrendingDown,
    Heart,
    Users,
    Activity
} from "lucide-react";

// Mock data
const ATTENTION_REQUIRED = [
    { id: '1', name: 'Mike Chen', avatar: 'MC', issue: 'Knee pain (3/10)', type: 'pain', time: '2h ago' },
    { id: '2', name: 'James Wilson', avatar: 'JW', issue: '3 sessions missed', type: 'missed', time: '1d ago' },
    { id: '3', name: 'Sarah Williams', avatar: 'SW', issue: 'High RPE trend (9.2)', type: 'overload', time: 'This week' },
];

const RECENT_ACTIVITY = [
    { id: '1', type: 'completed', athlete: 'Alex Johnson', detail: 'Leg Day Hypertrophy', time: '15m', icon: CheckCircle2, color: 'text-teal-600' },
    { id: '2', type: 'pr', athlete: 'Emma Davis', detail: 'Back Squat 140kg (+5)', time: '1h', icon: Trophy, color: 'text-amber-600' },
    { id: '3', type: 'comment', athlete: 'Mike Chen', detail: '"Knee feels better"', time: '2h', icon: MessageSquare, color: 'text-sky-600' },
    { id: '4', type: 'completed', athlete: 'Sarah Williams', detail: 'Recovery Run', time: '3h', icon: CheckCircle2, color: 'text-teal-600' },
    { id: '5', type: 'started', athlete: 'Carlos R.', detail: 'Upper Body Power', time: '5m', icon: Flame, color: 'text-orange-600' },
];

const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const TRAINING_COUNTS = [12, 15, 8, 14, 10, 6, 4];

export default function DashboardPage() {
    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start pb-4 border-b border-border">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Pulse</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Team overview</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-xl font-semibold text-foreground">24</div>
                        <div className="text-xs text-muted-foreground">Athletes</div>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="text-right">
                        <div className="text-xl font-semibold text-teal-600">92%</div>
                        <div className="text-xs text-muted-foreground">Compliance</div>
                    </div>
                </div>
            </div>

            {/* Attention Required */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Needs Attention</h2>
                    <span className="text-xs text-muted-foreground">({ATTENTION_REQUIRED.length})</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {ATTENTION_REQUIRED.map((item) => (
                        <div
                            key={item.id}
                            className="card-industrial rounded-lg p-4 hover:border-teal-500/30 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`h-8 w-8 rounded flex items-center justify-center text-xs font-bold ${item.type === 'pain' ? 'bg-red-50 text-red-600 border border-red-100' :
                                            item.type === 'missed' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                'bg-orange-50 text-orange-600 border border-orange-100'
                                        }`}>
                                        {item.avatar}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-foreground">{item.name}</div>
                                        <div className="text-xs text-muted-foreground">{item.time}</div>
                                    </div>
                                </div>
                                {item.type === 'pain' && <Heart className="h-3.5 w-3.5 text-red-500" />}
                                {item.type === 'missed' && <Activity className="h-3.5 w-3.5 text-amber-500" />}
                                {item.type === 'overload' && <TrendingDown className="h-3.5 w-3.5 text-orange-500" />}
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{item.issue}</p>
                            <button className="w-full text-xs font-medium text-teal-700 hover:text-teal-800 flex items-center justify-center gap-1 py-1.5 rounded bg-teal-50 hover:bg-teal-100 transition-colors">
                                Review <ChevronRight className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Grid */}
            <div className="grid grid-cols-3 gap-4">
                {/* Week Snapshot */}
                <div className="card-industrial rounded-lg p-4">
                    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">This Week</h2>
                    <div className="flex items-end justify-between gap-1.5 h-24">
                        {WEEK_DAYS.map((day, i) => {
                            const isToday = i === dayOfWeek;
                            const height = (TRAINING_COUNTS[i] / Math.max(...TRAINING_COUNTS)) * 100;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                                    <div className="w-full flex flex-col items-center justify-end h-16">
                                        <div
                                            className={`w-full rounded-sm transition-all ${isToday ? 'bg-teal-500' : 'bg-secondary'
                                                }`}
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>
                                    <span className={`text-[10px] font-medium ${isToday ? 'text-teal-600' : 'text-muted-foreground'}`}>
                                        {day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-between mt-3 pt-3 border-t border-muted">
                        <span className="text-xs text-muted-foreground">Total</span>
                        <span className="text-xs font-medium text-foreground">{TRAINING_COUNTS.reduce((a, b) => a + b, 0)} sessions</span>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="col-span-2 card-industrial rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Activity</h2>
                        <button className="text-xs text-muted-foreground hover:text-teal-600 flex items-center gap-1 transition-colors">
                            View all <ArrowRight className="h-3 w-3" />
                        </button>
                    </div>
                    <div className="space-y-0.5">
                        {RECENT_ACTIVITY.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-2 rounded hover:bg-secondary/50 transition-colors cursor-pointer">
                                <div className={`h-7 w-7 rounded bg-secondary flex items-center justify-center ${item.color}`}>
                                    <item.icon className="h-3.5 w-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm font-medium text-foreground">{item.athlete}</span>
                                    <span className="text-muted-foreground mx-1.5">·</span>
                                    <span className="text-sm text-foreground">{item.detail}</span>
                                </div>
                                <span className="text-xs text-muted-foreground font-mono">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-4 gap-3">
                {[
                    { label: 'Active Now', value: '3', icon: Activity, color: 'text-teal-600' },
                    { label: 'Completed Today', value: '12', icon: CheckCircle2, color: 'text-emerald-600' },
                    { label: 'PRs This Week', value: '5', icon: Trophy, color: 'text-amber-600' },
                    { label: 'Pending Review', value: '7', icon: MessageSquare, color: 'text-sky-600' },
                ].map((stat) => (
                    <div key={stat.label} className="card-industrial rounded-lg p-3 flex items-center gap-3">
                        <div className={`h-9 w-9 rounded bg-secondary flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="h-4 w-4" />
                        </div>
                        <div>
                            <div className="text-lg font-semibold text-foreground">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
