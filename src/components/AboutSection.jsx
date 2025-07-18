"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "@/_components/Card";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // title animation
    gsap.fromTo(
      titleRef.current,
      {
        y: 200,
        opacity: 0,
      },
      {
        y: 10,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // card animation - slide in from left
    gsap.fromTo(
      cardRef.current,
      {
        x: -100,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // image animation - slide in from right with rotation
    gsap.fromTo(
      imageRef.current,
      {
        x: 100,
        opacity: 0,
        scale: 0.9,
        rotation: 5,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        delay: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Add a subtle floating animation to the image after initial load
    gsap.to(imageRef.current, {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 1,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-h-screen min-h-screen relative overflow-auto bg-gradient-to-b from-black to-black"
    >
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mb-10 md:mb-0">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold sm:mb-16 text-center text-white opacity-0 pt-4 "
        >
          About Me
        </h1>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center px-10 pt-6 sm:py-0 sm:px-24 gap-10 sm:gap-0 overflow-hidden">
        <div ref={cardRef} className="felx justify-center items-center">
          <Card />
        </div>

        <div ref={imageRef}>
          <Image
            src="/person-11.png"
            width={400}
            height={100}
            alt="profile-image"
            className="mix-blend-lighten opacity-75"
          />
        </div>
      </div>
    </section>
  );
}