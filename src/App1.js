import React, { useState } from 'react';
//import {render} from 'react-dom';
import maplibregl, { Viewport } from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';
import Map,{ Marker } from 'react-map-gl';
const cities = [
  {name: "New York", lat: 40.7128, lon: -74.006},
  {name: "San francisco", lat: 37.7749, lon: -122.4194},
  {name: "London", lat: 51.5074, lon: -0.1278}
]
function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.7749, longitude: -122.4194, zoom: 10
  })
  return (
    // <Map
    //   initialViewState={{
    //     latitude: 37.8,
    //     longitude: -122.4,
    //     zoom: 14
    //   }}
    //   mapLib={maplibregl}
    //   style={{width: 800, height: 600}}
    //   mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    // >
    //   <Marker longitude={-122.4} latitude={37.8} color="red" />
    // </Map>
    <Map
      {...Viewport}
      width = "100%"
      height = "100%"
      onViewportChange = {setViewport}
      mapboxApiAccessToken ="pk.eyJ1IjoiZmFvc2FyYiIsImEiOiJjbGZpZDRuOXAzcnFzM3lwY2YxeGcxY2IzIn0.M75dH--i4E9plfW8zjm8UQ"
      >
{cities.map((city)=>(
  <Marker key={city.name} latitude={city.lat} longitude={city.lon}>
    <div>{city.name}</div>
  </Marker>
))}
    </Map>
  )
}
export default App;