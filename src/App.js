import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFvc2FyYiIsImEiOiJjbGZpZDRuOXAzcnFzM3lwY2YxeGcxY2IzIn0.M75dH--i4E9plfW8zjm8UQs';

function App() {
  const [cities, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  const [map, setMap] = useState(null);

  // Load the list of cities on component mount
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(
        "https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json"
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCities();
  }, []);

  // Initialize the map when the component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 2,
    });

    setMap(map);

    return () => {
      map.remove();
    };
  }, []);

  // Center the map on the active city when it changes
  useEffect(() => {
    if (activeCity && map) {
      const { lat, lon } = activeCity.coord;
      map.flyTo({
        center: [lon, lat],
        zoom: 10,
      });
    }
  }, [activeCity, map]);

  function handleCityClick(city) {
    // Check if the coordinates for the selected city are available
    //if (city.coord) {
      // Find the coordinates of the selected city
      const { lat, lon } = city.coord;
  
      // Center the map on the selected city
      if (map) {
        map.flyTo({
          center: [lon, lat],
          zoom: 10,
        });
     // }
  
      // Set the selected city as the active city
      setActiveCity(city);
    }
  }
  

  function handleSearchChange(event) {
    const value = event.target.value.toLowerCase();
    const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().startsWith(value)
    );
    setCities(filteredCities);
  }

  return (
    <div className="App">
      <div className="Sidebar">
        <h2>20 Random Cities</h2>
        <input type="text" onChange={handleSearchChange} />
        <ul>
          {cities.slice(0, 20).map((city) => (
            <li
              key={city.id}
              onClick={() => handleCityClick(city)}
              className={activeCity && activeCity.id === city.id ? "active" : ""}
            >
              {city.name}
              {activeCity && activeCity.id === city.id && (
                <i className="fa fa-info-circle"></i>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div id="map"></div>
    </div>
  );
}

export default App;
