import React from "react";
import InfoItem from "./flightInfo.item";

interface GeographyProps {
  geography?: {
    altitude?: number;
    direction?: number;
    latitude?: number;
    longitude?: number;
  };
}

const GeographyDetails: React.FC<GeographyProps> = ({ geography }) => {
  return (
    <div className="grid gap-3">
      <div className="font-semibold">Geography</div>
      <dl className="grid gap-3">
        <InfoItem label="Altitude" value={geography?.altitude + "m" || "N/A"} />
        <InfoItem
          label="Direction"
          value={geography?.direction + "°" || "N/A"}
        />
        <InfoItem label="Latitude" value={geography?.latitude + "°" || "N/A"} />
        <InfoItem
          label="Longitude"
          value={geography?.longitude + "°" || "N/A"}
        />
      </dl>
    </div>
  );
};

export default GeographyDetails;
