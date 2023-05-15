import Impostors_JSON_DATA from "./rarityData.json";  // https://opensea.io/collection/impostors-genesis-aliens
import fs from "fs";

export default function handler(req, res) {
  const { contract, cursor } = req.query;
  const formatedData = JSON.stringify({ data: Object.values(Impostors_JSON_DATA) });
  fs.writeFile("formatedRarity.json", formatedData, function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send({ error: err });
    } else {
      return res.status(200).send({ success: "done" });
    }
  });
}
