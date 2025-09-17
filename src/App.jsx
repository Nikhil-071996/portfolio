import { useEffect, useRef, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Loader from "./components/Loader";
import Portfolio from "./components/portfolio/Portfolio";
import gsap from "gsap";
import ContactSection from "./components/contact/ContactSection";

export default function App() {
  const [bannerReady, setBannerReady] = useState(false);

  const textStartRef = useRef(null);
  const textEndRef = useRef(null);
  const movingText = useRef(null);

  useEffect(() => {
  if (textStartRef.current && textEndRef.current && movingText.current) {
    const startRect = textStartRef.current.getBoundingClientRect();
    const endRect = textEndRef.current.getBoundingClientRect();

    // Difference between end and start
    const deltaX = endRect.left - startRect.left;
    const deltaY = endRect.top - startRect.top;

    // Place movingText at start
    gsap.set(movingText.current, {
      position: "absolute",
      top: startRect.top + window.scrollY, // absolute position on page
      left: startRect.left + window.scrollX,
    });

    // Animate only the difference
    gsap.to(movingText.current, {
      x: deltaX,
      y: deltaY,
      ease: "none",
      scrollTrigger: {
        trigger: ".banner-container",
        start: "top top",
        end: "80% top",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.9) {
            movingText.current.textContent = "Portfolio";
          } else {
            movingText.current.textContent = "Developer";
          }
        },
      },
    });
  }
}, []);




  return (
    <>
      {!bannerReady && <Loader />} 
      <Banner onReady={() => setBannerReady(true)} textStartRef={textStartRef} movingText={movingText} />
      <Portfolio textEndRef={textEndRef} />
      <ContactSection />
    </>
  );
}
