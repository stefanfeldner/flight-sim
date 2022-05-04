export interface flightsType {
  hex: string;
  reg_number: string;
  flag: string;
  lat: number;
  lng: number;
  alt: number;
  dir: number;
  speed: number;
  v_speed: number;
  flight_number: string;
  flight_icao: string;
  flight_iata: string;
  dep_icao: string;
  dep_iata: string;
  arr_icao: string;
  arr_iata: string;
  airline_icao: string;
  airline_iata: string;
  aircraft_icao: string;
  updated: number;
  status: string;
}

export interface requestType {
  client: {};
  currency: string;
  host: string;
  id: string;
  key: {};
  lang: string
  method: string
  params: {}
  pid: number;
  server: string;
  time: number;
  version: number;
}

export interface responseType {
  request: requestType;
  response: flightsType[];
  terms: string;
}