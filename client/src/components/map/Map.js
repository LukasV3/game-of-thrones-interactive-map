import React from "react";
import "./styles.scss";
import L from "leaflet";

import kingdoms from "../../services/api";

class Map extends React.Component {
  async componentDidMount() {
    this.renderMap();

    const res = await kingdoms.get("/");
    this.addKingdomGeojson(res.data);
    this.toggleLayer("kingdom");
  }

  componentDidUpdate() {
    // only runs if there is a searchterm
    if (!this.props.searchResult.name) return;
    this.selectLocation(this.props.searchResult.id, this.props.searchResult.layerName);
  }

  /** Trigger "click" on layer with provided name */
  selectLocation(id, layerName) {
    // Find selected layer
    const geojsonLayer = this.layers[layerName];
    const sublayers = geojsonLayer.getLayers();
    const selectedSublayer = sublayers.find((layer) => {
      return layer.feature.geometry.properties.id === id;
    });

    // Zoom map to selected layer
    this.map.flyToBounds(selectedSublayer.getBounds(), 5);

    // Fire click event
    selectedSublayer.fireEvent("click");
  }

  renderMap() {
    this.map = L.map("mapid", {
      center: [5, 20],
      zoom: 4,
      maxZoom: 8,
      minZoom: 4,
      maxBounds: [
        [50, -30],
        [-45, 100],
      ],
    });

    this.map.zoomControl.setPosition("bottomright"); // Position zoom control
    this.layers = {}; // Map layer dict (key/value = title/layer)

    // Render Carto GoT tile baselayer
    L.tileLayer(
      "https://cartocdn-gusc.global.ssl.fastly.net/ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png",
      { crs: L.CRS.EPSG4326 }
    ).addTo(this.map);
  }

  addKingdomGeojson(geojson) {
    // Initialize new geojson layer
    this.layers.kingdom = L.geoJSON(geojson, {
      // Set layer style
      style: {
        color: "#222",
        weight: 1,
        opacity: 0.65,
      },
      onEachFeature: this.onEachKingdom.bind(this),
    });
  }

  /** Assign click listener for each kingdom GeoJSON item  */
  onEachKingdom(feature, layer) {
    layer.on({
      click: (e) => {
        const { name, id } = feature.properties;
        this.setHighlightedRegion(layer); // Highlight kingdom polygon
        this.props.onKingdomClick(name, id); // Show kingdom info in InfoPanel
      },
    });
  }

  setHighlightedRegion(layer) {
    // If a layer is currently selected, deselect it
    if (this.selected) {
      this.layers.kingdom.resetStyle(this.selected);
    }

    // Select the provided region layer
    this.selected = layer;
    if (this.selected) {
      this.selected.bringToFront();
      this.selected.setStyle({ color: "blue" });
    }
  }

  /** Toggle map layer visibility */
  toggleLayer(layerName) {
    const layer = this.layers[layerName];
    if (this.map.hasLayer(layer)) {
      this.map.removeLayer(layer);
    } else {
      this.map.addLayer(layer);
    }
  }

  render() {
    return <div id="mapid" className="map-container"></div>;
  }
}

export default Map;
