import { CircuitDiagram } from "@/components/CircuitDiagram";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Circuit = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link to="/">
              <Button variant="outline" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Circuit Diagram
            </h1>
            <p className="text-muted-foreground">
              Interactive wiring schematic for ESP32 IoT environmental monitoring system
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-primary/50 text-primary text-lg px-4 py-2"
          >
            Tinkercad Style
          </Badge>
        </div>

        {/* Circuit Diagram */}
        <CircuitDiagram />

        {/* Technical Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border-2 border-border/50">
            <h3 className="font-semibold text-primary mb-2">⚡ Power Supply</h3>
            <p className="text-sm text-muted-foreground">
              MH-Z19B requires 5V (directly from VIN/USB). DS18B20, moisture, and pH
              sensors use 3.3V from onboard regulator. Battery charges via solar panel
              through charge controller.
            </p>
          </div>
          <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border-2 border-border/50">
            <h3 className="font-semibold text-secondary mb-2">📡 Communication</h3>
            <p className="text-sm text-muted-foreground">
              CO2 uses UART (hardware serial), temperature uses 1-Wire protocol, moisture
              and pH use ADC inputs. ESP32's dual-core allows simultaneous sensor reading
              and WiFi transmission.
            </p>
          </div>
          <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border-2 border-border/50">
            <h3 className="font-semibold text-warning mb-2">⚠️ Important Notes</h3>
            <p className="text-sm text-muted-foreground">
              Add 4.7kΩ pull-up resistor on DS18B20 data line. Use voltage divider for
              pH sensor if output exceeds 3.3V. Capacitive moisture sensor is
              corrosion-resistant for long-term soil deployment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Circuit;
