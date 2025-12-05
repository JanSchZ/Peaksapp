import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background/50 relative">
                {/* Subtle background glow */}
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-indigo-500/5 to-transparent pointer-events-none" />
                <div className="relative z-10 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
