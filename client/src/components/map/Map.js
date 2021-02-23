import React, { useState, useEffect } from "react";
import "./styles.scss";
import { MapContainer, TileLayer, Polygon, GeoJSON } from "react-leaflet";
import L from "leaflet";

import { getKingdoms } from "../../services/api";

// const Map = () => {
//   const [kingdoms, setKingdoms] = useState([]);
//   const [layers, setLayers] = useState({});
//   const [selectedRegion, setSelectedRegion] = useState(null);
//   const [selected, setSelected] = useState({});

//   useEffect(() => {
//     // GET ALL KINGDOMS AND UPDATE STATE (COMPONENT DID MOUNT)
//     const fetchKingdoms = async () => {
//       let data = await getKingdoms();
//       setKingdoms(data);
//     };

//     fetchKingdoms();
//   }, []);

//   const options = { color: "#222", weight: 1, opacity: 0.65 };

//   console.log(kingdoms);

//   const setHighlightedRegion = (layer) => {
//     // If a layer is currently selected, deselect it
//     if (selected) {
//       layers.kingdom.resetStyle(selected);
//     }

//     // Select the provided region layer
//     setSelected(layer);
//     if (selected) {
//       selected.bringToFront();
//       selected.setStyle({ color: "blue" });
//     }
//   };

//   const onEachKingdom = (feature, layer) => {
//     layer.on({
//       click: (e) => {
//         const { name, id } = feature.properties;
//         console.log(feature, layer);
//         // this.map.closePopup(); // Deselect selected location marker
//         setHighlightedRegion(layer); // Highlight kingdom polygon
//         // this.triggerEvent("locationSelected", { name, id, type: "kingdom" });
//       },
//     });
//   };

//   return kingdoms.length !== 0 ? (
//     <MapContainer
//       className="map-container"
//       center={[5, 20]}
//       zoom={4}
//       maxZoom={8}
//       minZoom={4}
//       maxBounds={[
//         [50, -30],
//         [-45, 100],
//       ]}
//     >
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="https://cartocdn-gusc.global.ssl.fastly.net/ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png"
//       />

//       <GeoJSON data={kingdoms} style={options} onEachFeature={onEachKingdom} />
//     </MapContainer>
//   ) : (
//     <div>Data is loading...</div>
//   );
// };

class Map extends React.Component {
  state = {
    kingdoms: [],
  };

  async componentDidMount() {
    this.renderMap();

    let data = await getKingdoms();
    this.setState({ kingdoms: data });

    this.addKingdomGeojson(this.state.kingdoms);
  }

  renderMap() {
    this.map = L.map("map-container", {
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
      },
    });
  }

  /** Highlight the selected region */
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

  render() {
    return <div ref="mapContainer" id="map-container" className="map-container"></div>;
  }
}

export default Map;
