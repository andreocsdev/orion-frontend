import { Flame } from "lucide-react";
import { SignOutButton } from "./sign-out-button";

type Props = {
  name: string;
  streak: number;
};

const WEEKDAYS_PT = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

const MONTHS_PT = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function HomeHeader({ name, streak }: Props) {
  const today = new Date();
  const weekday = WEEKDAYS_PT[today.getDay()];
  const day = today.getDate();
  const month = MONTHS_PT[today.getMonth()];
  const formattedDate = `${weekday}, ${day} de ${month}`;

  const firstName = name.split(" ")[0];
  const flameOn = streak > 0;

  return (
    <div className="-mx-5 bg-linear-to-r from-blue-600 to-blue-900 rounded-b-3xl px-6 pt-12 pb-8 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-3xl font-bold text-white mb-0.5">Olá, {firstName}! 👋</h1>
          <p className="text-purple-100 capitalize text-sm">{formattedDate}</p>
        </div>
        <SignOutButton />
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/90 text-sm mb-1">Sequência Atual</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">{streak}</span>
              <span className="text-xl text-white/90">dias</span>
            </div>
          </div>
          <div
            className={`p-4 rounded-full transition-all ${
              flameOn
                ? "bg-linear-to-br from-orange-400 to-red-500 shadow-[0_0_20px_rgba(251,146,60,0.8)]"
                : "bg-white/20"
            }`}
          >
            <Flame
              className={`w-10 h-10 transition-colors ${
                flameOn ? "text-white" : "text-white/50"
              }`}
            />
          </div>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-linear-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500"
            style={{ width: `${Math.min((streak / 30) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
