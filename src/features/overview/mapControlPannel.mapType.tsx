import { mapTypeState } from "@/shared/store/map";
import { Button } from "@/shared/ui/button";
import { Earth, Map } from "lucide-react";
import { useRecoilState } from "recoil";

const MapType = () => {
  const [mapType, setMapType] = useRecoilState(mapTypeState);

  const toggleMapType = () => {
    setMapType((prevType) =>
      prevType === "monochrome" ? "worldmap" : "monochrome"
    );
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleMapType}>
      <Earth
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          mapType === "monochrome" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
      <Map
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          mapType === "monochrome" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
    </Button>
  );
};

export default MapType;
