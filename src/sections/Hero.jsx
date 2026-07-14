import { useEffect, useRef, useState } from "react";
import { useHeroAnimation } from "../../animations/heroAnimation";
import FloatingCard from "../components/FloatingCard";
import { heroData } from "../../constants";

const Hero = ({ cardRef, heroCardSlotRef }) => {
  const containerRef = useRef(null);
  const leftTitleRef = useRef(null);
  const rightTitleRef = useRef(null);
  const subtitleRef = useRef(null);
  const localCardRef = useRef(null);
  const videoRef = useRef(null);
  const resolvedCardRef = cardRef || localCardRef;

  const [isHand, setIsHand] = useState(false);
  const { name, FirstTitle, SecondTitle, subtitle } = heroData[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHand((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useHeroAnimation({
    containerRef,
    videoRef,
    leftTitleRef,
    rightTitleRef,
    subtitleRef,
    cardRef: resolvedCardRef,
  });

  return (   

    <section ref={containerRef} className="hero-container" id="home">
      <video
        ref={videoRef}
        src="/videos/starfull_sky.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hero-video-bg"
      />

      <div className="hero-overlay" />

      <div className="hero-content-wrapper">
        <div className="hero-grid-new">
          {/* Left Column */}
          <div className="hero-left-col">
            {/* Kept relative but removed from title height on desktop */}
            <span className="hero-name-label">{name}</span>
            <div className="hero-title-container">
              <h1 ref={leftTitleRef} className="hero-title-part">
                {FirstTitle}
              </h1>
            </div>
          </div>

          {/* Center Column */}
          <div ref={heroCardSlotRef} className="hero-center-col card-flip-slot">
            <FloatingCard ref={resolvedCardRef} isHand={isHand} />
          </div>

          {/* Right Column */}
          <div className="hero-right-col">
            <div className="hero-title-container">
              <h1 ref={rightTitleRef} className="hero-title-part text-gradient">
                {SecondTitle}
              </h1>
            </div>
            {/* Kept relative but removed from title height on desktop */}
            <p ref={subtitleRef} className="hero-subtitle">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
