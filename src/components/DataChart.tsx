import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DataPoint {
  time: string;
  co2: number;
  temp: number;
  moisture: number;
  ph: number;
}

interface DataChartProps {
  data: DataPoint[];
}

export const DataChart = ({ data }: DataChartProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 p-6">
      <h3 className="text-lg font-semibold mb-4">Historical Data (Last 24h)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="time"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="co2"
            stroke="hsl(var(--sensor-co2))"
            strokeWidth={2}
            dot={false}
            name="CO₂ (ppm)"
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="hsl(var(--sensor-temp))"
            strokeWidth={2}
            dot={false}
            name="Temp (°C)"
          />
          <Line
            type="monotone"
            dataKey="moisture"
            stroke="hsl(var(--sensor-moisture))"
            strokeWidth={2}
            dot={false}
            name="Moisture (%)"
          />
          <Line
            type="monotone"
            dataKey="ph"
            stroke="hsl(var(--sensor-ph))"
            strokeWidth={2}
            dot={false}
            name="pH"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
