import React, { useState } from "react";
import "./styles/index.scss";
import Map from "./components/map/Map";
import InfoPanel from "./components/infoPanel/InfoPanel";

import { getKingdomInfo } from "./services/api";

const App = () => {
  const [selected, setSelected] = useState({});

  const showInfo = async (name, id) => {
    // Download and display information, based on location type
    const kingdomInfo = await getKingdomInfo(id);
    setSelected({ name, summary: kingdomInfo.summary });
  };
  return (
    <div id="app-container">
      <Map onKingdomClick={showInfo} />
      <InfoPanel name={selected.name} summary={selected.summary} />
    </div>
  );
};
// {/* <div id="map-placeholder">
// </div>
// <div id="layer-panel-placeholder"></div>
// <div id="search-panel-placeholder"></div>
// <div id="info-panel-placeholder"></div> */}

export default App;
