"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, House, Trophy, UserRound } from "lucide-react";

const items = [
  { href: "/home", label: "Home", icon: House },
  { href: "/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/ranking", label: "Ranking", icon: Trophy },
  { href: "/perfil", label: "Perfil", icon: UserRound },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-around px-3">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-20 flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                active ? "text-blue-600" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
