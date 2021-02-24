import React, { useState, useEffect } from "react";
import "./styles/index.scss";
import Map from "./components/map/Map";
import InfoPanel from "./components/infoPanel/InfoPanel";

import Search from "./services/search";
import { getKingdomInfo } from "./services/api";
import { getKingdoms } from "./services/api";

class App extends React.Component {
  state = {
    selected: {},
    // kingdomsGeojson: [{ type: "MultiLineString", coordinates: [] }],
  };

  async componentDidMount() {
    // Download kingdom boundaries
    const kingdomsGeojson = await getKingdoms();
    console.log(Search);
    // Add boundary data to search service
    Search.addGeoJsonItems(kingdomsGeojson, "kingdom");
  }

  showInfo = async (name, id) => {
    // Download and display information, based on location type
    const { summary } = await getKingdomInfo(id);
    this.setState({ selected: { name, summary } });
  };

  render() {
    return (
      <div id="app-container">
        <Map
          // kingdomsGeojson={this.state.kingdomsGeojson}
          onKingdomClick={this.showInfo}
        />
        <InfoPanel
          name={this.state.selected.name}
          summary={this.state.selected.summary}
        />
      </div>
    );
  }
}

export default App;
