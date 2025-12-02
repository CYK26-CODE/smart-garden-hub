import { useState, useEffect } from "react";
import { SensorCard } from "@/components/SensorCard";
import { SystemStatus } from "@/components/SystemStatus";
import { DataChart } from "@/components/DataChart";
import { HardwareInfo } from "@/components/HardwareInfo";
import { Wind, Thermometer, Droplets, TestTube, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  // Sensor states based on actual hardware specs
  const [co2, setCo2] = useState(450); // MH-Z19B: 400-5000ppm
  const [temperature, setTemperature] = useState(22.5); // DS18B20: -55 to +125°C
  const [moisture, setMoisture] = useState(65); // 0-100%
  const [ph, setPh] = useState(6.8); // 0-14
  const [battery, setBattery] = useState(78);
  const [solar, setSolar] = useState(true);
  const [connectivity] = useState<"wifi" | "lora">("wifi");

  // Historical data for chart
  const [chartData, setChartData] = useState(() => {
    const data = [];
    for (let i = 23; i >= 0; i--) {
      data.push({
        time: `${i}h`,
        co2: 400 + Math.random() * 200,
        temp: 20 + Math.random() * 5,
        moisture: 60 + Math.random() * 15,
        ph: 6.5 + Math.random() * 1,
      });
    }
    return data;
  });

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      // CO2: Normal range 400-1000ppm (follows MH-Z19B specs)
      setCo2((prev) => {
        const change = (Math.random() - 0.5) * 20;
        return Math.max(400, Math.min(1500, prev + change));
      });

      // Temperature: -55 to +125°C (DS18B20 specs)
      setTemperature((prev) => {
        const change = (Math.random() - 0.5) * 0.5;
        return Math.max(-10, Math.min(40, prev + change));
      });

      // Soil moisture: 0-100%
      setMoisture((prev) => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(0, Math.min(100, prev + change));
      });

      // pH: 0-14 scale
      setPh((prev) => {
        const change = (Math.random() - 0.5) * 0.1;
        return Math.max(0, Math.min(14, prev + change));
      });

      // Battery simulation
      setBattery((prev) => {
        const change = solar ? 0.1 : -0.05;
        return Math.max(20, Math.min(100, prev + change));
      });

      // Solar status
      const hour = new Date().getHours();
      setSolar(hour >= 6 && hour <= 18);
    }, 2000);

    return () => clearInterval(interval);
  }, [solar]);

  const getSensorStatus = (value: number, min: number, max: number) => {
    if (value < min || value > max) return "critical";
    if (value < min * 1.1 || value > max * 0.9) return "warning";
    return "normal";
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Environmental Monitor
            </h1>
            <p className="text-muted-foreground">
              Real-time IoT sensor data simulation based on hardware specifications
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-primary/50 text-primary text-lg px-4 py-2"
          >
            ESP32 + Sensors
          </Badge>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sensor Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SensorCard
                title="Carbon Dioxide"
                value={co2.toFixed(0)}
                unit="ppm"
                icon={Wind}
                status={getSensorStatus(co2, 400, 1000)}
                range="MH-Z19B: 400-5000ppm"
                color="hsl(var(--sensor-co2))"
                trend={
                  co2 > 600 ? (
                    <div className="flex items-center gap-1 text-warning text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>Elevated</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-secondary text-sm">
                      <TrendingDown className="h-4 w-4" />
                      <span>Normal</span>
                    </div>
                  )
                }
              />

              <SensorCard
                title="Temperature"
                value={temperature.toFixed(1)}
                unit="°C"
                icon={Thermometer}
                status={getSensorStatus(temperature, 15, 30)}
                range="DS18B20: -55 to +125°C"
                color="hsl(var(--sensor-temp))"
              />

              <SensorCard
                title="Soil Moisture"
                value={moisture.toFixed(0)}
                unit="%"
                icon={Droplets}
                status={getSensorStatus(moisture, 40, 80)}
                range="Capacitive: 0-100%"
                color="hsl(var(--sensor-moisture))"
              />

              <SensorCard
                title="pH Level"
                value={ph.toFixed(2)}
                unit="pH"
                icon={TestTube}
                status={getSensorStatus(ph, 6.0, 7.5)}
                range="Analog: 0-14 scale"
                color="hsl(var(--sensor-ph))"
              />
            </div>

            {/* Chart */}
            <DataChart data={chartData} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SystemStatus
              battery={battery}
              solar={solar}
              connectivity={connectivity}
            />
            <HardwareInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
