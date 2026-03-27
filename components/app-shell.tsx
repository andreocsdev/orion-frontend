"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <>
      <main className={`min-h-screen bg-white ${isAuthRoute ? "" : "pb-20"}`}>
        {children}
      </main>
      {!isAuthRoute ? <BottomNav /> : null}
    </>
  );
}
