"use client";

import { GetAirportDatabase } from "@/entities/airportDatabase/airportDatabase.codelataAirport";
import {
  FlightData,
  GetFlightData,
} from "@/entities/flights/flights.flightRegNum";
import Map from "@/features/map/map";
import FlightInfo from "@/widgets/overview/flightInfo";
import FlightSelect from "@/widgets/overview/flightSelect";
import { useEffect, useState } from "react";

const OverView = () => {
  const [selectedFlight, setSelectedFlight] = useState<string>();
  const [flightData, setFlightData] = useState<FlightData>();
  const [arrivalIataCode, setArrivalIataCode] = useState<string | undefined>(
    undefined
  );

  const { data: _flightData, refetch: __flightDataRefetch } = GetFlightData({
    regNum: selectedFlight,
  });
  const { data: arrivalAirportData, refetch: arrivalAirportDataRefetch } =
    GetAirportDatabase({
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
    <>
      <div className="relative flex-col items-start gap-8 md:flex">
        <form className="grid w-full items-start gap-6">
          <FlightSelect setSelectedFlight={setSelectedFlight} />
          {flightData && <FlightInfo data={flightData} />}
        </form>
      </div>
      <div className="relative flex h-full min-h flex-col rounded-xl bg-muted/50 lg:p-4 lg:col-span-2 gap-4">
        <Map flightData={flightData} arrivalAirportData={arrivalAirportData} />
      </div>
    </>
  );
};

export default OverView;
