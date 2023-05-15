import Impostors_JSON_DATA from "./rarityData.json"; // https://opensea.io/collection/impostors-genesis-aliens
import fs from "fs";

export default function handler(req, res) {
  const arrayData = Object.values(Impostors_JSON_DATA);
  let validData = [];
  for (let i = 0; i < arrayData.length; i++) {
    const metaData = JSON.parse(arrayData[i].metadata);
    const imgUri = metaData.image;
    console.log(imgUri);
    if (imgUri.includes("png")) {
      validData.push(arrayData[i]);
    } else {
    }
  }
  // return res.status(200).send({ data: arrayData[0] });

  const formatedData = JSON.stringify({ data: Object.values(validData) });
  fs.writeFile("formatedRarity.json", formatedData, function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send({ error: err });
    } else {
      return res.status(200).send({ success: "done" });
    }
  });
}
