'use client';

import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@peaks/ui";
import { Calendar, Users, Library, ArrowRight, Activity, TrendingUp, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const complianceData = [
    { name: 'Mon', value: 85 },
    { name: 'Tue', value: 88 },
    { name: 'Wed', value: 92 },
    { name: 'Thu', value: 90 },
    { name: 'Fri', value: 85 },
    { name: 'Sat', value: 95 },
    { name: 'Sun', value: 98 },
];

const workloadData = [
    { name: 'Week 1', volume: 4000, intensity: 2400 },
    { name: 'Week 2', volume: 3000, intensity: 1398 },
    { name: 'Week 3', volume: 2000, intensity: 9800 },
    { name: 'Week 4', volume: 2780, intensity: 3908 },
    { name: 'Week 5', volume: 1890, intensity: 4800 },
    { name: 'Week 6', volume: 2390, intensity: 3800 },
    { name: 'Week 7', volume: 3490, intensity: 4300 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                    <p className="text-muted-foreground">Welcome back, Coach.</p>
                </div>
                <Button>
                    <Calendar className="mr-2 h-4 w-4" /> New Season
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Athletes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            <span className="text-green-500 font-medium">+2</span>
                            <span className="ml-1">from last month</span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Compliance</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            <span className="text-green-500 font-medium">+4%</span>
                            <span className="ml-1">from last week</span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                            <span className="text-red-500 font-medium">2 Injured</span>
                            <span className="mx-1">•</span>
                            <span className="text-yellow-500 font-medium">1 Low Compliance</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Team Compliance</CardTitle>
                        <CardDescription>Daily adherence to prescribed workouts</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={complianceData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Training Volume</CardTitle>
                        <CardDescription>Weekly total volume vs intensity</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={workloadData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="volume" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="intensity" fill="#a855f7" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates from your athletes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/20 transition-colors border border-transparent hover:border-border/50">
                                    <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                        <Activity className="h-5 w-5 text-indigo-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium">New PR: Back Squat</p>
                                            <span className="text-xs text-muted-foreground">2h ago</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Alex Johnson lifted 140kg (was 135kg)</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">View All Activity</Button>
                    </CardFooter>
                </Card>

                <div className="space-y-6">
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <Calendar className="mr-2 h-4 w-4" /> Schedule Workout
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Users className="mr-2 h-4 w-4" /> Message Team
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Library className="mr-2 h-4 w-4" /> Add to Library
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-linear-to-br from-indigo-600 to-purple-700 border-none text-white">
                        <CardHeader>
                            <CardTitle className="text-white">Pro Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm opacity-90">
                                Reviewing athlete logs within 24 hours increases compliance by 15%.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary" size="sm" className="w-full">Read More</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
