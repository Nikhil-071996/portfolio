import { useState, useEffect } from "react";
import "./App.css";
import Banner from "./components/Banner";
import ParallaxScene from "./components/ParallaxScene";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    // When all assets (images, css, fonts) are loaded
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      {loading ? <Loader /> : <Banner />}
      {/* <ParallaxScene /> can also go here after loader */}
    </>
  );
}

export default App;
