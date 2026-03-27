import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function PageHeader({
  icon,
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn("-mx-5 rounded-b-3xl px-6 pt-12 pb-8 shadow-lg", className)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {description && (
              <p className="text-sm text-white/75">{description}</p>
            )}
          </div>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
