import { FlightData } from "@/entities/flights/flights.flightRegNum";
import AircraftDetails from "@/features/overview/flightInfo.AircraftDetails";
import GeographyDetails from "@/features/overview/flightInfo.GeographyDetails";
import LocationDetails from "@/features/overview/flightInfo.LocationDetails";
import SpeedDetails from "@/features/overview/flightInfo.SpeedDetails";
import UpdatedAt from "@/features/overview/flightInfo.UpdatedAt";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { Copy } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const FlightInfo = ({ data }: { data: FlightData | undefined }) => {
  const { aircraft, arrival, flight, departure, geography, speed, system } =
    data || {};

  return (
    <Card className="overflow-hidden touch-none">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {flight?.iataNumber || flight?.icaoNumber || "N/A"}
            <CopyToClipboard
              text={flight?.iataNumber || flight?.icaoNumber || "N/A"}
            >
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Flight Number</span>
              </Button>
            </CopyToClipboard>
          </CardTitle>
          <CardDescription>{flight?.icaoNumber || ""}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <Plane className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track on Map
            </span>
          </Button> */}
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm overflow-auto">
        <AircraftDetails aircraft={aircraft} />
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <LocationDetails title="Departure" location={departure} />
          <LocationDetails title="Arrival" location={arrival} />
        </div>
        <Separator className="my-4" />
        <SpeedDetails speed={speed} />
        <Separator className="my-4" />
        <GeographyDetails geography={geography} />
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <UpdatedAt system={system} />
      </CardFooter>
    </Card>
  );
};

export default FlightInfo;
