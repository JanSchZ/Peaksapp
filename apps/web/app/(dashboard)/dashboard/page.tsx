import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@peaks/ui";
import { Calendar, Users, Library, ArrowRight, Activity } from "lucide-react";

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Season Planner</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardDescription>Manage macrocycles and periodization</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Road to Olympics</div>
                        <p className="text-xs text-muted-foreground mt-1">Current: Preparatory Phase</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full justify-between group">
                            Open Planner
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Athletes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardDescription>Roster status and compliance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24 Active</div>
                        <p className="text-xs text-muted-foreground mt-1">3 require attention</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full justify-between group">
                            View Roster
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Library</CardTitle>
                            <Library className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardDescription>Exercises and templates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">150+ Items</div>
                        <p className="text-xs text-muted-foreground mt-1">Last updated 2 days ago</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full justify-between group">
                            Manage Library
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-accent/20 border border-border/50">
                                    <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                        <Activity className="h-4 w-4 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">New PR: Back Squat</p>
                                        <p className="text-xs text-muted-foreground">Alex Johnson • 2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
