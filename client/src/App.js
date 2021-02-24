import React from "react";
import "./styles/index.scss";
import Map from "./components/map/Map";
import InfoPanel from "./components/infoPanel/InfoPanel";

const App = () => {
  return (
    <div id="app-container">
      <Map />
      <InfoPanel />
    </div>
  );
};
// {/* <div id="map-placeholder">
// </div>
// <div id="layer-panel-placeholder"></div>
// <div id="search-panel-placeholder"></div>
// <div id="info-panel-placeholder"></div> */}

export default App;
