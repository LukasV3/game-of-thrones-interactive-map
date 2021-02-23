import React, { useState, useEffect } from "react";
import "./styles.scss";
import { MapContainer, TileLayer, Polygon, GeoJSON } from "react-leaflet";
import L from "leaflet";

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

  const options = { color: "#222", weight: 1, opacity: 0.65 };

  console.log(kingdoms);

  return kingdoms.length !== 0 ? (
    <MapContainer
      className="map-container"
      center={[5, 20]}
      zoom={4}
      maxZoom={8}
      minZoom={4}
      maxBounds={[
        [50, -30],
        [-45, 100],
      ]}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartocdn-gusc.global.ssl.fastly.net/ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png"
      />
      {/* <Polygon pathOptions={options} positions={kingdoms[0].coordinates} /> */}
      <GeoJSON data={kingdoms} style={options} />
    </MapContainer>
  ) : (
    <div>Data is loading...</div>
  );
};

export default Map;
