import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, Wifi, Radio, Sun } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SystemStatusProps {
  battery: number;
  solar: boolean;
  connectivity: "wifi" | "lora" | "offline";
}

export const SystemStatus = ({
  battery,
  solar,
  connectivity,
}: SystemStatusProps) => {
  const getBatteryColor = (level: number) => {
    if (level > 60) return "hsl(var(--secondary))";
    if (level > 30) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const connectivityConfig = {
    wifi: { label: "Wi-Fi", icon: Wifi, color: "hsl(var(--primary))" },
    lora: { label: "LoRa", icon: Radio, color: "hsl(var(--secondary))" },
    offline: { label: "Offline", icon: Wifi, color: "hsl(var(--destructive))" },
  };

  const config = connectivityConfig[connectivity];
  const ConnIcon = config.icon;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">System Status</h3>
          <Badge
            variant="outline"
            className="border-primary/50 text-primary pulse-glow"
          >
            ONLINE
          </Badge>
        </div>

        {/* Battery Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery
                className="h-5 w-5"
                style={{ color: getBatteryColor(battery) }}
              />
              <span className="text-sm font-medium">Battery</span>
            </div>
            <span
              className="text-sm font-bold sensor-reading"
              style={{ color: getBatteryColor(battery) }}
            >
              {battery}%
            </span>
          </div>
          <Progress
            value={battery}
            className="h-2"
            style={{
              backgroundColor: "hsl(var(--muted))",
            }}
          />
        </div>

        {/* Solar Status */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            <Sun
              className={cn(
                "h-5 w-5",
                solar ? "text-warning pulse-glow" : "text-muted-foreground"
              )}
            />
            <span className="text-sm font-medium">Solar Panel</span>
          </div>
          <Badge variant={solar ? "default" : "secondary"}>
            {solar ? "Charging" : "Idle"}
          </Badge>
        </div>

        {/* Connectivity */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            <ConnIcon
              className="h-5 w-5"
              style={{ color: config.color }}
            />
            <span className="text-sm font-medium">Connectivity</span>
          </div>
          <Badge
            variant="outline"
            style={{
              borderColor: config.color,
              color: config.color,
            }}
          >
            {config.label}
          </Badge>
        </div>

        {/* ESP32 Info */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">MCU</span>
              <p className="font-semibold text-primary">ESP32</p>
            </div>
            <div>
              <span className="text-muted-foreground">Frequency</span>
              <p className="font-semibold sensor-reading">240 MHz</p>
            </div>
            <div>
              <span className="text-muted-foreground">Uptime</span>
              <p className="font-semibold sensor-reading">12h 34m</p>
            </div>
            <div>
              <span className="text-muted-foreground">Memory</span>
              <p className="font-semibold sensor-reading">87%</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
