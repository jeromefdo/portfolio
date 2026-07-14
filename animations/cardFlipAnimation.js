import gsap from "gsap";
import { useLayoutEffect } from "react";
import { Flip, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(Flip, ScrollTrigger);

export const useCardFlipAnimation = ({
    cardRef,
    heroCardSlotRef,
    servicesCardSlotRef,
}) => {
    useLayoutEffect(() => {
        const card = cardRef.current;
        const heroSlot = heroCardSlotRef.current;
        const servicesSlot = servicesCardSlotRef.current;
        

        if (!card || !heroSlot || !servicesSlot ) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Animated logic for Desktop & Tablet layouts (Smooth scrolling migration)
            const createAnimatedFlip = ({ rotate = true, scrub = 1 }) => {
                const inner = card.querySelector(".transform-style-3d");
                const tiltShell = card.querySelector(".card-tilt-shell");

                heroSlot.appendChild(card);
                gsap.set(card, { clearProps: "all" });
                gsap.set(inner, { clearProps: "transform" });
                gsap.set(tiltShell, {
                    "--card-flip-y": "0deg",
                    "--card-tilt-z": "0deg",
                    "--card-tilt-x": "0deg",
                });

                // --- 1. HERO TO SERVICES TIMELINE ---
                const state = Flip.getState(card);
                servicesSlot.appendChild(card);

                const flipTween = Flip.from(state, {
                    absolute: true,
                    scale: true,
                    nested: true,
                    ease: "none",
                    duration: 1,
                    scrollTrigger: {
                        trigger: "#home",
                        start: "top top",
                        end: "bottom top",
                        scrub,
                        invalidateOnRefresh: true,
                    },
                });

                const servicesStateTween = gsap.to(tiltShell, {
                    "--card-flip-y": rotate ? "180deg" : "0deg",
                    "--card-tilt-z": "5deg",
                    "--card-tilt-x": "2deg",
                    ease: "none",
                    scrollTrigger: {
                        trigger: "#home",
                        start: "top top",
                        end: "bottom top",
                        scrub,
                        invalidateOnRefresh: true,
                    },
                });

                return () => {
                    flipTween.scrollTrigger?.kill();
                    flipTween.kill();
                    servicesStateTween.scrollTrigger?.kill();
                    servicesStateTween.kill();
                    gsap.set([card, inner], { clearProps: "all" });
                    gsap.set(tiltShell, {
                        "--card-flip-y": "0deg",
                        "--card-tilt-z": "0deg",
                        "--card-tilt-x": "0deg",
                    });
                    heroSlot.appendChild(card);
                };
            };

            // --- BREAKPOINTS ---
            
            // 1. Desktop Layout
            mm.add("(min-width: 1024px)", () => createAnimatedFlip({ rotate: true, scrub: 1 }));

            // 2. Tablet Layout
            mm.add("(min-width: 768px) and (max-width: 1023px)", () =>
                createAnimatedFlip({ rotate: false, scrub: 0.7 })
            );

            // 3. Mobile: no Flip and no scroll animation. Keep the hero card front-facing.
            mm.add("(max-width: 767px)", () => {
                const inner = card.querySelector(".transform-style-3d");
                const tiltShell = card.querySelector(".card-tilt-shell");

                heroSlot.appendChild(card);
                gsap.set(card, { clearProps: "all" });
                gsap.set(inner, { clearProps: "all" });
                gsap.set(tiltShell, {
                    "--card-flip-y": "0deg",
                    "--card-tilt-z": "0deg",
                    "--card-tilt-x": "0deg",
                });

                return () => {
                    gsap.set([card, inner], { clearProps: "all" });
                    gsap.set(tiltShell, {
                        "--card-flip-y": "0deg",
                        "--card-tilt-z": "0deg",
                        "--card-tilt-x": "0deg",
                    });
                };
            });

            requestAnimationFrame(() => ScrollTrigger.refresh());

            return () => mm.revert();
        });

        return () => ctx.revert();
    }, [cardRef, heroCardSlotRef, servicesCardSlotRef]);
};


// import gsap from "gsap";
// import { useLayoutEffect } from "react";
// import { Flip, ScrollTrigger } from "gsap/all";

// gsap.registerPlugin(Flip, ScrollTrigger);

// export const useCardFlipAnimation = ({
//     cardRef,
//     heroCardSlotRef,
//     servicesCardSlotRef,
//     aboutCardSlotRef,
// }) => {
//     useLayoutEffect(() => {
//         const card = cardRef.current;
//         const heroSlot = heroCardSlotRef.current;
//         const servicesSlot = servicesCardSlotRef.current;
//         const aboutSlot = aboutCardSlotRef.current;

//         if (!card || !heroSlot || !servicesSlot || !aboutSlot) return;

//         const ctx = gsap.context(() => {
//             const mm = gsap.matchMedia();

//             const createAnimatedFlip = ({ rotate = true, scrub = 1 }) => {
//                 const inner = card.querySelector(".transform-style-3d");
//                 const tiltShell = card.querySelector(".card-tilt-shell");

//                 // 1. Reset everything cleanly to the Hero Slot baseline
//                 heroSlot.appendChild(card);
//                 gsap.set(card, { clearProps: "all" });
//                 gsap.set(inner, { clearProps: "transform" });
//                 gsap.set(tiltShell, {
//                     "--card-flip-y": "0deg",
//                     "--card-tilt-z": "0deg",
//                     "--card-tilt-x": "0deg",
//                 });

//                 // 2. FIRST TRIP: Hero to Services Section
//                 const heroState = Flip.getState(card);
//                 servicesSlot.appendChild(card); // Dock into Services DOM space

//                 const servicesFlipTween = Flip.from(heroState, {
//                     absolute: true,
//                     scale: true,
//                     nested: true,
//                     ease: "none",
//                     duration: 1,
//                     scrollTrigger: {
//                         trigger: "#home",
//                         start: "top top",
//                         end: "bottom top",
//                         scrub,
//                         invalidateOnRefresh: true,
//                     },
//                 });

//                 const servicesRotationTween = gsap.to(tiltShell, {
//                     "--card-flip-y": rotate ? "180deg" : "0deg",
//                     "--card-tilt-z": "5deg",
//                     "--card-tilt-x": "2deg",
//                     ease: "none",
//                     scrollTrigger: {
//                         trigger: "#home",
//                         start: "top top",
//                         end: "bottom top",
//                         scrub,
//                         invalidateOnRefresh: true,
//                     },
//                 });

//                 // 3. SECOND TRIP: Services down to About Section
//                 // Capture state from Services structure, then move it down to About slot
//                 const servicesState = Flip.getState(card);
//                 aboutSlot.appendChild(card); 

//                 const aboutFlipTween = Flip.from(servicesState, {
//                     absolute: true,
//                     scale: true,
//                     nested: true,
//                     ease: "none",
//                     duration: 1,
//                     scrollTrigger: {
//                         trigger: "#services",
//                         start: "top top",
//                         end: "bottom top",
//                         scrub,
//                         invalidateOnRefresh: true,
//                     },
//                 });

//                 const aboutRotationTween = gsap.to(tiltShell, {
//                     // Use 360deg so it continues spinning forward back to the portrait front face
//                     "--card-flip-y": rotate ? "360deg" : "0deg",
//                     "--card-tilt-z": "0deg",
//                     "--card-tilt-x": "0deg",
//                     ease: "none",
//                     scrollTrigger: {
//                         trigger: "#services",
//                         start: "top top",
//                         end: "bottom top",
//                         scrub,
//                         invalidateOnRefresh: true,
//                     },
//                 });

//                 // 4. Unified Cleanup
//                 return () => {
//                     servicesFlipTween.scrollTrigger?.kill();
//                     servicesFlipTween.kill();
//                     servicesRotationTween.scrollTrigger?.kill();
//                     servicesRotationTween.kill();
                    
//                     aboutFlipTween.scrollTrigger?.kill();
//                     aboutFlipTween.kill();
//                     aboutRotationTween.scrollTrigger?.kill();
//                     aboutRotationTween.kill();

//                     gsap.set([card, inner], { clearProps: "all" });
//                     gsap.set(tiltShell, {
//                         "--card-flip-y": "0deg",
//                         "--card-tilt-z": "0deg",
//                         "--card-tilt-x": "0deg",
//                     });
//                     heroSlot.appendChild(card); // Reset back to top frame
//                 };
//             };

//             // --- BREAKPOINTS ---
//             mm.add("(min-width: 1024px)", () => createAnimatedFlip({ rotate: true, scrub: 1 }));

//             mm.add("(min-width: 768px) and (max-width: 1023px)", () =>
//                 createAnimatedFlip({ rotate: false, scrub: 0.7 })
//             );

//             mm.add("(max-width: 767px)", () => {
//                 const inner = card.querySelector(".transform-style-3d");
//                 const tiltShell = card.querySelector(".card-tilt-shell");

//                 heroSlot.appendChild(card);
//                 gsap.set(card, { clearProps: "all" });
//                 gsap.set(inner, { clearProps: "all" });
//                 gsap.set(tiltShell, {
//                     "--card-flip-y": "0deg",
//                     "--card-tilt-z": "0deg",
//                     "--card-tilt-x": "0deg",
//                 });
//                 return () => {};
//             });

//             requestAnimationFrame(() => ScrollTrigger.refresh());

//             return () => mm.revert();
//         });

//         return () => ctx.revert();
//     }, [cardRef, heroCardSlotRef, servicesCardSlotRef, aboutCardSlotRef]);
// };