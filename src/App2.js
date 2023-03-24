import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'sk.eyJ1IjoiZmFvc2FyYiIsImEiOiJjbGZqMnozeGMxd2E2M3puend4em40ejZ1In0.jo2N6TJm8PWcR5VXCtfzmw';

const App = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);

  // Fetch 20 random cities from the OpenWeatherMap API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/find?lat=0&lon=0&cnt=20&appid=07491acb0b3a3b33973841bca44a1fea'
      );
      const data = await response.json();
      setCities(data.list);
      setFilteredCities(data.list);
    };
    fetchData();
  }, []);

  // Handle city filter
  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(filterValue)
    );
    setFilteredCities(filtered);
  };

  //Handle city selection
  const handleCityClick = (city) => {
    setCurrentCity(city);
    const map = new mapboxgl.Map({
     container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [city.coord.lon, city.coord.lat],
      zoom: 10,
    });
  //  const handleCityClick = (city) => {
  //   if (map) {
  //     map.fitBounds([
  //       [lon - 2, lat - 2],
  //       [lon + 2, lat + 2],
  //     ])}
  //     setActiveCity(city)}
 
  
  
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([city.coord.lon, city.coord.lat])
      .addTo(map);
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `
        <h3>${city.name}</h3>
        <p>${city.weather[0].description}</p>
        <p>Today: ${Math.round(city.main.temp)}°C</p>
        <p>Tomorrow: ${Math.round(city.main.temp + 1)}°C</p>
      `
    )
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([city.coord.lon, city.coord.lat])
      .setPopup(popup)
      .addTo(map);
  }

  return (
    <div>
      <div>
        <input type="text" onChange={handleFilterChange} />
        <ul>
          {filteredCities.map((city) => (
            <li key={city.id} onClick={() => handleCityClick(city)}>
              {city.name}
            </li>
          ))}
        </ul>
      </div>
      <div id="map" style={{ height: '500px', width: '100%' }} />
      {currentCity && (
        <div>
          <h2>{currentCity.name}</h2>
          <div>
            <div>
              <h3>Today</h3>
              <p>{currentCity.weather[0].description}</p>
              <p>{Math.round(currentCity.main.temp)}°C</p>
            </div>
            <div>
              <h3>Tomorrow</h3>
              <p>{currentCity.weather[0].description}</p>
              <p>{Math.round(currentCity.main.temp + 1)}°C</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

      
}
export default App;
