import { SelectItem } from "@/shared/ui/select";
import { ReactNode } from "react";

interface SelectItemContentProps {
  value: string;
  icon: ReactNode;
  title: string;
  description: string;
}

const SelectItemContent: React.FC<SelectItemContentProps> = ({
  value,
  icon,
  title,
  description,
}) => (
  <SelectItem value={value}>
    <div className="flex items-start gap-3 text-muted-foreground">
      <div className="size-5">{icon}</div>
      <div className="grid gap-0.5">
        <p>
          Air Premia{" "}
          <span className="font-medium text-foreground">{title}</span>
        </p>
        <p className="text-xs" data-description>
          {description}
        </p>
      </div>
    </div>
  </SelectItem>
);

export default SelectItemContent;
