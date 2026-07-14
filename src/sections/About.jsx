import { useEffect, useState, useRef } from "react";
import FloatingCard from "../components/FloatingCard";
import { FaArrowRight } from "react-icons/fa";
import { aboutData } from "../../constants"; 
import { socials } from "../../constants"; 

const Counter = ({ endValue, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        } 
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime = null;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentCount = Math.min(
        Math.floor((progress / duration) * endValue),
        endValue
      );
      setCount(currentCount);
      if (progress < duration) requestAnimationFrame(animateCount);
    };
    requestAnimationFrame(animateCount);
  }, [hasStarted, endValue, duration]);

  return <span ref={elementRef}>{count}</span>;
};

const About = () => {
  // Destructure the data object directly for easy variable access
  const { title, description, experience, projects, clients, phone, email } = aboutData[0];

  return (
    <section className="about-container" id="about">
      <div className="about-grid">
        {/* Left Side: Portrait Card Destination Placeholder */}
        <div className="about-left">
          
          <FloatingCard className="about-mobile-card" showHandBadge={false} />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-yellow)] shadow-[0_0_8px_rgba(208,255,113,0.6)] animate-ping absolute duration-1000" />
            <span className="w-2 h-2 rounded-full bg-[var(--color-yellow)] relative" />
          </div>
        </div>

        {/* Right Side: Dynamic Content from aboutData */}
        <div className="about-right">
          <h2 className="about-title text-gradient">{title}</h2>
          <p className="about-subtitle">{description}</p>

          {/* ROW 1: Stats Grid */}
          <div className="about-stats-grid">
            <div className="stat-card">
              <span className="stat-number">
                <Counter endValue={experience} />
              </span>
              <span className="stat-label">Years of<br />Work Experience</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">
                <Counter endValue={projects} />
              </span>
              <span className="stat-label">Completed<br />Projects</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">
                <Counter endValue={clients} />+
              </span>
              <span className="stat-label">Global<br />Clients</span>
            </div>
          </div>

          {/* ROW 2: Contact Block */}
          <div className="about-contact-grid">
            <div className="contact-item">
              <span className="contact-label">Call Today:</span>
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-link">
                {phone}
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href={`mailto:${email}`} className="contact-link">
                {email}
              </a>
            </div>
          </div>

          {/* ROW 3: Socials + Action CTA */}
          <div className="about-action-row">
            <div className="about-socials-wrapper">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  aria-label={social.name}
                  className="social-icon-link"
                >
                  <social.icon className="social-icon" />
                </a>
              ))}
            </div>

            <button className="about-cta-btn group">
              <span>My Story</span>
              <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;