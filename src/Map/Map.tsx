import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import L from 'leaflet';
import marker from '../assets/ufo.png';

import { ApiService } from '../ApiService';
import { flightsType } from '../interfaces/flightsData';
import './Map.scss';

function Map() {
  // TODO: fix any if not using mock data
  const [flights, setFlights] = useState<flightsType[]>([]);

  useEffect(() => {
    fetchFlights();

    const interval = setInterval(() => {
      console.log('This will be called every 5 seconds');
      fetchFlights();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchFlights = async () => {    
    const flights = await ApiService.fetchFlightData();
    setFlights(flights.response);
  };

  const planeIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [0, -20],
    iconSize: [25, 25],
    iconAnchor: [10, 20],
    className: 'icon',
  });

  return (
    <div className="map-container">
      <MapContainer
        id="map"
        center={[52.377956, 4.89707]}
        zoom={5}
        minZoom={2}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNkYXdlcSIsImEiOiJjbDJyZHF6a3EwNTFsM2xwZ3lnMG54OGcwIn0.SM5YMAIJYOM6d2Q6jTxhZw"
        />
        {flights &&
          flights.map((plane, index) => (
            <Marker
              key={index}
              position={[plane.lat, plane.lng]}
              icon={planeIcon}
            >
              <Popup>
                <ul>
                  <li>Hex: {plane.hex}</li>
                  <li>Flight number: {plane.flight_number}</li>
                  <li>Reg number: {plane.reg_number}</li>
                  <li>Aircraft: {plane.aircraft_icao}</li>
                  <li>Speed: {plane.speed}km/h</li>
                  <li>Departed from: {plane.dep_iata}</li>
                  <li>Arriving at: {plane.arr_iata}</li>
                </ul>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;
