"use client";

import React from "react";
import MyText from "./MyText";
import { motion } from "framer-motion";
import { useRef } from "react";
import VariableProximity from "./VariableProximity";
import Spline from "@splinetool/react-spline";

function HeroSection() {
  const containerRef = useRef(null);

  return (
    <section className="h-screen bg-gradient-to-b from-violet-900 to-black flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">
      {/* left section */}
      <div className="z-10 xl:mb-0 mb-[25%]">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.5,
            duration: 1.7,
          }}
          className="text-3xl md:text-5xl lg:text-6xl z-10 mb-6"
        >
          <MyText />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.8,
            duration: 1.7,
          }}
          className="text-xl md:text-xl 1g:text-2x1 text-purple-200 max-w-2xl"
        >
          <div ref={containerRef} style={{ position: "relative" }}>
            <VariableProximity
              label="An innovative and results driven Full Stack Developer & System Designer with a strong passion for building intelligent solutions and scalable web apps. I am actively seeking opportunities to contribute to impactful projects in AI and Web Dev, while continually growing my skills in cutting-edge technologies"
              containerRef={containerRef}
              radius={50}
              falloff="smooth" // "linear", "smooth", or "exponential"
              className="your-classes"
            />
          </div>
        </motion.div>
      </div>

      <Spline
        className="absolute xl:right-[-28%] right-0 top-[-25%] lg:top-0"
        scene="https://prod.spline.design/owO829UAoS7ol3SY/scene.splinecode"
      />
    </section>
  );
}

export default HeroSection;
