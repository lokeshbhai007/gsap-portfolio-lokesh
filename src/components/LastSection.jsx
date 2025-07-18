"use client";

import { useRef, useEffect, use } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Buttonlast from "@/_components/Buttonlast";

export default function LastSection() {
  const circleRef = useRef(null);
  const sectionRef = useRef(null);
  const initialTextRef = useRef(null);
  const finalTextRef = useRef(null);

  useEffect(() => {
    // Register Gsap plugins
    gsap.registerPlugin(ScrollTrigger);

    // Make sure all ScrollTrigger instances are properly killed
    const cleanup = () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === sectionRef.current) {
          st.kill(true);
        }
      });
    };

    cleanup();

    //set initial states
    gsap.set(circleRef.current, { scale: 1, backgroundColor: "white" });
    gsap.set(initialTextRef.current, { opacity: 1 });
    gsap.set(finalTextRef.current, { opacity: 0 });

    //create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        invalidateOnRefresh: true,
      },
    });

    // initial state to mid-zoom (0-50%)
    tl.to(
      circleRef.current,
      {
        scale: 5,
        backgroundColor: "#9333EA",
        ease: "power1.inOut",
        duration: 0.5,
      },
      0
    );

    // Fade out initial text during first half
    tl.to(
      initialTextRef.current,
      {
        opacity: 0,
        ease: "power1.out",
        duration: 0.2,
      },
      0.1
    );

    // Mid-zoom to final state ( 50%-100% )
    tl.to(
      circleRef.current,
      {
        scale: 17,
        backgroundColor: "#E9D5FF",
        boxShadow: "0 0 50px 20px rgba(233, 213, 255, 0.3)",
        ease: "power2.inOut",
        duration: 0.5,
      },
      0.5
    );

    // Fade in final text during secound half
    tl.to(
      finalTextRef.current,
      {
        opacity: 1,
        ease: "power2.in",
        duration: 0.2,
      },
      0.7
    );
  });

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center bg-black relative h-100vh min-h-screen"
      style={{ overscrollBehavior: "none" }}
    >
      {/* simple circle with minimal nesting */}
      <div
        ref={circleRef}
        className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full flex items-center justify-center relative transition-shadow duration-1000 shadow-violet-300/50 shadow-lg bg-gradient-to-r from-violet-400 to-pink-100"
      >
        {/* initial text */}
        <p
          ref={initialTextRef}
          className="text-black font-bold text-base sm:text-lg md:text-xl absolute inset-0 flex items-center text-center"
        >
          SCROLL DOWN
        </p>

        {/* final text */}
        <div
          ref={finalTextRef}
          className="text-center relative flex flex-col items-center justify-center opacity-0"
        >
          <h1 className="text-red-500 md:w-[10rem] w-[20rem] lg:scale-[0.4] sm:scale-[0.25] scale-[0.07] md:font-bold text-sm sm:text-base leading-none mb-2">
            Thank You
          </h1>

          <p className="text-black lg:w-[40rem] w-[20rem] absolute sm:mt-2 md:scale-[0.1] scale-[0.068]">
            For taking the time to explore my portfolio and learn about my work.{" "}
            
            <br />I appreciate your interest and would love to connect with you.
          </p>

          <div className="absolute sm:mt-5 mt-2.5 flex items-center justify-center md:scale-[0.065] scale-[0.038]">
            <Buttonlast />
          </div>
        </div>
      </div>
    </section>
  );
}
