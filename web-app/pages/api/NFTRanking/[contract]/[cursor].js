import JSON_DATA from "./formatedRarity.json";

const max_len = 10;
export default function handler(req, res) {
  const { contract, cursor } = req.query;
  const ARRAY_DATA = JSON_DATA.data;
  if (
    contract == "0x3110ef5f612208724ca51f5761a69081809f03b7" &&
    !isNaN(cursor)
  ) {
    res.status(200).json({
      contract,
      cursor: cursor + max_len,
      data: ARRAY_DATA.slice(cursor, parseInt(cursor) + max_len)
    });
  } else {
    res.status(200).json({
      contract,
      cursor,
      data: []
    });
  }
}