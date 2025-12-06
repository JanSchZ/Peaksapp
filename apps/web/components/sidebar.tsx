'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@peaks/ui';
import {
    Activity,
    Calendar,
    Users,
    Library,
    Settings,
    LogOut,
    Zap,
    Clock
} from 'lucide-react';

const navigation = [
    { name: 'Pulse', href: '/dashboard', icon: Activity },
    { name: 'Timeline', href: '/planner', icon: Calendar },
    { name: 'Roster', href: '/athletes', icon: Users },
    { name: 'Library', href: '/library', icon: Library },
];

export function Sidebar() {
    const pathname = usePathname();
    const today = new Date();
    const timeStr = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="flex h-full w-56 flex-col bg-[hsl(220,13%,7%)] border-r border-[hsl(220,10%,18%)]">
            {/* Brand */}
            <div className="flex h-14 items-center px-4 border-b border-[hsl(220,10%,18%)]">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-base font-bold tracking-tight text-[hsl(40,15%,90%)]">PEAKS</span>
                </div>
            </div>

            {/* Time Display */}
            <div className="px-4 py-3 border-b border-[hsl(220,10%,15%)]">
                <div className="flex items-center gap-2 text-xs text-[hsl(220,8%,50%)]">
                    <Clock className="h-3 w-3" />
                    <span className="font-mono">{timeStr}</span>
                    <span className="text-[hsl(220,8%,35%)]">•</span>
                    <span>8 training</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col gap-0.5 p-2 pt-3">
                {navigation.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded transition-all",
                                isActive
                                    ? 'bg-[hsl(220,13%,90%)] border-l-2 border-teal-500 text-teal-700'
                                    : 'text-muted-foreground hover:bg-[hsl(220,13%,95%)] hover:text-foreground'
                            )}
                        >
                            <item.icon className={`h-4 w-4 ${pathname === item.href ? 'text-teal-600' : 'text-muted-foreground'
                                }`} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-[hsl(220,10%,15%)]">
                <Link
                    href="/settings"
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-[hsl(220,8%,50%)] hover:bg-[hsl(220,13%,12%)] hover:text-[hsl(40,10%,75%)] rounded transition-colors"
                >
                    <Settings className="h-4 w-4" />
                    Settings
                </Link>
                <button className="flex w-full items-center gap-2.5 px-3 py-2 text-sm font-medium text-[hsl(220,8%,40%)] hover:bg-[hsl(0,30%,12%)] hover:text-[hsl(0,60%,60%)] rounded transition-colors">
                    <LogOut className="h-4 w-4" />
                    Sign out
                </button>
            </div>
        </div>
    );
}
