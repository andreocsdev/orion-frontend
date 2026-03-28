import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { AuthFormCard } from "./_components/auth-form-card";
import Image from "next/image";

export default async function AuthPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
      credentials: "include",
    },
  });

  if (session.data?.user) redirect("/home");

  return (
    <StarsBackground className="relative flex min-h-svh flex-col items-center">
      <div className="flex-1" />

      <Image src={"/orion.png"} alt="Órion" width={300} height={300} />

      <div className="relative z-10 flex flex-col items-center gap-15 rounded-t-4xl px-5 pb-10 ">
        <div className="flex w-full flex-col items-center gap-6">
          <h1 className="w-full text-center font-heading text-[32px] font-semibold leading-[1.05] text-primary-foreground">
            Ministério Jovem Órion!
          </h1>
          <AuthFormCard />
        </div>

        <p className="font-heading text-xs leading-[1.4] text-primary-foreground/70">
          ©2026 Copyright Ministério Jovem Órion. Todos os direitos reservados
        </p>
      </div>
    </StarsBackground>
  );
}
