import React, { useEffect, useState } from "react";
import axios from "axios";
import ImgCard from "../components/ImgCard";

import styles from "./../styles/Home.module.css";

export default function ImgsByRankContianer() {
  const [imgs, setImgs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSetImgs();
  }, []);

  const getSetImgs = async () => {
    try {
      setIsLoading(true);
      const response = await axios(
        "api/NFTRanking/0x3110ef5f612208724ca51f5761a69081809f03b7/1"
      );
      setIsLoading(false);
      console.log(response.data.data);
      if (response?.data?.data && response.data.data.length > 0) {
        console.log("setting imgs");
        setImgs(response.data.data);
      }
    } catch (e) {
      console.log("Exception in fetching imgs", e);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles["impostors-images-container"]}>
      {imgs.map((img) => (
        <React.Fragment key={img.token_hash}>
          <ImgCard {...img} />
        </React.Fragment>
      ))}
    </div>
  );
}
