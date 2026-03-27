"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  date: Date | undefined;
  onDateChange: (value: Date | undefined) => void;
  time: string;
  onTimeChange: (value: string) => void;
};

export function DateTimePicker({
  date,
  onDateChange,
  time,
  onTimeChange,
}: Props) {
  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="w-full justify-start"
            type="button"
            variant="outline"
          >
            <CalendarIcon className="size-4" />
            {date
              ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
              : "Selecione uma data"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={onDateChange} />
        </PopoverContent>
      </Popover>

      <Input
        type="time"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
        required
      />
    </div>
  );
}
