import { useState, useEffect } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // If the page is already loaded (cached assets), remove loader immediately
  //   if (document.readyState === "complete") {
  //     setLoading(false);
  //     return;
  //   }

  //   const handleLoad = () => {
  //     setLoading(false);
  //   };

  //   window.addEventListener("load", handleLoad);

  //   return () => {
  //     window.removeEventListener("load", handleLoad);
  //   };
  // }, []);

  return (
    <>
      {loading ? <Loader /> : <Banner setLoading={setLoading} />}
    </>
  );
}

export default App;
