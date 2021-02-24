import React, { useState, useEffect } from "react";
import "./styles/index.scss";
import Map from "./components/map/Map";
import InfoPanel from "./components/infoPanel/InfoPanel";
import SearchBar from "./components/searchBar/SearchBar";

import Search from "./services/search";
import { getKingdomInfo } from "./services/api";
import { getKingdoms } from "./services/api";

class App extends React.Component {
  state = {
    selected: {},
    searchResult: {},
    // kingdomsGeojson: [{ type: "MultiLineString", coordinates: [] }],
  };

  async componentDidMount() {
    // Download kingdom boundaries
    const kingdomsGeojson = await getKingdoms();

    // Add boundary data to search service
    Search.addGeoJsonItems(kingdomsGeojson, "kingdom");
  }

  showInfo = async (name, id) => {
    // Download and display information, based on location type
    const { summary } = await getKingdomInfo(id);
    this.setState({ selected: { name, summary } });
  };

  goToSearchResult = (searchResult) => {
    this.setState({ searchResult: searchResult.item });
  };

  render() {
    return (
      <div id="app-container">
        <Map
          // kingdomsGeojson={this.state.kingdomsGeojson}
          onKingdomClick={this.showInfo}
          searchResult={this.state.searchResult}
        />
        <InfoPanel
          name={this.state.selected.name}
          summary={this.state.selected.summary}
        />
        <SearchBar onSearchClick={this.goToSearchResult} />
      </div>
    );
  }
}

export default App;
