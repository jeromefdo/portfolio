import { forwardRef } from "react";
import { IoMdHand } from "react-icons/io";

const FloatingCard = forwardRef(
  ({ isHand = false, className = "", showHandBadge = true }, ref) => {
    return (
      <div ref={ref} className={`image-card ${className}`.trim()}>
        <div className="card-tilt-shell">
          <div className="transform-style-3d">
            <div className="card-face-front">
              <img
                src="/images/Jerome.png"
                alt="Jerome"
                className="image-card-img"
              />

              

              <div className="image-card-badge">
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-white/50 mb-0.5">
                    Current Role
                  </span>

                  <span className="font-sans text-xs font-bold text-white">
                    Technical Business Analyst
                  </span>
                </div>

                <span className="font-able-lead text-yellow text-lg tracking-wide">
                  Jerome
                </span>
              </div>
            </div>

            <div className="card-face-back">
              <img
                src="/images/services.jpeg"
                alt="Services"
                className="image-card-img"
              />

              <div className="image-card-badge">
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-white/50 mb-0.5">
                    What I Do
                  </span>

                  <span className="font-sans text-xs font-bold text-white">
                    Digital Solutions & Strategy
                  </span>
                </div>

                <span className="font-able-lead text-yellow text-lg tracking-wide">
                  Services
                </span>
              </div>
            </div>
            {showHandBadge && (
                <div className="hand-wave-badge">
                  <span
                    className={`absolute transition-all duration-500 ease-in-out ${
                      isHand
                        ? "opacity-0 scale-50"
                        : "opacity-100 scale-100"
                    } font-sans text-xs font-bold text-black`}
                  >
                    Hi
                  </span>

                  <div
                    className={`absolute transition-all duration-500 ease-in-out flex items-center justify-center ${
                      isHand
                        ? "opacity-100 scale-100 waving-hand"
                        : "opacity-0 scale-50"
                    }`}
                  >
                    <IoMdHand className="w-6 h-6 text-black" />
                  </div>
                </div>
              )}
          </div>
          
        </div>
      </div>
    );
  },
);

FloatingCard.displayName = "FloatingCard";

export default FloatingCard;
