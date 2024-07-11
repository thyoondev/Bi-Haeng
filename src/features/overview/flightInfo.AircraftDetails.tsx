import React from "react";
import InfoItem from "./flightInfo.item";

interface AircraftProps {
  aircraft?: {
    iataCode?: string;
    icao24?: string;
    icaoCode?: string;
    regNumber?: string;
  };
}

const AircraftDetails: React.FC<AircraftProps> = ({ aircraft }) => {
  return (
    <div className="grid gap-3">
      <div className="font-semibold">Flight Details</div>
      <ul className="grid gap-3">
        <InfoItem
          label="Aircraft type"
          value={aircraft?.iataCode || aircraft?.icaoCode || "N/A"}
        />
        <InfoItem
          label="Registration"
          value={`${aircraft?.regNumber || "N/A"} ${
            aircraft?.icao24 ? `(${aircraft.icao24})` : ""
          }`}
        />
      </ul>
    </div>
  );
};

export default AircraftDetails;
