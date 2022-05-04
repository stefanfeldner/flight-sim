import { responseType } from "./interfaces/flightsData";

export const ApiService = {
  fetchFlightData: async () => {
    const res: Response = await fetch(`https://airlabs.co/api/v9/flights?api_key=${process.env.REACT_APP_API_KEY}&dep_icao=EHAM`)
    const flightsData: responseType = await res.json();
    return flightsData;
  }
}