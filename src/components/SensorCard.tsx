import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  status: "normal" | "warning" | "critical";
  range?: string;
  color: string;
  trend?: ReactNode;
}

export const SensorCard = ({
  title,
  value,
  unit,
  icon: Icon,
  status,
  range,
  color,
  trend,
}: SensorCardProps) => {
  const statusColors = {
    normal: "border-secondary/50",
    warning: "border-warning/50",
    critical: "border-destructive/50",
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-2 bg-card/50 backdrop-blur-sm transition-all hover:scale-[1.02]",
        statusColors[status]
      )}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, transparent 100%)`,
        }}
      />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="h-5 w-5" style={{ color }} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {title}
              </h3>
              {range && (
                <p className="text-xs text-muted-foreground/60">{range}</p>
              )}
            </div>
          </div>
          <div
            className="h-2 w-2 rounded-full pulse-glow"
            style={{ backgroundColor: color }}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span
              className="text-4xl font-bold sensor-reading data-update"
              style={{ color }}
            >
              {value}
            </span>
            <span className="text-xl text-muted-foreground">{unit}</span>
          </div>
          {trend && <div className="mt-2">{trend}</div>}
        </div>
      </div>
    </Card>
  );
};
