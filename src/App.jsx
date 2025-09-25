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

  useEffect(() => {
    // Create a context specific to this component
    const ctx = gsap.context(() => {
      if (textStartRef.current && textEndRef.current) {
        const windowWidth = window.innerWidth;

        const startRect = textStartRef.current.getBoundingClientRect();
        const endRect = textEndRef.current.getBoundingClientRect();

        const deltaX = endRect.left - startRect.left;
        const deltaY = endRect.top - startRect.top;

        gsap.to(textStartRef.current, {
          x: deltaX,
          y: deltaY,
          ease: "none",
          scrollTrigger: {
            trigger: ".banner-container",
            start: windowWidth > 990 ? "top top" : "top top",
            end: windowWidth > 990 ? "80% top" : "80% top",
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

        // optionally refresh after load
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 500);
      }
    }, /* optional scope, e.g. root element: */);

    // Cleanup when component unmounts or effect re-runs:
    return () => {
      ctx.revert();  // this kills all animations and ScrollTriggers created inside the context
    };
  }, []); // run once after mount

  return (
    <>
      {!bannerReady && <Loader />}
      <Banner
        onReady={() => setBannerReady(true)}
        textStartRef={textStartRef}
      />
      <Portfolio textEndRef={textEndRef} />
      <ContactSection />
    </>
  );
}
