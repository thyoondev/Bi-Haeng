import React from "react";

interface SystemProps {
  system?: {
    updated?: number;
  };
}

const UpdatedAt: React.FC<SystemProps> = ({ system }) => {
  return (
    <div className="text-xs text-muted-foreground">
      Updated{" "}
      <time dateTime="2023-11-23">
        {system?.updated
          ? new Date(system?.updated * 1000).toLocaleString()
          : "N/A"}
      </time>
    </div>
  );
};

export default UpdatedAt;
