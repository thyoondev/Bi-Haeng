import React from "react";
import InfoItem from "./flightInfo.item";

interface SpeedProps {
  speed?: {
    horizontal?: number;
    isGround?: number;
  };
}

const SpeedDetails: React.FC<SpeedProps> = ({ speed }) => {
  return (
    <div className="grid gap-3">
      <div className="font-semibold">Speed</div>
      <dl className="grid gap-3">
        <InfoItem
          label="Horizontal"
          value={speed?.horizontal + " km/h" || "N/A"}
        />
      </dl>
    </div>
  );
};

export default SpeedDetails;
