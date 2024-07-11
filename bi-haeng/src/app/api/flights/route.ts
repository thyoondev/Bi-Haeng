import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { FLIGHT_TRACKER_API_BASE_URL, FLIGHT_TRACKER_API_KEY } from "../static";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const flightIcao = searchParams.get("flightIcao");

  if (!flightIcao) {
    return NextResponse.json(
      { error: "Flight ICAO is required" },
      { status: 400 }
    );
  }
  try {
    const response = await axios.get(
      `${FLIGHT_TRACKER_API_BASE_URL}/flights?key=${FLIGHT_TRACKER_API_KEY}&flightIcao=${flightIcao}`
    );
    return NextResponse.json(response.data[0], { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
