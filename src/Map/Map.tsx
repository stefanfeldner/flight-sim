import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import marker from '../assets/aeroplane.png';
import { mockData } from '../data/mockData';

import { ApiService } from '../ApiService';
import { flightsType } from '../interfaces/flightsData';
import './Map.scss';

function Map() {
  const [flights, setFlights] = useState<any[]>([]);
  const [flight, setFlight] = useState<any>();

  useEffect(() => {
    (async () => {
      // const flights = await ApiService.fetchFlightData();
      console.log('mockData', mockData);
      setFlights(mockData.response);
      setFlight(mockData.response[0]);
    })();
  }, []);
  
  const [markerAngle, setMarkerAngle] = useState(120);

  const planeIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [20, 20],
    rotationOrigin: 'center',
    rotationAngle: markerAngle
  });
  
  // const corner1 = L.latLng(40.712, -74.227);
  // const corner2 = L.latLng(40.774, -74.125);
  // const bounds = L.latLngBounds(corner1, corner2);

  return (
    <div className="map-container">
      <MapContainer
        id="map"
        center={[52.3733, 13.5064]}
        zoom={8}
        minZoom={4}
        scrollWheelZoom={false}
        
      >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNkYXdlcSIsImEiOiJjbDJyZHF6a3EwNTFsM2xwZ3lnMG54OGcwIn0.SM5YMAIJYOM6d2Q6jTxhZw"
        />
        {flights &&
          flights.map((plane, index) => (
            <Marker 
              key={index}
              position={[plane.lat, plane.lng]}
              icon={planeIcon}
            ></Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;
