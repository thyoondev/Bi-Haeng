import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface AirportData {
  GMT: string;
  airportId: number;
  codeIataAirport: string;
  codeIataCity: string;
  codeIcaoAirport: string;
  codeIso2Country: string;
  geonameId: string;
  latitudeAirport: number;
  longitudeAirport: number;
  nameAirport: string;
  nameCountry: string;
  phone: string;
  timezone: string;
}

interface GetAirportDatabaseParams {
  codeIataAirport?: string;
}

export const GetAirportDatabase = ({
  codeIataAirport,
}: GetAirportDatabaseParams) => {
  const { data, isLoading, refetch } = useQuery<AirportData | undefined, Error>(
    {
      queryKey: ["getAirportDatabase"],
      queryFn: async () => {
        if (!codeIataAirport) {
          return undefined;
        }
        const url = `/api/airportDatabase?codeIataAirport=${codeIataAirport}`;
        const response = await axios(url);
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        return response.data as AirportData;
      },
    }
  );

  return { data, isLoading, refetch };
};
