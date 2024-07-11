import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { FLIGHT_TRACKER_API_BASE_URL, FLIGHT_TRACKER_API_KEY } from "../static";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const codeIataAirport = searchParams.get("codeIataAirport");

  if (!codeIataAirport) {
    return NextResponse.json(
      { error: "IATA airport code is required" },
      { status: 400 }
    );
  }
  try {
    const response = await axios.get(
      `${FLIGHT_TRACKER_API_BASE_URL}/airportDatabase?key=${FLIGHT_TRACKER_API_KEY}&codeIataAirport=${codeIataAirport}`
    );
    return NextResponse.json(response.data[0], { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
