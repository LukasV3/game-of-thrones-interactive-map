import React from "react";
import "./styles/index.scss";
import Map from "./components/map/Map";

const App = () => {
  return (
    <div id="app-container">
      <div id="map-placeholder">
        <Map />
      </div>
      <div id="layer-panel-placeholder"></div>
      <div id="search-panel-placeholder"></div>
      <div id="info-panel-placeholder"></div>
    </div>
  );
};

export default App;
