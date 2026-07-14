import { forwardRef, useRef, useState } from "react";
import { accordionData } from "../../constants";
import FloatingCard from "../components/FloatingCard";

const Services = forwardRef((_, servicesCardSlotRef) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const localPlaceholderRef = useRef(null);
  const placeholderRef = servicesCardSlotRef || localPlaceholderRef;

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="services-container" id="services">
      <div className="services-grid">
        {/* Left Side: Accordion and headings */}
        <div className="services-left">
          <h2 className="services-title text-gradient">
            What I can do for you
          </h2>
          <p className="services-subtitle">
            As a digital designer, I am a visual storyteller, crafting
            experiences that connect deeply and spark creativity.
          </p>

          <div className="accordion-wrapper w-full max-w-2xl">
            {accordionData.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div key={idx} className="accordion-item">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className={`accordion-header ${isActive ? "active" : ""}`}
                    aria-expanded={isActive}
                  >
                    <span className="accordion-content-group">
                      <span className="accordion-number">{item.number}</span>
                      <span>{item.title}</span>
                    </span>
                    <svg
                      className={`accordion-chevron ${isActive ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </button>
                  <div
                    className="accordion-content"
                    style={{
                      maxHeight: isActive ? "200px" : "0px",
                      transition: "max-height 0.4s ease-in-out",
                    }}
                  >
                    <p className="accordion-text">{item.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Portrait Card Destination Placeholder */}
        <div className="services-right">
          <div
            ref={placeholderRef}
            className="services-card-placeholder card-flip-slot"
          />

          <FloatingCard className="services-mobile-card" showHandBadge={false} />

          {/* Small dot below placeholder similar to the mockup */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-yellow)] shadow-[0_0_8px_rgba(208,255,113,0.6)] animate-ping absolute duration-1000" />
            <span className="w-2 h-2 rounded-full bg-[var(--color-yellow)] relative" />
          </div>
        </div>
      </div>
    </section>
  );
});

Services.displayName = "Services";

export default Services;
