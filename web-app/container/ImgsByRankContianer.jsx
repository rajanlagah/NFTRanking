import React, { useEffect, useState } from "react";
import axios from "axios";
import ImgCard from "../components/ImgCard";

import styles from "./../styles/Home.module.css";
import LoadMoreImgs from "../components/LoadMoreImgs";
import LoadingCardsCollection from "../components/LoadingCardsCollection";

export default function ImgsByRankContianer() {
  const [imgs, setImgs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldloadMoreImgs, setshouldloadMoreImgs] = useState(true);
  const [cursor, setcursor] = useState(0);

  useEffect(() => {
    getSetImgs();
  }, []);

  const getSetImgs = async () => {
    try {
      setIsLoading(true);
      setshouldloadMoreImgs(true);
      const response = await axios(
        `api/NFTRanking/0x3110ef5f612208724ca51f5761a69081809f03b7/${cursor}`
      );
      setIsLoading(false);
      if (response?.data?.data && response.data.data.length > 0) {
        setImgs([...imgs, ...response.data.data]);
      }
      setshouldloadMoreImgs(response?.data?.hasMore);
      setcursor(response?.data?.cursor || 0);
    } catch (e) {
      console.log("Exception in fetching imgs", e);
    }
  };
  return (
    <div>
      <div className={styles["impostors-images-container"]}>
        {imgs.map((img) => (
          <React.Fragment key={img.token_hash}>
            <ImgCard {...img} />
          </React.Fragment>
        ))}
        {isLoading && <LoadingCardsCollection />}
      </div>
      {shouldloadMoreImgs && (
        <LoadMoreImgs
          cb={() => getSetImgs(cursor)}
          cursor={cursor}
          isCbLoading={isLoading}
        />
      )}
    </div>
  );
}
