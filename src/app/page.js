"use client"

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import React from "react";
import Ribbons from "@/components/Ribbons";
import AboutSection from "@/components/AboutSection"
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectSection";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LastSection from "@/components/LastSection";

function page() {

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Refresh ScrollTrigger when the page is fully Loaded
    ScrollTrigger.refresh()

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection/>
      <SkillsSection/>
      <ProjectsSection/>
      <LastSection/>

      {/* <div
        style={{ height: "500px", position: "relative", overflow: "hidden" }}
      >
        <Ribbons
          baseThickness={30}
          colors={["#ffffff"]}
          speedMultiplier={0.5}
          maxAge={500}
          enableFade={false}
          enableShaderEffect={true}
        />
      </div> */}
    </>
  );
}

export default page;
