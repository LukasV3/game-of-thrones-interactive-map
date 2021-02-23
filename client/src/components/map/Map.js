import React, { useState, useEffect } from "react";
import "./styles.scss";
import { MapContainer, TileLayer, LayersControl, Polygon } from "react-leaflet";

import { getKingdoms } from "../../services/api";

const Map = () => {
  const [kingdoms, setKingdoms] = useState([]);

  useEffect(() => {
    // GET ALL KINGDOMS AND UPDATE STATE (COMPONENT DID MOUNT)
    const fetchKingdoms = async () => {
      let data = await getKingdoms();
      setKingdoms(data);
    };

    fetchKingdoms();
  }, []);

  // useEffect(() => {

  //   xonst map =  L.map("mapContainer", {
  //       center: [5, 20],
  //       zoom: 4,
  //       maxZoom: 8,
  //       minZoom: 4,
  //       maxBounds: [
  //         [50, -30],
  //         [-45, 100],
  //       ],
  //     })
  //   ;

  //   map.zoomControl.setPosition("bottomright"); // Position zoom control
  //   let layers = {}; // Map layer dict (key/value = title/layer)
  //   let selectedRegion = null; // Store currently selected region

  //   // Render Carto GoT tile baselayer
  //   L.tileLayer(
  //     "https://cartocdn-gusc.global.ssl.fastly.net/ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png",
  //     { crs: L.CRS.EPSG4326 }
  //   ).addTo(map);
  // });

  // addKingdomGeojson(geojson) {
  //   // Initialize new geojson layer
  //   this.layers.kingdom = L.geoJSON(geojson, {
  //     // Set layer style
  //     style: {
  //       color: "#222",
  //       weight: 1,
  //       opacity: 0.65,
  //     },
  //     onEachFeature: this.onEachKingdom.bind(this),
  //   });
  // }

  const options = { color: "#222", weight: 1, opacity: 0.65 };
  console.log(kingdoms);
  return kingdoms.length !== 0 ? (
    <MapContainer center={[5, 20]} zoom={4} maxZoom={8}>
      <LayersControl position="bottomright">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartocdn-gusc.global.ssl.fastly.net/ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png"
          crs="L.CRS.EPSG4326"
        />
        <Polygon pathOptions={options} positions={kingdoms[0].coordinates} />
      </LayersControl>
    </MapContainer>
  ) : (
    <div>Data is loading...</div>
  );
};

export default Map;
