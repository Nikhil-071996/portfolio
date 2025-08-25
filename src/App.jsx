import { useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Loader from "./components/Loader";

export default function App() {
  const [bannerReady, setBannerReady] = useState(false);

  return (
    <>
      <Banner onReady={() => setBannerReady(true)} />
      {!bannerReady && <Loader />} {/* overlay while Banner loads */}
    </>
  );
}
