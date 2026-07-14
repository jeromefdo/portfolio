import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText, Flip } from "gsap/all";
import Lenis from "lenis";
import "lenis/dist/lenis.css"; // Crucial for preventing layout shifting in modern Lenis

import Hero from "./sections/Hero";
import Navbar from "./components/Navbar";
import Services from "./sections/Services";
import { useCardFlipAnimation } from "../animations/cardFlipAnimation";

import { useState } from "react";
import About from "./sections/About";
import TechStack from "./sections/TechStack";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

const App = () => {
  const cardRef = useRef(null);
  const heroCardSlotRef = useRef(null);
  const servicesCardSlotRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
    });

    function raf(time) {
      lenis.raf(time * 1000);
    }

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(raf);

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useCardFlipAnimation({
    cardRef,
    heroCardSlotRef,
    servicesCardSlotRef,
  });

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero cardRef={cardRef} heroCardSlotRef={heroCardSlotRef} />
      <Services ref={servicesCardSlotRef} />
      <About />
      <TechStack />

      {/* Fixed Tiny Light/Dark Toggle at the bottom center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border shadow-md hover:scale-105 transition-all duration-300 cursor-pointer select-none bg-[var(--color-card-bg)] border-[var(--color-card-border)] text-[var(--color-text-primary)] text-[9px] uppercase font-bold tracking-wider"
        >
          <span className={theme === "light" ? "text-yellow" : "opacity-40"}>
            Light
          </span>
          <span className="opacity-20 font-light">|</span>
          <span className={theme === "dark" ? "text-yellow" : "opacity-40"}>
            Dark
          </span>
        </button>
      </div>
    </main>
  );
};

export default App;
