import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Thermometer, Droplets, TestTube, Wind } from "lucide-react";

export const HardwareInfo = () => {
  const components = [
    {
      name: "ESP32 DevKit",
      icon: Cpu,
      specs: "Dual-core 240MHz, WiFi/BT",
      status: "active",
      color: "hsl(var(--primary))",
    },
    {
      name: "MH-Z19B",
      icon: Wind,
      specs: "NDIR CO₂, 400-5000ppm",
      status: "active",
      color: "hsl(var(--sensor-co2))",
    },
    {
      name: "DS18B20",
      icon: Thermometer,
      specs: "-55 to +125°C, ±0.5°C",
      status: "active",
      color: "hsl(var(--sensor-temp))",
    },
    {
      name: "Capacitive Moisture",
      icon: Droplets,
      specs: "Corrosion resistant",
      status: "active",
      color: "hsl(var(--sensor-moisture))",
    },
    {
      name: "Analog pH Sensor",
      icon: TestTube,
      specs: "pH 0-14 range",
      status: "active",
      color: "hsl(var(--sensor-ph))",
    },
  ];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 p-6">
      <h3 className="text-lg font-semibold mb-4">Hardware Components</h3>
      <div className="space-y-3">
        {components.map((component) => {
          const Icon = component.icon;
          return (
            <div
              key={component.name}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${component.color}20` }}
                >
                  <Icon className="h-4 w-4" style={{ color: component.color }} />
                </div>
                <div>
                  <p className="font-medium text-sm">{component.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {component.specs}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-secondary/50 text-secondary pulse-glow"
              >
                Active
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
