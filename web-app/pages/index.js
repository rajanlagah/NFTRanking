import ImpostersSlideShow from "../components/ImpostorsSlideShow";
import ImgsByRankContianer from "../container/ImgsByRankContianer";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles["header-container"]}>
        <img className={styles["header-img"]} src="./Header.avif" />
        <ImpostersSlideShow />
      </div>
      <br />
      <br />
      <div className={styles["collection-info-container"]}>
        <h1 className={styles["collection-heading"]}>
          Impostors Genesis Aliens
        </h1>
        <div className={styles["collection-stats"]}>
          <span>
            Items <b>10.4k</b>
          </span>
          ·
          <span>
            Created <b>Mar 2022</b>
          </span>
          ·
          <span>
            Creator earnings <b>5%</b>
          </span>
          ·
          <span>
            Chain <b>Ethereum</b>
          </span>
          ·
          <span>
            Category <b>Gaming</b>
          </span>
        </div>
        <ImgsByRankContianer/>
      </div>
    </div>
  );
}
