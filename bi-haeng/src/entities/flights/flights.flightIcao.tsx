import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Aircraft {
  iataCode: string;
  icao24: string;
  icaoCode: string;
  regNumber: string;
}

interface Airline {
  iataCode: string;
  icaoCode: string;
}

interface Airport {
  iataCode: string;
  icaoCode: string;
}

interface Flight {
  iataNumber: string;
  icaoNumber: string;
  number: string;
}

interface Geography {
  altitude: number;
  direction: number;
  latitude: number;
  longitude: number;
}

interface Speed {
  horizontal: number;
  isGround: number;
  vspeed: number;
}

interface System {
  squawk: string | null;
  updated: number;
}

export interface FlightData {
  aircraft: Aircraft;
  airline: Airline;
  arrival: Airport;
  departure: Airport;
  flight: Flight;
  geography: Geography;
  speed: Speed;
  status: string;
  system: System;
}

export const GetFlightIcaoData = () => {
  const { data, isLoading, refetch } = useQuery<FlightData | undefined, Error>({
    queryKey: ["getFlightIcaoData"],
    queryFn: async () => {
      const url = `/api/flights?flightIcao=APZ131`;
      const response = await axios(url);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      return response.data as FlightData;
    },
  });

  return { data, isLoading, refetch };
};
