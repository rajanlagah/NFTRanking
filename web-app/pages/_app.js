import ContactMe from "../components/contactMe";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ContactMe/>
      <Component {...pageProps} />
    </div>
  );
}
