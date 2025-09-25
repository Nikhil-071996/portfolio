import { useEffect, useRef, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Loader from "./components/Loader";
import Portfolio from "./components/portfolio/Portfolio";
import gsap from "gsap";
import ContactSection from "./components/contact/ContactSection";
import { ScrollTrigger } from "gsap/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);
export default function App() {
  const [bannerReady, setBannerReady] = useState(false);

  const textStartRef = useRef(null);
  const textEndRef = useRef(null);
  const movingText = useRef(null);

  const windowWidth = window.innerWidth;

  useEffect(() => {
  if (textStartRef.current && textEndRef.current) {
    const startRect = textStartRef.current.getBoundingClientRect();
    const endRect = textEndRef.current.getBoundingClientRect();

    // Difference between end and start
    const deltaX = endRect.left - startRect.left;
    const deltaY = endRect.top - startRect.top;

    

    // Animate only the difference
    gsap.to(textStartRef.current, {
      x: deltaX,
      y: deltaY,
      ease: "none",
      scrollTrigger: {
        trigger: ".banner-container",
        start: windowWidth > 990 ? "top top" : "top top" ,
        end: windowWidth > 990 ? "80% top" : "100% top" ,
        scrub: true,
        markers: true,
        onUpdate: (self) => {
          if (self.progress > 0.9) {
            textStartRef.current.textContent = "Portfolio";
          } else {
            textStartRef.current.textContent = "Developer";
          }
        },
      },
    });
  }
}, [textStartRef]);




  return (
    <>
      {!bannerReady && <Loader />} 
      <Banner onReady={() => setBannerReady(true)} textStartRef={textStartRef} movingText={movingText} />
      <Portfolio textEndRef={textEndRef} />
      <ContactSection />
    </>
  );
}
