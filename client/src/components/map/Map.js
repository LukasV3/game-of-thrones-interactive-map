import React from "react";
import "./styles.scss";
// import { MapContainer, TileLayer, Polygon, GeoJSON } from "react-leaflet";
import L from "leaflet";

import { getKingdoms } from "../../services/api";

class Map extends React.Component {
  async componentDidMount() {
    this.renderMap();

    this.addKingdomGeojson(await getKingdoms());
    this.toggleLayer("kingdom");
  }

  componentDidUpdate() {
    // only runs if there is a searchterm
    if (Object.keys(this.props.searchResult).length === 0) return;

    const { name, layerName, id } = this.props.searchResult;

    // this.setHighlightedRegion(name);

    if (!this.isLayerShowing(layerName)) {
      // Show result layer if currently hidden
      this.toggleMapLayer(layerName);
    }
    this.selectLocation(id, layerName);
  }

  /** Check if layer is added to map  */
  isLayerShowing(layerName) {
    return this.map.hasLayer(this.layers[layerName]);
  }

  /** Toggle map layer visibility */
  toggleMapLayer(layerName) {
    // Toggle active UI status
    document.querySelector(`[ref=${layerName}-toggle]`).classList.toggle("toggle-active");
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
    this.selectedRegion = null; // Store currently selected region

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
        this.map.closePopup(); // Deselect selected location marker
        this.setHighlightedRegion(layer); // Highlight kingdom polygon
        // this.triggerEvent("locationSelected", { name, id, type: "kingdom" });
        this.props.onKingdomClick(name, id);
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
    return <div ref="mapContainer" id="mapid" className="map-container"></div>;
  }
}

export default Map;
