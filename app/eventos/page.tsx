import {
  getEvents,
  getGroups,
  getUserProfile,
} from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { CreateEventHeaderAction } from "./_components/create-event-header-action";
import { EventEditAction } from "./_components/event-edit-action";
import { EventCard } from "@/components/event-card";
import { PageHeader } from "@/components/page-header";
import { CalendarDays } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EventosPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  const [eventsRes, profileRes] = await Promise.all([
    getEvents(),
    getUserProfile(),
  ]);

  if (eventsRes.status !== 200) {
    return (
      <p className="p-5 text-sm text-muted-foreground">
        Erro ao carregar eventos.
      </p>
    );
  }

  const isAdmin = profileRes.status === 200 && profileRes.data.role === "ADMIN";
  const groupsRes = isAdmin ? await getGroups() : null;
  const groups = groupsRes?.status === 200 ? groupsRes.data : [];

  const sorted = [...eventsRes.data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="flex flex-col gap-4 px-5 pb-5">
      <PageHeader
        className="bg-linear-to-r from-blue-600 to-indigo-800"
        icon={<CalendarDays className="size-5 text-white" />}
        title="Eventos"
        description="Agenda geral do ministério."
        action={isAdmin ? <CreateEventHeaderAction groups={groups} /> : null}
      />

      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhum evento cadastrado.
        </p>
      ) : (
        sorted.map((event) => (
          <EventCard
            key={event.id}
            name={event.name}
            date={event.date}
            location={event.location}
            action={
              isAdmin ? <EventEditAction event={event} groups={groups} /> : null
            }
            responsibleGroup={event.responsibleGroup}
            responsibleMembers={event.responsibleMembers}
          />
        ))
      )}
    </div>
  );
}
