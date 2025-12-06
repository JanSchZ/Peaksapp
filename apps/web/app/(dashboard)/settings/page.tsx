'use client';

import { Construction } from "lucide-react";
import Link from 'next/link';
import { Button } from "@peaks/ui";

export default function SettingsPage() {
    return (
        <div className="max-w-2xl space-y-5">
            <div className="pb-4 border-b border-border">
                <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Account and preferences</p>
            </div>

            <div className="card-industrial rounded-lg p-8 text-center">
                <Construction className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h2 className="text-lg font-medium text-foreground mb-2">Coming Soon</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                    Settings functionality is under development. Profile, notifications, and appearance options will be available here.
                </p>
                <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:bg-secondary">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
}
