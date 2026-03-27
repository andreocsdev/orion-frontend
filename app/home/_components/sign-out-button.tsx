"use client";

import { authClient } from "@/app/_lib/auth-client";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await authClient.signOut();
      router.replace("/auth");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      aria-label="Sair da conta"
      className="bg-white/20 backdrop-blur-sm p-3 rounded-full disabled:opacity-70"
    >
      <LogOut className="w-5 h-5 text-white" />
    </button>
  );
}