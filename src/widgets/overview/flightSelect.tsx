import { fetchFlightData } from "@/entities/flights/flights.flightRegNum";
import SelectItemContent from "@/features/overview/flightSelect.SelectItemContent";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { Plane } from "lucide-react";
import { useEffect, useState } from "react";

interface FlightSelectProps {
  setSelectedFlight?: (value: string) => void;
}

const FlightSelect = ({ setSelectedFlight }: FlightSelectProps) => {
  const [flightList, setFlightList] = useState([
    {
      value: "HL8387",
      icon: <Plane />,
      title: "HL8387",
      description: "B787-9",
    },
    {
      value: "HL8517",
      icon: <Plane />,
      title: "HL8517",
      description: "B787-9",
    },
    {
      value: "HL8388",
      icon: <Plane />,
      title: "HL8388",
      description: "B787-9",
    },
    {
      value: "HL8516",
      icon: <Plane />,
      title: "HL8516",
      description: "B787-9",
    },
    {
      value: "HL8389",
      icon: <Plane />,
      title: "HL8389",
      description: "B787-9",
    },
  ]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchAndPrefetchAllFlightData = async () => {
      const updatedFlights = await Promise.all(
        flightList.map(async (flight) => {
          try {
            await queryClient.prefetchQuery({
              queryKey: ["getFlightData" + flight.value],
              queryFn: () => fetchFlightData({ regNum: flight.value }),
            });

            const data = queryClient.getQueryData([
              "getFlightData" + flight.value,
            ]);

            if (data) {
              return flight;
            } else {
              throw new Error("Data not found in cache");
            }
          } catch (error) {
            return { ...flight, title: `${flight.title} (offline)` };
          }
        })
      );

      setFlightList(updatedFlights);
    };

    fetchAndPrefetchAllFlightData();
  }, [queryClient]);

  return (
    <div className="relative  flex-1 md:grow-0 ">
      <Label htmlFor="My Flight" className="font-semibold text-lg">
        My Flight
      </Label>
      <Select onValueChange={setSelectedFlight}>
        <SelectTrigger
          id="Select a flight"
          className="items-start [&_[data-description]]:hidden mt-2"
        >
          <SelectValue placeholder="Select a flight" />
        </SelectTrigger>
        <SelectContent side="bottom">
          {flightList.map((flight) => (
            <SelectItemContent
              key={flight.value}
              value={flight.value}
              icon={flight.icon}
              title={flight.title}
              description={flight.description}
            />
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FlightSelect;
