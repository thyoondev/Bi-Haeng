"use client";

import { GetFlightIcaoData } from "@/entities/flights/flights.flightIcao";
import Map from "@/features/map/map";
import FlightInfo from "@/widgets/overview/flightInfo";

const OverView = () => {
  const { data: flightIcaoData } = GetFlightIcaoData();
  return (
    <>
      <div
        className="relative hidden flex-col items-start gap-8 md:flex"
        x-chunk="dashboard-03-chunk-0"
      >
        <form className="grid w-full items-start gap-6">
          <FlightInfo data={flightIcaoData} />
        </form>
      </div>
      <div className="relative flex h-full min-h flex-col rounded-xl bg-muted/50 lg:p-4 lg:col-span-2 gap-4">
        <Map />
      </div>
    </>
  );
};

export default OverView;
