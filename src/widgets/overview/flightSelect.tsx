import SelectItemContent from "@/features/overview/flightSelect.SelectItemContent";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Plane } from "lucide-react";

interface FlightSelectProps {
  setSelectedFlight?: (value: string) => void;
}

const selectItems = [
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
    description: "B787-9 (server)",
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
];

const FlightSelect = ({ setSelectedFlight }: FlightSelectProps) => {
  return (
    <div className="relative  flex-1 md:grow-0 ">
      <Label htmlFor="Select a flight">Select a flight</Label>
      <Select onValueChange={setSelectedFlight}>
        <SelectTrigger
          id="Select a flight"
          className="items-start [&_[data-description]]:hidden mt-2"
        >
          <SelectValue placeholder="Select a flight" />
        </SelectTrigger>
        <SelectContent side="bottom">
          {selectItems.map((item) => (
            <SelectItemContent
              key={item.value}
              value={item.value}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FlightSelect;
