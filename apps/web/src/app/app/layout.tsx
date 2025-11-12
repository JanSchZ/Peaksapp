import Link from "next/link";
import type { ReactNode } from "react";

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-[0.4em] text-emerald-400">
            PEAKS
          </Link>
          <nav className="flex gap-4 text-sm text-slate-300">
            <Link className="hover:text-white" href="/app">
              Dashboard
            </Link>
            <Link className="hover:text-white" href="/importador">
              Importador IA
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
