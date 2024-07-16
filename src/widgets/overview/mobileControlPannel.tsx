import Darkmode from "@/features/overview/mobileControlPannel.darkmode";
import MapType from "@/features/overview/mobileControlPannel.mapType";
import { Separator } from "@/shared/ui/separator";

const MobileControlPannel = () => {
  return (
    <div className="bg-background rounded-lg p-0.5">
      <Darkmode />
      <div className="px-1">
        <Separator />
      </div>
      <MapType />
    </div>
  );
};

export default MobileControlPannel;
