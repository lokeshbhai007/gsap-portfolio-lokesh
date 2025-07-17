import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import React from "react";
import Ribbons from "@/components/Ribbons";
import AboutSection from "@/components/AboutSection"
import SkillsSection from "@/components/SkillsSection";


function page() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection/>
      <SkillsSection/>

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
