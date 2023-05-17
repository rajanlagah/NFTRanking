import React, { useState } from "react";
import styles from "./../styles/Home.module.css";

const ImgCard = ({
  metadata,
  total_rarity_score,
  rarity_map,
  token_address,
  token_id
}) => {
  const [showRankMap, setshowRankMap] = useState(false);
  const getImgData = () => {
    const data = JSON.parse(metadata);
    let imgURI;
    if (data.image.includes("ipfs://")) {
      imgURI = `https://ipfs.moralis.io:2053/ipfs/${data.image.replace(
        "ipfs://",
        ""
      )}`;
    } else {
      imgURI = data.image;
    }
    return { imgURI, rarityScore: total_rarity_score, name: data.name };
  };

  const handleOnByClick = () => {
    const url = `https://opensea.io/assets/ethereum/${token_address}/${token_id}`;
    window.open(url, "_blank");
  };

  const { imgURI, rarityScore, name } = getImgData();

  return (
    <div
      className={styles["img-card"]}
      onMouseEnter={() => setshowRankMap(true)}
      onMouseLeave={() => setshowRankMap(false)}
    >
      <img
        // alt="Impostors Genesis Aliens"
        src={imgURI}
        className={styles["impostors-images"]}
      />
      <div className={styles["imposters-card-info"]}>
        <h5>{name}</h5>
        <h4 className={styles["imposters-card-score"]}>
          {rarityScore.toFixed(2)}
        </h4>
      </div>
      {showRankMap && (
        <div className={styles["img-card-score-details"]}>
          <div>
            {rarity_map.map((data) => (
              <React.Fragment>
                <div className={styles.flex}>
                  <span>
                    {data.variant} {data.trait}
                  </span>
                  <span>{data.score.toFixed(2)}</span>
                  <br />
                </div>
              </React.Fragment>
            ))}
          </div>
          <button onClick={handleOnByClick} className={styles["img-card-score-details-btn"]}> Buy</button>
        </div>
      )}
    </div>
  );
};

export default ImgCard;
