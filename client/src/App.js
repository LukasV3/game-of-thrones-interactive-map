import React from "react";
import "./styles/index.scss";
import Map from "./components/map/Map";
import InfoPanel from "./components/infoPanel/InfoPanel";
import SearchBar from "./components/searchBar/SearchBar";

import Search from "./services/search";
import kingdoms from "./services/api";

class App extends React.Component {
  state = {
    selected: {},
    searchResult: {},
  };

  async componentDidMount() {
    // Download kingdom boundaries
    const res = await kingdoms.get("/");
    const kingdomsGeojson = res.data;

    // Add boundary data to search service
    Search.addGeoJsonItems(kingdomsGeojson, "kingdom");
  }

  showInfo = async (name, id) => {
    // Download and display kingdom information
    const res = await kingdoms.get(`/${id}/summary`);
    const { summary } = res.data;
    this.setState({ selected: { name, summary }, searchResult: {} });
  };

  updateSearchResult = (searchResult) => {
    this.setState({ searchResult: searchResult.item });
  };

  render() {
    return (
      <div>
        <Map onKingdomClick={this.showInfo} searchResult={this.state.searchResult} />
        <InfoPanel
          name={this.state.selected.name}
          summary={this.state.selected.summary}
        />
        <SearchBar onSearchClick={this.updateSearchResult} />
      </div>
    );
  }
}

export default App;
