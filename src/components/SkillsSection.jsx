"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "@/_components/Card";
import Image from "next/image";
import InfiniteMenu from "@/_components/InfiniteMenu";

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const menuContainerRef = useRef(null);

  const items = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      title: "HTML5",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      title: "CSS3",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      title: "JavaScript",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      link: "https://reactjs.org/",
      title: "React",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
      link: "https://nextjs.org/",
      title: "Next.js",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      link: "https://tailwindcss.com/",
      title: "Tailwind CSS",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
      link: "https://nodejs.org/",
      title: "Node.js",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
      link: "https://expressjs.com/",
      title: "Express.js",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
      link: "https://mongodb.com/",
      title: "MongoDB",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/MySQL_textlogo.svg",
      link: "https://mysql.com/",
      title: "MySQL",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg",
      link: "https://git-scm.com/",
      title: "Git",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      link: "https://github.com/",
      title: "GitHub",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      link: "https://figma.com/",
      title: "Figma",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
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

    // InfiniteMenu container animation
    gsap.fromTo(
      menuContainerRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: menuContainerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-h-screen min-h-screen relative overflow-hidden bg-gradient-to-b from-[black] to-[black] max-w-full mb-3"
    >
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mb-10 md:mb-0">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl pt-6 pb-16 sm:pb-0 sm:pt-6 font-bold sm:mb-16 text-center text-white opacity-0 "
        >
          Skills
        </h1>
      </div>

      <div 
        ref={menuContainerRef}
        className="max-w-full pt-6 sm:py-0 sm:mx-24 mx-6 opacity-0 sm:border-none border border-cyan-800"
      >
        <div style={{ height: "520px", position: "relative" }}>
          <InfiniteMenu items={items} />
        </div>
      </div>
    </section>
  );
}