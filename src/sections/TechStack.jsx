const TechStack = () => {
  return (
    <section className="tech-stack-section" id="tech-stack">
      <div className="tech-video-container">
        <video        
          src="/videos/animo-photo-orbit-720p (1).webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="tech-orbit-video"
        />
        {/* Subtle radial inner shadow overlay to blend the video edges smoothly */}
        {/* <div className="tech-video-shade" /> */}
      </div>
    </section>
  );
};

export default TechStack;