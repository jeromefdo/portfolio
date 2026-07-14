// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { navLinks } from "../../constants";

// const Navbar = () => {
//   const navRef = useRef(null);
//   const overlayRef = useRef(null);
//   const linksRef = useRef([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isFolded, setIsFolded] = useState(false);
//   const lastScrollY = useRef(0);

//   const ctxRef = useRef(null);
//   const timelineRef = useRef(null);

//   // Navbar entrance animation
//   useEffect(() => {
//     ctxRef.current = gsap.context(() => {
//       timelineRef.current = gsap.timeline({ paused: true });
//     }, navRef.current);

//     gsap.fromTo(
//       navRef.current,
//       { y: -100, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.1, ease: "power4.out", delay: 0.2 },
//     );
//   }, []);

//   // Scroll listener for folding/unfolding behaviour
//   useEffect(() => {
//     ctxRef.current = gsap.context(() => {
//       const nav = navRef.current;
//       const badge = nav.querySelector(".availability-badge");
//       const links = nav.querySelector(".nav-links-wrapper");
//       const cta = nav.querySelector(".nav-cta-wrapper");

//       // Set initial states
//       gsap.set(badge, { width: 0, opacity: 0, marginLeft: 0 });

//       // Check if we are on a desktop screen (matches Tailwind's lg: breakpoint)
//       const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

//       if (isDesktop) {
//         gsap.set(links, { width: "auto", opacity: 1 });
//         gsap.set(cta, { width: "auto", opacity: 1 });

//         // Master desktop folding timeline
//         timelineRef.current = gsap
//           .timeline({ paused: true })
//           .to(nav, {
//             backgroundColor: "rgba(0, 0, 0, 0.75)",
//             padding: "6px 16px",
//             duration: 0.4,
//             ease: "power2.inOut",
//           })
//           .to(
//             links,
//             {
//               width: 0,
//               opacity: 0,
//               gap: 0,
//               duration: 0.4,
//               ease: "power2.inOut",
//             },
//             0,
//           )
//           .to(
//             cta,
//             { width: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" },
//             0,
//           )
//           .to(
//             badge,
//             {
//               width: "auto",
//               opacity: 1,
//               marginLeft: 12,
//               duration: 0.4,
//               ease: "power2.inOut",
//             },
//             0,
//           );
//       } else {
//         // Mobile/Tablet folding timeline (Only animates the badge revealing next to profile)
//         timelineRef.current = gsap
//           .timeline({ paused: true })
//           .to(nav, {
//             backgroundColor: "rgba(0, 0, 0, 0.75)",
//             padding: "6px 16px",
//             duration: 0.4,
//             ease: "power2.inOut",
//           })
//           .to(
//             badge,
//             {
//               width: "auto",
//               opacity: 1,
//               marginLeft: 12,
//               duration: 0.4,
//               ease: "power2.inOut",
//             },
//             0,
//           );
//       }
//     });

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > 50) {
//         if (currentScrollY > lastScrollY.current) {
//           timelineRef.current.play();
//           setIsFolded(true);
//         } else {
//           timelineRef.current.reverse();
//           setIsFolded(false);
//         }
//       } else {
//         timelineRef.current.reverse();
//         setIsFolded(false);
//       }
//       lastScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (ctxRef.current) ctxRef.current.revert();
//     };
//   }, []);

//   // Mobile menu drawer animation
//   useEffect(() => {
//     if (!overlayRef.current) return;

//     if (isOpen) {
//       // Open animation
//       gsap.to(overlayRef.current, {
//         opacity: 1,
//         pointerEvents: "auto",
//         duration: 0.5,
//         ease: "power3.out",
//       });

//       // Animate mobile links staggered
//       gsap.fromTo(
//         linksRef.current,
//         { y: 40, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           stagger: 0.08,
//           duration: 0.5,
//           ease: "power3.out",
//           delay: 0.1,
//         },
//       );
//     } else {
//       // Close animation
//       gsap.to(overlayRef.current, {
//         opacity: 0,
//         pointerEvents: "none",
//         duration: 0.4,
//         ease: "power3.inOut",
//       });
//     }
//   }, [isOpen]);

//   // Separate contact link from standard links for desktop navbar layout
//   const mainNavLinks = navLinks.filter((link) => link.id !== "contact");
//   const contactLink = navLinks.find((link) => link.id === "contact");

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <>
//       {/* Desktop and Tablet Navbar */}
//       <header ref={navRef} className="navbar-container">
//         {/* Logo / Profile & Availability Indicator */}
//         <div className="flex items-center">
//           <a href="#home" className="navbar-logo">
//             <div className="navbar-profile">
//               <img src="/images/Jerome.png" alt="logo" />
//             </div>
//           </a>

//           {/* Availability Status Badge */}
//           <div className={`availability-badge ${isFolded ? "visible" : ""}`}>
//             <span className="availability-text">Available to work</span>
//             <span className="green-dot" />
//           </div>

//           {/* Hamburger Button for Mobile */}
//           <button
//             className="mobile-menu-btn"
//             onClick={toggleMenu}
//             aria-label="Toggle Menu"
//             aria-expanded={isOpen}
//           >
//             {isOpen ? (
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* Central Links */}
//         <nav className="nav-links-wrapper">
//           {mainNavLinks.map((link) => (
//             <a key={link.id} href={`#${link.id}`} className="nav-link-item">
//               <span className="nav-link-tumble-wrapper">
//                 <span className="nav-link-tumble-text">{link.title}</span>
//                 <span className="nav-link-tumble-text" aria-hidden="true">
//                   {link.title}
//                 </span>
//               </span>
//             </a>
//           ))}
//         </nav>

//         {/* Contact CTA Button (Right aligned) */}
//         <div
//           className={`nav-cta-wrapper ${isFolded ? "collapsed" : "hidden md:flex items-center"}`}
//         >
//           {contactLink && (
//             <a href={`#${contactLink.id}`} className="nav-cta-btn">
//               {contactLink.title}
//             </a>
//           )}
//         </div>
//       </header>

//       {/* Mobile Fullscreen Glass Overlay Menu */}
//       <div
//         ref={overlayRef}
//         className="mobile-menu-overlay opacity-0 pointer-events-none"
//       >
//         {/* Close Button in Overlay */}
//         <button
//           className="absolute top-8 right-6 text-white hover:text-yellow transition-colors duration-300 focus:outline-none cursor-pointer"
//           onClick={toggleMenu}
//           aria-label="Close Menu"
//         >
//           <svg
//             className="w-8 h-8"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         {/* Links list */}
//         <nav className="flex flex-col items-center">
//           {navLinks.map((link, idx) => (
//             <a
//               key={link.id}
//               ref={(el) => (linksRef.current[idx] = el)}
//               href={`#${link.id}`}
//               className="mobile-nav-link"
//               onClick={() => setIsOpen(false)}
//             >
//               {link.title}
//             </a>
//           ))}
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { navLinks } from "../../constants";

const Navbar = () => {
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollY = useRef(0);

  const timelineRef = useRef(null);

  // Navbar entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.1, ease: "power4.out", delay: 0.2 },
    );
  }, []);

  // Responsive Scroll animation setup
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const badge = nav.querySelector(".availability-badge");
    const links = nav.querySelector(".nav-links-wrapper");
    const cta = nav.querySelector(".nav-cta-wrapper");
    const hamburger = nav.querySelector(".mobile-menu-btn");

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // --- DESKTOP (lg) SETUP ---
      gsap.set(hamburger, { display: "none", opacity: 0, width: 0, marginLeft: 0 });
      gsap.set(links, { display: "flex", opacity: 1, width: "auto" });
      gsap.set(cta, { display: "flex", opacity: 1, width: "auto" });
      gsap.set(badge, { display: "none", opacity: 0, width: 0, marginLeft: 0 });

      // Desktop folding timeline
      timelineRef.current = gsap
        .timeline({ paused: true })
        .to(nav, { backgroundColor: "rgba(0, 0, 0, 0.75)", padding: "6px 16px", duration: 0.4, ease: "power2.inOut" })
        .to(links, { width: 0, opacity: 0, gap: 0, duration: 0.4, ease: "power2.inOut" }, 0)
        .to(cta, { width: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" }, 0)
        // Smoothly clear display and pull desktop links out of space requirements
        .set([links, cta], { display: "none" })
        .set(badge, { display: "flex" })
        .to(badge, { width: "auto", opacity: 1, marginLeft: 12, duration: 0.4, ease: "power2.inOut" });

      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current) {
            timelineRef.current.play();
          } else {
            timelineRef.current.reverse();
          }
        } else {
          timelineRef.current.reverse();
        }
        lastScrollY.current = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    });

    mm.add("(max-width: 1023px)", () => {
      // --- MOBILE / TABLET (md/sm) SETUP ---
      // Lock permanent visibility right from the start
      gsap.set(links, { display: "none" });
      gsap.set(cta, { display: "none" });
      gsap.set(badge, { width: "auto", opacity: 1, marginLeft: 12, display: "flex" });
      gsap.set(hamburger, { width: "auto", opacity: 1, marginLeft: 16, display: "flex" });
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Mobile menu drawer animation
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.fromTo(
        linksRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.1 },
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  const mainNavLinks = navLinks.filter((link) => link.id !== "contact");
  const contactLink = navLinks.find((link) => link.id === "contact");
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header ref={navRef} className="navbar-container">
        {/* Left Side Group */}
        <div className="flex items-center">
          <a href="#home" className="navbar-logo">
            <div className="navbar-profile">
              <img src="/images/Jerome.png" alt="logo" />
            </div>
          </a>

          {/* Availability Status Badge */}
          <div className="availability-badge">
            <span className="availability-text">Available for work</span>
            {/* <span className="green-dot" /> */}
            {/* Small dot below placeholder similar to the mockup */}
          <div className="left-1/2 -translate-x-1/2 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-yellow)] shadow-[0_0_8px_rgba(208,255,113,0.6)] animate-ping absolute duration-1000" />
            <span className="w-2 h-2 rounded-full bg-[var(--color-yellow)] relative" />
          </div>
          </div>

          {/* Hamburger Button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Central Links */}
        <nav className="nav-links-wrapper">
          {mainNavLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav-link-item">
              <span className="nav-link-tumble-wrapper">
                <span className="nav-link-tumble-text">{link.title}</span>
                <span className="nav-link-tumble-text" aria-hidden="true">{link.title}</span>
              </span>
            </a>
          ))}
        </nav>

        {/* Contact CTA Button */}
        <div className="nav-cta-wrapper">
          {contactLink && (
            <a href={`#${contactLink.id}`} className="nav-cta-btn">
              {contactLink.title}
            </a>
          )}
        </div>
      </header>

      {/* Mobile Fullscreen Glass Overlay Menu */}
      <div ref={overlayRef} className="mobile-menu-overlay opacity-0 pointer-events-none">
        {/* <button
          className="absolute top-8 right-6 text-white hover:text-yellow transition-colors duration-300 focus:outline-none cursor-pointer"
          onClick={toggleMenu}
          aria-label="Close Menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}

        <nav className="flex flex-col items-center">
          {navLinks.map((link, idx) => (
            <a
              key={link.id}
              ref={(el) => (linksRef.current[idx] = el)}
              href={`#${link.id}`}
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
