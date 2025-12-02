import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Connection {
  id: string;
  from: { component: string; pin: string; x: number; y: number };
  to: { component: string; pin: string; x: number; y: number };
  color: string;
  label: string;
  voltage?: string;
}

export const CircuitDiagram = () => {
  const [activeConnection, setActiveConnection] = useState<string | null>(null);

  // Component positions
  const components = {
    esp32: { x: 400, y: 300, width: 180, height: 280 },
    co2: { x: 100, y: 100, width: 120, height: 80 },
    temp: { x: 100, y: 250, width: 100, height: 60 },
    moisture: { x: 100, y: 380, width: 100, height: 80 },
    ph: { x: 100, y: 520, width: 100, height: 60 },
    battery: { x: 700, y: 150, width: 80, height: 120 },
    solar: { x: 700, y: 350, width: 100, height: 80 },
  };

  // GPIO pin connections
  const connections: Connection[] = [
    // CO2 Sensor (MH-Z19B) - UART
    {
      id: "co2-tx",
      from: { component: "MH-Z19B", pin: "TX", x: 220, y: 130 },
      to: { component: "ESP32", pin: "GPIO16 (RX2)", x: 400, y: 320 },
      color: "hsl(var(--sensor-co2))",
      label: "UART RX",
    },
    {
      id: "co2-rx",
      from: { component: "MH-Z19B", pin: "RX", x: 220, y: 145 },
      to: { component: "ESP32", pin: "GPIO17 (TX2)", x: 400, y: 340 },
      color: "hsl(var(--sensor-co2))",
      label: "UART TX",
    },
    {
      id: "co2-vcc",
      from: { component: "MH-Z19B", pin: "VCC", x: 220, y: 115 },
      to: { component: "ESP32", pin: "5V", x: 400, y: 300 },
      color: "#ef4444",
      label: "5V Power",
      voltage: "5V",
    },
    {
      id: "co2-gnd",
      from: { component: "MH-Z19B", pin: "GND", x: 220, y: 160 },
      to: { component: "ESP32", pin: "GND", x: 400, y: 560 },
      color: "#000000",
      label: "Ground",
    },

    // Temperature Sensor (DS18B20) - 1-Wire
    {
      id: "temp-data",
      from: { component: "DS18B20", pin: "DATA", x: 200, y: 275 },
      to: { component: "ESP32", pin: "GPIO4", x: 400, y: 380 },
      color: "hsl(var(--sensor-temp))",
      label: "1-Wire Data",
    },
    {
      id: "temp-vcc",
      from: { component: "DS18B20", pin: "VCC", x: 200, y: 265 },
      to: { component: "ESP32", pin: "3.3V", x: 400, y: 300 },
      color: "#f97316",
      label: "3.3V Power",
      voltage: "3.3V",
    },
    {
      id: "temp-gnd",
      from: { component: "DS18B20", pin: "GND", x: 200, y: 295 },
      to: { component: "ESP32", pin: "GND", x: 400, y: 560 },
      color: "#000000",
      label: "Ground",
    },

    // Soil Moisture Sensor - Analog
    {
      id: "moisture-aout",
      from: { component: "Moisture", pin: "AOUT", x: 200, y: 410 },
      to: { component: "ESP32", pin: "GPIO34 (ADC)", x: 400, y: 420 },
      color: "hsl(var(--sensor-moisture))",
      label: "Analog Out",
    },
    {
      id: "moisture-vcc",
      from: { component: "Moisture", pin: "VCC", x: 200, y: 395 },
      to: { component: "ESP32", pin: "3.3V", x: 400, y: 300 },
      color: "#f97316",
      label: "3.3V Power",
      voltage: "3.3V",
    },
    {
      id: "moisture-gnd",
      from: { component: "Moisture", pin: "GND", x: 200, y: 445 },
      to: { component: "ESP32", pin: "GND", x: 400, y: 560 },
      color: "#000000",
      label: "Ground",
    },

    // pH Sensor - Analog
    {
      id: "ph-out",
      from: { component: "pH Sensor", pin: "OUT", x: 200, y: 545 },
      to: { component: "ESP32", pin: "GPIO35 (ADC)", x: 400, y: 460 },
      color: "hsl(var(--sensor-ph))",
      label: "Analog Out",
    },
    {
      id: "ph-vcc",
      from: { component: "pH Sensor", pin: "VCC", x: 200, y: 535 },
      to: { component: "ESP32", pin: "3.3V", x: 400, y: 300 },
      color: "#f97316",
      label: "3.3V Power",
      voltage: "3.3V",
    },
    {
      id: "ph-gnd",
      from: { component: "pH Sensor", pin: "GND", x: 200, y: 555 },
      to: { component: "ESP32", pin: "GND", x: 400, y: 560 },
      color: "#000000",
      label: "Ground",
    },

    // Battery
    {
      id: "battery-pos",
      from: { component: "Battery", pin: "+", x: 700, y: 180 },
      to: { component: "ESP32", pin: "VIN", x: 580, y: 300 },
      color: "#ef4444",
      label: "Battery +",
      voltage: "3.7-4.2V",
    },
    {
      id: "battery-neg",
      from: { component: "Battery", pin: "-", x: 700, y: 240 },
      to: { component: "ESP32", pin: "GND", x: 580, y: 560 },
      color: "#000000",
      label: "Battery -",
    },

    // Solar Panel
    {
      id: "solar-pos",
      from: { component: "Solar", pin: "+", x: 700, y: 375 },
      to: { component: "Battery", pin: "+", x: 720, y: 180 },
      color: "#eab308",
      label: "Solar +",
      voltage: "5-6V",
    },
    {
      id: "solar-neg",
      from: { component: "Solar", pin: "-", x: 700, y: 405 },
      to: { component: "Battery", pin: "-", x: 760, y: 240 },
      color: "#000000",
      label: "Solar -",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Legend */}
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-2 border-border/50">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              Hover over connections to see details
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant="outline"
              style={{ borderColor: "#ef4444", color: "#ef4444" }}
            >
              Power (5V)
            </Badge>
            <Badge
              variant="outline"
              style={{ borderColor: "#f97316", color: "#f97316" }}
            >
              Power (3.3V)
            </Badge>
            <Badge
              variant="outline"
              style={{ borderColor: "#000000", color: "#000000" }}
            >
              Ground
            </Badge>
            <Badge
              variant="outline"
              style={{
                borderColor: "hsl(var(--primary))",
                color: "hsl(var(--primary))",
              }}
            >
              Data/Signal
            </Badge>
          </div>
        </div>
      </Card>

      {/* Circuit Canvas */}
      <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-border/50 overflow-x-auto">
        <svg
          width="900"
          height="650"
          viewBox="0 0 900 650"
          className="w-full"
          style={{ minWidth: "900px" }}
        >
          {/* Grid background */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="1"
                cy="1"
                r="1"
                fill="hsl(var(--border))"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="900" height="650" fill="url(#grid)" />

          {/* Draw connections */}
          {connections.map((conn) => (
            <HoverCard key={conn.id} openDelay={100}>
              <HoverCardTrigger asChild>
                <g
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setActiveConnection(conn.id)}
                  onMouseLeave={() => setActiveConnection(null)}
                >
                  {/* Connection line */}
                  <line
                    x1={conn.from.x}
                    y1={conn.from.y}
                    x2={conn.to.x}
                    y2={conn.to.y}
                    stroke={conn.color}
                    strokeWidth={activeConnection === conn.id ? 4 : 2}
                    opacity={activeConnection === conn.id ? 1 : 0.6}
                    className="transition-all"
                  />
                  {/* Connection points */}
                  <circle
                    cx={conn.from.x}
                    cy={conn.from.y}
                    r={activeConnection === conn.id ? 6 : 4}
                    fill={conn.color}
                    className="transition-all"
                  />
                  <circle
                    cx={conn.to.x}
                    cy={conn.to.y}
                    r={activeConnection === conn.id ? 6 : 4}
                    fill={conn.color}
                    className="transition-all"
                  />
                </g>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold" style={{ color: conn.color }}>
                    {conn.label}
                  </h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>
                      <strong>From:</strong> {conn.from.component} ({conn.from.pin})
                    </p>
                    <p>
                      <strong>To:</strong> {conn.to.component} ({conn.to.pin})
                    </p>
                    {conn.voltage && (
                      <p>
                        <strong>Voltage:</strong> {conn.voltage}
                      </p>
                    )}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}

          {/* ESP32 Component */}
          <g>
            <rect
              x={components.esp32.x}
              y={components.esp32.y}
              width={components.esp32.width}
              height={components.esp32.height}
              fill="hsl(var(--card))"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              rx="8"
            />
            <text
              x={components.esp32.x + 90}
              y={components.esp32.y + 30}
              textAnchor="middle"
              fill="hsl(var(--primary))"
              className="font-bold text-lg"
            >
              ESP32
            </text>
            <text
              x={components.esp32.x + 90}
              y={components.esp32.y + 50}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              className="text-xs"
            >
              DevKit v1
            </text>

            {/* Pin labels on ESP32 */}
            {[
              { label: "VIN", y: 300 },
              { label: "5V", y: 300 },
              { label: "3.3V", y: 300 },
              { label: "GND", y: 560 },
              { label: "GPIO16", y: 320 },
              { label: "GPIO17", y: 340 },
              { label: "GPIO4", y: 380 },
              { label: "GPIO34", y: 420 },
              { label: "GPIO35", y: 460 },
            ].map((pin, i) => (
              <text
                key={i}
                x={components.esp32.x + 10}
                y={pin.y}
                fill="hsl(var(--muted-foreground))"
                className="text-xs font-mono"
              >
                {pin.label}
              </text>
            ))}

            {/* WiFi indicator */}
            <circle
              cx={components.esp32.x + 90}
              cy={components.esp32.y + 140}
              r="4"
              fill="hsl(var(--primary))"
              className="pulse-glow"
            />
            <text
              x={components.esp32.x + 90}
              y={components.esp32.y + 160}
              textAnchor="middle"
              fill="hsl(var(--primary))"
              className="text-xs"
            >
              WiFi
            </text>
          </g>

          {/* CO2 Sensor */}
          <g>
            <rect
              x={components.co2.x}
              y={components.co2.y}
              width={components.co2.width}
              height={components.co2.height}
              fill="hsl(var(--card))"
              stroke="hsl(var(--sensor-co2))"
              strokeWidth="2"
              rx="4"
            />
            <text
              x={components.co2.x + 60}
              y={components.co2.y + 30}
              textAnchor="middle"
              fill="hsl(var(--sensor-co2))"
              className="font-bold text-sm"
            >
              MH-Z19B
            </text>
            <text
              x={components.co2.x + 60}
              y={components.co2.y + 50}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              className="text-xs"
            >
              CO₂ Sensor
            </text>
          </g>

          {/* Temperature Sensor */}
          <g>
            <rect
              x={components.temp.x}
              y={components.temp.y}
              width={components.temp.width}
              height={components.temp.height}
              fill="hsl(var(--card))"
              stroke="hsl(var(--sensor-temp))"
              strokeWidth="2"
              rx="4"
            />
            <text
              x={components.temp.x + 50}
              y={components.temp.y + 25}
              textAnchor="middle"
              fill="hsl(var(--sensor-temp))"
              className="font-bold text-sm"
            >
              DS18B20
            </text>
            <text
              x={components.temp.x + 50}
              y={components.temp.y + 42}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              className="text-xs"
            >
              Temperature
            </text>
          </g>

          {/* Moisture Sensor */}
          <g>
            <rect
              x={components.moisture.x}
              y={components.moisture.y}
              width={components.moisture.width}
              height={components.moisture.height}
              fill="hsl(var(--card))"
              stroke="hsl(var(--sensor-moisture))"
              strokeWidth="2"
              rx="4"
            />
            <text
              x={components.moisture.x + 50}
              y={components.moisture.y + 30}
              textAnchor="middle"
              fill="hsl(var(--sensor-moisture))"
              className="font-bold text-sm"
            >
              Capacitive
            </text>
            <text
              x={components.moisture.x + 50}
              y={components.moisture.y + 47}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              className="text-xs"
            >
              Soil Moisture
            </text>
          </g>

          {/* pH Sensor */}
          <g>
            <rect
              x={components.ph.x}
              y={components.ph.y}
              width={components.ph.width}
              height={components.ph.height}
              fill="hsl(var(--card))"
              stroke="hsl(var(--sensor-ph))"
              strokeWidth="2"
              rx="4"
            />
            <text
              x={components.ph.x + 50}
              y={components.ph.y + 25}
              textAnchor="middle"
              fill="hsl(var(--sensor-ph))"
              className="font-bold text-sm"
            >
              Analog pH
            </text>
            <text
              x={components.ph.x + 50}
              y={components.ph.y + 42}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              className="text-xs"
            >
              pH Sensor
            </text>
          </g>

          {/* Battery */}
          <g>
            <rect
              x={components.battery.x}
              y={components.battery.y}
              width={components.battery.width}
              height={components.battery.height}
              fill="hsl(var(--card))"
              stroke="#ef4444"
              strokeWidth="2"
              rx="4"
            />
            <text
              x={components.battery.x + 40}
              y={components.battery.y + 50}
              textAnchor="middle"
              fill="#ef4444"
              className="font-bold text-sm"
            >
              Battery
            </text>
            <text
              x={components.battery.x + 40}
              y={components.battery.y + 70}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              className="text-xs"
            >
              3.7V Li-Ion
            </text>
          </g>

          {/* Solar Panel */}
          <g>
            <rect
              x={components.solar.x}
              y={components.solar.y}
              width={components.solar.width}
              height={components.solar.height}
              fill="hsl(var(--card))"
              stroke="#eab308"
              strokeWidth="2"
              rx="4"
            />
            <text
              x={components.solar.x + 50}
              y={components.solar.y + 35}
              textAnchor="middle"
              fill="#eab308"
              className="font-bold text-sm"
            >
              Solar
            </text>
            <text
              x={components.solar.x + 50}
              y={components.solar.y + 52}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              className="text-xs"
            >
              5V Panel
            </text>
          </g>
        </svg>
      </Card>

      {/* Pin Configuration Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <h3 className="font-semibold mb-3 text-primary">Digital Interfaces</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">MH-Z19B (UART):</span>
              <span className="font-mono">GPIO16/17</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">DS18B20 (1-Wire):</span>
              <span className="font-mono">GPIO4</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <h3 className="font-semibold mb-3 text-secondary">Analog Inputs</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Soil Moisture:</span>
              <span className="font-mono">GPIO34 (ADC1_6)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">pH Sensor:</span>
              <span className="font-mono">GPIO35 (ADC1_7)</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
