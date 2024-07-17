import Darkmode from "@/features/overview/mapControlPannel.darkmode";
import MapType from "@/features/overview/mapControlPannel.mapType";
import { Separator } from "@/shared/ui/separator";

const MapControlPannel = () => {
  return (
    <>
      <div className="bg-background rounded-lg p-0.5 md:hidden">
        <Darkmode />
        <div className="px-1">
          <Separator />
        </div>
        <MapType />
      </div>
      <div className="bg-background rounded-lg hidden md:block">
        <MapType />
      </div>
    </>
  );
};

export default MapControlPannel;
