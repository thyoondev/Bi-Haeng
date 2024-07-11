import React from "react";

interface InfoItemProps {
  label: string;
  value: string | number | null;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value !== null ? value : "N/A"}</span>
    </div>
  );
};

export default InfoItem;
