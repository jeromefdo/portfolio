import  gsap  from "gsap";
import { useLayoutEffect } from "react";
import { SplitText } from "gsap/all";

export const useHeroAnimation = ({
    containerRef,
    videoRef,
    leftTitleRef,
    rightTitleRef,
    subtitleRef,
    cardRef,
}) => {

    useLayoutEffect(() => {

        const ctx = gsap.context(() => {

            const mm = gsap.matchMedia();
            const cardInner = cardRef.current?.querySelector(".transform-style-3d");

            // ==============================
            // DESKTOP
            // ==============================
            mm.add("(min-width: 1024px)", () => {

                gsap.fromTo(
                    videoRef.current,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 0.4,
                        duration: 1.5,
                        ease: "power2.out",
                    }
                );

                const tl = gsap.timeline({
                    defaults: {
                        ease: "power4.out",
                    },
                });

                let leftSplit;
                let rightSplit;

                try {

                    leftSplit = new SplitText(leftTitleRef.current, {
                        type: "chars",
                    });

                    rightSplit = new SplitText(rightTitleRef.current, {
                        type: "chars",
                    });

                    tl.from(
                        [...leftSplit.chars, ...rightSplit.chars],
                        {
                            opacity: 0,
                            y: 60,
                            rotateX: -60,
                            stagger: 0.02,
                            duration: 1,
                        }
                    );

                } catch {

                    tl.from(
                        [leftTitleRef.current, rightTitleRef.current],
                        {
                            opacity: 0,
                            y: 60,
                            duration: 1,
                            stagger: 0.2,
                        }
                    );

                }

                tl.from(
                    subtitleRef.current,
                    {
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                    },
                    "-=0.5"
                );

                tl.from(
                    cardInner || cardRef.current,
                    {
                        opacity: 0,
                        y: 80,
                        scale: 0.92,
                        duration: 1.2,
                    },
                    "-=0.7"
                );

                return () => {
                    leftSplit?.revert();
                    rightSplit?.revert();
                };

            });

            // ==============================
            // TABLET
            // ==============================
            mm.add("(min-width:768px) and (max-width:1023px)", () => {

                gsap.fromTo(
                    videoRef.current,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 0.4,
                        duration: 1,
                    }
                );

                const tl = gsap.timeline();

                tl.from(
                    [
                        leftTitleRef.current,
                        rightTitleRef.current,
                    ],
                    {
                        opacity: 0,
                        duration: 0.45,
                        ease: "power3.out",
                    }
                );

                tl.from(
                    [
                        leftTitleRef.current,
                        rightTitleRef.current,
                        subtitleRef.current,
                    ],
                    {
                        y: 36,
                        duration: 0.75,
                        stagger: 0.08,
                        ease: "power3.out",
                    },
                    "-=0.1"
                );

                tl.from(
                    subtitleRef.current,
                    {
                        opacity: 0,
                        duration: 0.6,
                    },
                    "-=0.75"
                );

                tl.from(
                    cardInner || cardRef.current,
                    {
                        opacity: 0,
                        x: 60,
                        duration: 0.9,
                        ease: "power3.out",
                    }
                );

            });

            // ==============================
            // MOBILE
            // ==============================
            mm.add("(max-width:767px)", () => {

                gsap.from(
                    [
                        leftTitleRef.current,
                        rightTitleRef.current,
                        subtitleRef.current,
                        cardInner || cardRef.current,
                    ],
                    {
                        opacity: 0,
                        y: 25,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power2.out",
                    }
                );

            });

            return () => {
                mm.revert();
            };

        }, containerRef);

        return () => ctx.revert();

    }, [
        cardRef,
        containerRef,
        leftTitleRef,
        rightTitleRef,
        subtitleRef,
        videoRef,
    ]);

};
