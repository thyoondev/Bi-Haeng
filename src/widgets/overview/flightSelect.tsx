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
    flightList.forEach((flight) => {
      queryClient.prefetchQuery({
        queryKey: ["getFlightData", flight.value],
        queryFn: async () => {
          try {
            const data = await fetchFlightData({ regNum: flight.value });
            return data;
          } catch (error) {
            console.error(
              `Error fetching flight data for ${flight.value}:`,
              error
            );
            setFlightList((prevItems) =>
              prevItems.map((prevItem) =>
                prevItem.value === flight.value
                  ? { ...prevItem, title: `${prevItem.title} (offline)` }
                  : prevItem
              )
            );
            throw error; // Rethrow the error to ensure prefetchQuery handles it as an error
          }
        },
      });
    });
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
