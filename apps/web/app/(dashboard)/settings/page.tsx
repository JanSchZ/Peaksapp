'use client';

import { Button, Card, Input } from "@peaks/ui";
import { User, Bell, Shield, CreditCard, LogOut, Moon, Sun } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and team settings.</p>
            </div>

            <div className="grid gap-6">
                {/* Profile Section */}
                <Card className="p-6 border-border/50 bg-card/50">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Profile</h2>
                            <p className="text-sm text-muted-foreground">Update your personal information.</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <Input defaultValue="Coach" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <Input defaultValue="User" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input defaultValue="coach@peaks.app" type="email" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button>Save Changes</Button>
                    </div>
                </Card>

                {/* Notifications */}
                <Card className="p-6 border-border/50 bg-card/50">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Bell className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Notifications</h2>
                            <p className="text-sm text-muted-foreground">Configure how you receive alerts.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-accent/20">
                            <div>
                                <p className="font-medium">Athlete Updates</p>
                                <p className="text-xs text-muted-foreground">Receive daily summaries of athlete compliance.</p>
                            </div>
                            <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-accent/20">
                            <div>
                                <p className="font-medium">New Messages</p>
                                <p className="text-xs text-muted-foreground">Get notified when an athlete sends a message.</p>
                            </div>
                            <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Appearance */}
                <Card className="p-6 border-border/50 bg-card/50">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Moon className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Appearance</h2>
                            <p className="text-sm text-muted-foreground">Customize the interface theme.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="border-2 border-primary rounded-lg p-4 cursor-pointer bg-accent/20">
                            <div className="flex justify-center mb-2"><Moon className="h-6 w-6" /></div>
                            <p className="text-center text-sm font-medium">Dark</p>
                        </div>
                        <div className="border border-border rounded-lg p-4 cursor-pointer hover:bg-accent/20 transition-colors">
                            <div className="flex justify-center mb-2"><Sun className="h-6 w-6" /></div>
                            <p className="text-center text-sm font-medium">Light</p>
                        </div>
                        <div className="border border-border rounded-lg p-4 cursor-pointer hover:bg-accent/20 transition-colors">
                            <div className="flex justify-center mb-2"><span className="text-lg font-bold">A</span></div>
                            <p className="text-center text-sm font-medium">System</p>
                        </div>
                    </div>
                </Card>

                {/* Danger Zone */}
                <Card className="p-6 border-red-500/20 bg-red-500/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                            <Shield className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-red-500">Danger Zone</h2>
                            <p className="text-sm text-muted-foreground">Irreversible actions.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Delete Account</p>
                            <p className="text-xs text-muted-foreground">Permanently remove your account and all data.</p>
                        </div>
                        <Button variant="destructive">Delete Account</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
