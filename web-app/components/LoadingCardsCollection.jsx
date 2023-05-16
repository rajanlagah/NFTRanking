import React, { useEffect, useState } from "react";
import axios from "axios";
import ImgCard from "../components/ImgCard";

import styles from "./../styles/Home.module.css";
import LoadMoreImgs from "../components/LoadMoreImgs";

export default function LoadingCardsCollection({ numberOfCards = 20 }) {
  if (numberOfCards <= 0) {
    return;
  }
  return [
    <div key={"card" + numberOfCards} className={styles["shimmer-card"]}>
      <div className={styles["shimmerBG"]}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <br />

      <div className={styles["shimmerBG"]}>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>,
    <LoadingCardsCollection
      key={"card_col_" + numberOfCards}
      numberOfCards={numberOfCards - 1}
    />
  ];
}
