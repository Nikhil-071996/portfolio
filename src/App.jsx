import { useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Loader from "./components/Loader";
import Portfolio from "./components/portfolio/Portfolio";

export default function App() {
  const [bannerReady, setBannerReady] = useState(true);

  return (
    <>
      <Banner onReady={() => setBannerReady(true)} />
      <Portfolio />
      {!bannerReady && <Loader />} 
    </>
  );
}
