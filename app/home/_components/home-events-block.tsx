import { getEvents } from "@/app/_lib/api/fetch-generated";
import { EventCard } from "@/components/event-card";
import { Card, CardContent } from "@/components/ui/card";

function getWeekRange(today: Date) {
  const current = new Date(today);
  current.setHours(0, 0, 0, 0);

  const day = current.getDay(); // 0 = Sunday, 1 = Monday, ...
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const weekStart = new Date(current);
  weekStart.setDate(current.getDate() + diffToMonday);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  return { weekStart, weekEnd };
}

export async function HomeEventsBlock() {
  const eventsRes = await getEvents();

  if (eventsRes.status !== 200) {
    return <p>Erro ao carregar eventos</p>;
  }

  const { weekStart, weekEnd } = getWeekRange(new Date());

  const weekEvents = eventsRes.data
    .filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate >= weekStart && eventDate < weekEnd;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const nextWeekStart = new Date(weekEnd);
  const nextWeekEnd = new Date(nextWeekStart);
  nextWeekEnd.setDate(nextWeekStart.getDate() + 7);

  const nextWeekEvents = eventsRes.data
    .filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate >= nextWeekStart && eventDate < nextWeekEnd;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const shouldShowNextWeek = weekEvents.length === 0;
  const eventsToRender = shouldShowNextWeek ? nextWeekEvents : weekEvents;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold text-lg">
        {shouldShowNextWeek ? "Próxima Semana" : "Eventos da Semana"}
      </h2>

      {shouldShowNextWeek ? (
        <Card className="border-amber-200 bg-amber-50 text-amber-900">
          <CardContent className="py-3 text-lg">
            Não há eventos nesta semana.
          </CardContent>
        </Card>
      ) : null}

      {eventsToRender.length > 0 ? (
        eventsToRender.map((event) => (
          <EventCard
            key={event.id}
            name={event.name}
            date={event.date}
            location={event.location}
            responsibleGroup={event.responsibleGroup}
            responsibleMembers={event.responsibleMembers}
          />
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          {shouldShowNextWeek
            ? "Nenhum evento na próxima semana."
            : "Nenhum evento nesta semana."}
        </p>
      )}
    </div>
  );
}
