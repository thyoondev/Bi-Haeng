import React from "react";

interface LocationProps {
  title: string;
  location?: {
    iataCode?: string;
    icaoCode?: string;
  };
}

const LocationDetails: React.FC<LocationProps> = ({ title, location }) => {
  return (
    <div className="grid gap-3">
      <div className="font-semibold">{title}</div>
      <span>{location?.iataCode || location?.icaoCode || "N/A"}</span>
    </div>
  );
};

export default LocationDetails;
