import React from "react";
import styles from "./../styles/Home.module.css";

const ImgCard = ({ metadata, total_rarity_score }) => {
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

  const { imgURI, rarityScore, name } = getImgData();

  return (
    <div className={styles["img-card"]}>
      <img
        // alt="Impostors Genesis Aliens"
        src={imgURI}
        className={styles["impostors-images"]}
      />
      <div className={styles["imposters-card-info"]}>
        <h5>{name}</h5>
        <h4 className={styles["imposters-card-score"]}>{rarityScore.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default ImgCard;
