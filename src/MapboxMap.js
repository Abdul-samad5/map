import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFvc2FyYiIsImEiOiJjbGZpZDRuOXAzcnFzM3lwY2YxeGcxY2IzIn0.M75dH--i4E9plfW8zjm8UQs';
const WEATHERSTACK_API_KEY = 'a7405021b6167ed9a1d82745ae499afc';

const MapboxMap = ({ latitude, longitude }) => {
  const [map, setMap] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 10,
    });

    const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(newMap);

    const newPopup = new mapboxgl.Popup({ closeButton: true });

    marker.getElement().addEventListener('click', () => {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${latitude},${longitude}`
        )
        .then((response) => {
          const { temperature, weather_descriptions, weather_icons } = response.data.current;
          newPopup.setLngLat([longitude, latitude]).setHTML(`
            <div>
              <h3>${weather_descriptions[0]}</h3>
              <img src="${weather_icons[0]}" alt="${weather_descriptions[0]}" />
              <p>Temperature: ${temperature} °C</p>
            </div>
          `);
          newPopup.addTo(newMap);
        })
        .catch((error) => console.log(error));
    });

    setMap(newMap);
    setPopup(newPopup);

    return () => {
      newMap.remove();
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapboxMap;
