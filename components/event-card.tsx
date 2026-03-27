import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { ReactNode } from "react";

const MONTHS_PT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function parseEventDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = MONTHS_PT[d.getMonth()];
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const time = `${hours}h${minutes.toString().padStart(2, "0")}`;
  return { day, month, time };
}

type EventCardProps = {
  name: string;
  date: string;
  location: string;
  action?: ReactNode;
  responsibleGroup?: string | null;
  responsibleMembers?: {
    name: string;
    image: string | null;
  }[];
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "--";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function EventCard({
  name,
  date,
  location,
  action,
  responsibleGroup,
  responsibleMembers = [],
}: EventCardProps) {
  const { day, month, time } = parseEventDate(date);

  return (
    <Card className="group relative overflow-hidden border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="absolute inset-x-0 top-0 h-3 bg-linear-to-r from-indigo-500 to-cyan-500" />
      <CardContent className="py-2">
        <div className="flex flex-row items-center gap-4">
          <div className="flex min-w-13 flex-col items-center justify-center rounded-xl border border-gray-200 bg-linear-to-br from-gray-100 to-gray-200 px-3 py-2">
            <span className="text-2xl font-bold leading-none text-black">
              {day}
            </span>
            <span className="text-xs font-semibold text-gray-500">{month}</span>
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <p className="font-semibold text-black">{name}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="size-3.5 shrink-0" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="size-3.5 shrink-0" />
              <span>{location}</span>
            </div>
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </div>

        <div className="my-3 h-px bg-gray-100" />

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <p className="text-xs text-gray-500">Grupo Responsável</p>
            <span className="text-sm font-medium text-gray-700">
              {responsibleGroup ?? "Não definido"}
            </span>
          </div>

          {responsibleMembers.length > 0 ? (
            <div className="flex -space-x-2">
              {responsibleMembers.slice(0, 4).map((member, idx) => (
                <div
                  key={`${member.name}-${idx}`}
                  className="size-7 rounded-full bg-linear-to-br from-indigo-500 to-cyan-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-semibold"
                  style={{ zIndex: 10 - idx }}
                  title={member.name}
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="size-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(member.name)
                  )}
                </div>
              ))}
              {responsibleMembers.length > 4 ? (
                <div className="size-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] text-gray-700 font-semibold">
                  +{responsibleMembers.length - 4}
                </div>
              ) : null}
            </div>
          ) : (
            <span className="text-xs text-gray-500">Sem responsáveis</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
