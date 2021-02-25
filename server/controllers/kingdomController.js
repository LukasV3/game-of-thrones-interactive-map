const Kingdom = require("../models/kingdomModel");

module.exports.getKingdomBoundaries = async (req, res, next) => {
  try {
    const kingdoms = await Kingdom.find();

    const boundaries = kingdoms.map((kingdom) => {
      let geojson = JSON.parse(kingdom.location);
      geojson.properties = {
        name: kingdom.name,
        id: kingdom.gid,
      };
      return geojson;
    });

    res.send(boundaries);
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports.getSummary = async (req, res, next) => {
  const summary = await Kingdom.find({ gid: req.params.id }, { summary: 1, url: 1 });

  res.send(summary[0]);
};
