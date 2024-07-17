"use client";

import { useAirportDatabase } from "@/entities/airportDatabase/airportDatabase.codelataAirport";
import {
  FlightData,
  useFlightData,
} from "@/entities/flights/flights.flightRegNum";
import Map from "@/features/map/map";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
} from "@/shared/ui/drawer";
import FlightInfo from "@/widgets/overview/flightInfo";
import FlightSelect from "@/widgets/overview/flightSelect";
import MapControlPannel from "@/widgets/overview/mapControlPannel";
import clsx from "clsx";
import { useEffect, useState } from "react";

const OverView = () => {
  const [snap, setSnap] = useState<number | string | null>("300px");
  const [selectedFlight, setSelectedFlight] = useState<string>("");
  const [flightData, setFlightData] = useState<FlightData>();
  const [arrivalIataCode, setArrivalIataCode] = useState<string>("");

  const { data: _flightData, refetch: __flightDataRefetch } = useFlightData({
    regNum: selectedFlight,
  });
  const { data: arrivalAirportData, refetch: arrivalAirportDataRefetch } =
    useAirportDatabase({
      codeIataAirport: arrivalIataCode,
    });

  useEffect(() => {
    if (_flightData) {
      setFlightData(_flightData);
      if (_flightData.arrival?.iataCode) {
        setArrivalIataCode(_flightData.arrival.iataCode);
      }
    }
  }, [_flightData]);

  useEffect(() => {
    if (arrivalIataCode) {
      arrivalAirportDataRefetch();
    }
  }, [arrivalIataCode, arrivalAirportDataRefetch]);

  useEffect(() => {
    if (selectedFlight) {
      __flightDataRefetch();
    }
  }, [__flightDataRefetch, selectedFlight]);

  return (
    <main className="md:grid md:grid-rows-1 lg:grid-rows-1 flex-1 gap-4 overflow-auto md:p-4 md:grid-cols-2 lg:grid-cols-3 relative ">
      {/* PC */}
      <div className="hidden md:relative flex-col items-start gap-8 md:flex">
        <form className="grid w-full items-start gap-6">
          <FlightSelect setSelectedFlight={setSelectedFlight} />
          {flightData && <FlightInfo data={flightData} />}
        </form>
      </div>

      {/* Mobile */}
      <Drawer
        open
        modal={false}
        snapPoints={["160px", "300px", 1]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        dismissible={false}
      >
        <DrawerPortal>
          <DrawerContent className="fixed md:hidden bottom-0 left-0 right-0 h-full max-h-[97%] rounded-t-3xl border-none outline-none  ">
            <div
              className={clsx(
                "flex flex-col max-w-md mx-auto w-full p-4 pt-5 ",
                {
                  "overflow-y-auto": snap === 1,
                  "overflow-hidden": snap !== 1,
                }
              )}
            >
              <DrawerHeader className="hidden">
                <DrawerTitle>Flight DATA</DrawerTitle>
                <DrawerDescription>Flight DATA rendered here</DrawerDescription>
              </DrawerHeader>
              <form className="grid w-full items-start gap-6">
                <FlightSelect setSelectedFlight={setSelectedFlight} />
                {flightData && <FlightInfo data={flightData} />}
              </form>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>

      <div className="relative flex h-[calc(100%-100px)] md:h-full min-h flex-col md:rounded-xl bg-muted/50 lg:p-4 lg:col-span-2 gap-4 overflow-hidden ">
        <Map flightData={flightData} arrivalAirportData={arrivalAirportData} />
        <div className="fixed md:absolute right-4 md:right-8 top-4 md:top-8 flex flex-col justify-center items-center">
          <MapControlPannel />
        </div>
      </div>
    </main>
  );
};

export default OverView;
