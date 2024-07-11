"use client";

import { GetAirportDatabase } from "@/entities/airportDatabase/airportDatabase.codelataAirport";
import {
  FlightData,
  GetFlightIcaoData,
} from "@/entities/flights/flights.flightIcao";
import Map from "@/features/map/map";
import FlightInfo from "@/widgets/overview/flightInfo";
import { useEffect, useState } from "react";

const OverView = () => {
  const [flightData, setFlightData] = useState<FlightData>();
  const [arrivalIataCode, setArrivalIataCode] = useState<string | undefined>(
    undefined
  );

  const { data: flightIcaoData } = GetFlightIcaoData();
  const { data: arrivalAirportData, refetch: arrivalAirportDataRefetch } =
    GetAirportDatabase({
      codeIataAirport: arrivalIataCode,
    });

  useEffect(() => {
    if (flightIcaoData) {
      setFlightData(flightIcaoData);
      if (flightIcaoData.arrival?.iataCode) {
        setArrivalIataCode(flightIcaoData.arrival.iataCode);
      }
    }
  }, [flightIcaoData]);

  useEffect(() => {
    if (arrivalIataCode) {
      arrivalAirportDataRefetch();
    }
  }, [arrivalIataCode, arrivalAirportDataRefetch]);

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
        <Map flightData={flightData} arrivalAirportData={arrivalAirportData} />
      </div>
    </>
  );
};

export default OverView;
