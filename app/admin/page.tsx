import {
  getAvailableUsers,
  getEvents,
  getGroups,
  getUserProfile,
} from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
// import { AdminManagementPanel } from "../perfil/_components/admin-management-panel";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, ShieldCheck, UsersRound } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminManagementPanel } from "../perfil/_components/admin-management-panel";

export default async function AdminPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  const profileRes = await getUserProfile();

  if (profileRes.status !== 200) {
    return (
      <p className="p-5 text-sm text-muted-foreground">
        Erro ao carregar área administrativa.
      </p>
    );
  }

  if (profileRes.data.role !== "ADMIN") {
    redirect("/perfil");
  }

  const [groupsRes, availableUsersRes, eventsRes] = await Promise.all([
    getGroups(),
    getAvailableUsers(),
    getEvents(),
  ]);

  const groups = groupsRes.status === 200 ? groupsRes.data : [];
  const availableUsers =
    availableUsersRes.status === 200 ? availableUsersRes.data : [];
  const events = eventsRes.status === 200 ? eventsRes.data : [];

  return (
    <div className="flex flex-col gap-4 px-5 pb-5">
      <PageHeader
        className="bg-linear-to-r from-emerald-600 to-teal-800"
        icon={<ShieldCheck className="size-5 text-white" />}
        title="Admin"
        description="Gerencie todas as funcionalidades administrativas em um só lugar."
      />

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-xs text-emerald-700">Grupos</p>
              <p className="text-2xl font-bold text-emerald-900">
                {groups.length}
              </p>
            </div>
            <UsersRound className="size-5 text-emerald-700" />
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-xs text-blue-700">Eventos</p>
              <p className="text-2xl font-bold text-blue-900">
                {events.length}
              </p>
            </div>
            <CalendarDays className="size-5 text-blue-700" />
          </CardContent>
        </Card>

        <Card className="col-span-2 border-violet-200 bg-violet-50 md:col-span-1">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-xs text-violet-700">Usuários Disponíveis</p>
              <p className="text-2xl font-bold text-violet-900">
                {availableUsers.length}
              </p>
            </div>
            <ShieldCheck className="size-5 text-violet-700" />
          </CardContent>
        </Card>
      </section>

      <AdminManagementPanel groups={groups} availableUsers={availableUsers} />
    </div>
  );
}
