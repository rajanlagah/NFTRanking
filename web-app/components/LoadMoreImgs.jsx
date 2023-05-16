import React, { useEffect, useRef } from "react";
import styles from "./../styles/Home.module.css";

const LoadMoreImgs = ({ cb, isCbLoading, cursor }) => {
  const loadingBtnRef = useRef();

  useEffect(() => {
    const threshHold = window.screen.height + 450;
    const debouncedAPICall = debouncing(cb, functionDelay);
    const onScroll = (e) => {
      const loadingBtnLocation =
        loadingBtnRef.current.getBoundingClientRect().y;
      if (loadingBtnLocation < threshHold && !isCbLoading) {
        debouncedAPICall();
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [cursor]);

  const functionDelay = 500; // ms
  const debouncing = (fn, delay) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn(cursor);
      }, delay);
    };
  };

  return (
    <div ref={loadingBtnRef} className={styles["im-card"]}>
      .
    </div>
  );
};

export default LoadMoreImgs;
