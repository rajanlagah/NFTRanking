import styles from "../styles/Home.module.css";

export default function ContactMe() {
  const handleOnClick = () => {
    window.open("https://www.linkedin.com/in/rajan-lagah", "_blank");
  };
  return (
    <div role="button" onClick={handleOnClick} className={styles["contact-me"]}>
      <img width={"200px"} height={"200px"} src="./linkedin.png" />
    </div>
  );
}
