"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);
  const triggerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [imageLoadingStates, setImageLoadingStates] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const projectImage = [
    {
      id: 1,
      title: "Planzo - AI Powered",
      imageSrc: "/planzo1.jpeg",
      link: "https://planzo-advisor.vercel.app/",
      techStack: ["Next.js", "Tailwind CSS", "WebSpeech API", "Gen AI"]
    },
    {
      id: 2,
      title: "HireLoom - Resume Analyser",
      imageSrc: "/hireloom1.jpeg",
      link: "https://hireloom.vercel.app/",
      techStack: ["Next.js", "Tailwind CSS", "PDF Parser", "Gen AI"]
    },
    {
      id: 3,
      title: "TuneMate",
      imageSrc: "/tunemate1.jpeg",
      link: "https://tunemate-one.vercel.app/",
      techStack: ["Next.js", "Tailwind CSS", "Gen AI" ]
    },
  ];

  // Initialize loading states immediately
  useEffect(() => {
    const initialLoadingStates = {};
    const initialErrorStates = {};
    projectImage.forEach(project => {
      initialLoadingStates[project.id] = true;
      initialErrorStates[project.id] = false;
    });
    setImageLoadingStates(initialLoadingStates);
    setImageErrors(initialErrorStates);
    
    // Also set initial imagesLoaded to 0 to ensure loading state is shown
    setImagesLoaded(0);
  }, []);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      projectImage.forEach((project, index) => {
        const img = new window.Image();
        
        img.onload = () => {
          setImagesLoaded(prev => prev + 1);
          setImageLoadingStates(prev => ({
            ...prev,
            [project.id]: false
          }));
        };
        
        img.onerror = () => {
          setImageErrors(prev => ({
            ...prev,
            [project.id]: true
          }));
          setImageLoadingStates(prev => ({
            ...prev,
            [project.id]: false
          }));
        };
        
        img.src = project.imageSrc;
      });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    // Don't wait for all images to load before showing animations
    // Initialize animations regardless of loading state
    gsap.registerPlugin(ScrollTrigger);

    // Get responsive values
    const getResponsiveValues = () => {
      const width = window.innerWidth;
      if (width < 640) { // sm
        return {
          isMobile: true,
          snapDuration: { main: 0.4, max: 0.6 },
          snapDelay: 0.2,
          imageScale: { from: 0.3, to: 1 },
          imageRotate: { from: -30, to: 0 },
          titleY: { from: 40, to: 0 },
          techStackY: { from: 30, to: 0 },
          parallaxIntensity: 0.3,
        };
      } else if (width < 768) { // md
        return {
          isMobile: true,
          snapDuration: { main: 0.35, max: 0.55 },
          snapDelay: 0.18,
          imageScale: { from: 0.2, to: 1 },
          imageRotate: { from: -25, to: 0 },
          titleY: { from: 35, to: 0 },
          techStackY: { from: 25, to: 0 },
          parallaxIntensity: 0.4,
        };
      } else if (width < 1024) { // lg
        return {
          isMobile: false,
          snapDuration: { main: 0.25, max: 0.4 },
          snapDelay: 0.12,
          imageScale: { from: 0.1, to: 1 },
          imageRotate: { from: -20, to: 0 },
          titleY: { from: 30, to: 0 },
          techStackY: { from: 20, to: 0 },
          parallaxIntensity: 0.5,
        };
      } else { // xl and above
        return {
          isMobile: false,
          snapDuration: { main: 0.2, max: 0.3 },
          snapDelay: 0.1,
          imageScale: { from: 0, to: 1 },
          imageRotate: { from: -15, to: 0 },
          titleY: { from: 25, to: 0 },
          techStackY: { from: 15, to: 0 },
          parallaxIntensity: 0.6,
        };
      }
    };

    const responsive = getResponsiveValues();

    // Ensure title is visible initially (fallback)
    gsap.set(titleRef.current, { opacity: 1 });
    gsap.set(titleLineRef.current, { opacity: 1 });

    // Title reveal animation with responsive easing
    gsap.fromTo(
      titleRef.current,
      {
        y: responsive.isMobile ? 60 : 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: responsive.isMobile ? 1 : 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Title line animation with responsive timing
    gsap.fromTo(
      titleLineRef.current,
      {
        width: "0%",
        opacity: 0,
      },
      {
        width: "100%",
        opacity: 1,
        duration: responsive.isMobile ? 1.2 : 1.5,
        ease: "power3.inOut",
        delay: responsive.isMobile ? 0.2 : 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Section entrance effect with responsive values
    gsap.fromTo(
      triggerRef.current,
      {
        y: responsive.isMobile ? 60 : 100,
        rotationX: responsive.isMobile ? 10 : 20,
        opacity: 0,
      },
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: responsive.isMobile ? 0.8 : 1,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Enhanced parallax effect with responsive intensity
    gsap.fromTo(
      sectionRef.current,
      {
        backgroundPosition: "50% 0%",
      },
      {
        backgroundPosition: `50% ${responsive.parallaxIntensity * 100}%`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Set initial state for all images and tech stack with responsive values
    gsap.set(".project-image", { 
      scale: responsive.imageScale.from, 
      rotate: responsive.imageRotate.from,
      transformOrigin: "center center"
    });
    gsap.set(".project-title", { y: responsive.titleY.from, opacity: 0 });
    gsap.set(".project-tech-stack", { y: responsive.techStackY.from, opacity: 0 });

    const containerWidth = horizontalRef.current.offsetWidth;
    const totalWidth = containerWidth * projectImage.length;

    // Create the horizontal scrolling animation with responsive snap
    const horizontalScroll = gsap.to(".panel", {
      xPercent: -100 * (projectImage.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (projectImage.length - 1),
          duration: responsive.snapDuration,
          delay: responsive.snapDelay,
        },
        invalidateOnRefresh: true,
      },
    });

    // Enhanced image animations with responsive values
    const panels = gsap.utils.toArray(".panel");
    panels.forEach((panel, i) => {
      const image = panel.querySelector(".project-image");
      const imageTitle = panel.querySelector(".project-title");
      const techStack = panel.querySelector(".project-tech-stack");
      
      // First panel should be visible by default with smooth entrance
      if (i === 0) {
        gsap.set(image, { scale: 1, rotate: 0 });
        gsap.set(imageTitle, { y: 0, opacity: 1 });
        gsap.set(techStack, { y: 0, opacity: 1 });
        
        // Add a subtle entrance animation for the first image
        gsap.fromTo(image, 
          { scale: 0.8, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: panel,
              start: "top 50%",
              toggleActions: "play none none reverse",
            }
          }
        );
        
        gsap.fromTo(techStack,
          { y: 15, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6,
            ease: "power2.out",
            delay: 0.7,
            scrollTrigger: {
              trigger: panel,
              start: "top 50%",
              toggleActions: "play none none reverse",
            }
          }
        );
        
        gsap.fromTo(imageTitle,
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6,
            ease: "power2.out",
            delay: 0.9,
            scrollTrigger: {
              trigger: panel,
              start: "top 50%",
              toggleActions: "play none none reverse",
            }
          }
        );
        return;
      }
      
      // Create enhanced timeline for each panel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horizontalScroll,
          start: "left 75%",
          end: "left 25%",
          scrub: 1,
          onEnter: () => {
            // Add a subtle glow effect on enter (mobile-friendly)
            if (!responsive.isMobile) {
              gsap.to(image, {
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                duration: 0.3
              });
            }
          },
          onLeave: () => {
            if (!responsive.isMobile) {
              gsap.to(image, {
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                duration: 0.3
              });
            }
          }
        },
      });

      // Enhanced image scale and rotation animation
      tl.fromTo(
        image,
        { 
          scale: responsive.imageScale.from, 
          rotate: responsive.imageRotate.from,
          opacity: 0.3
        },
        { 
          scale: responsive.imageScale.to, 
          rotate: responsive.imageRotate.to,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }
      );

      // Tech stack animation
      if (techStack) {
        tl.fromTo(
          techStack, 
          { 
            y: responsive.techStackY.from, 
            opacity: 0,
            scale: 0.9
          }, 
          { 
            y: responsive.techStackY.to, 
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          }, 
          0.2
        );
      }

      // Enhanced title animation
      if (imageTitle) {
        tl.fromTo(
          imageTitle, 
          { 
            y: responsive.titleY.from, 
            opacity: 0,
            scale: 0.9
          }, 
          { 
            y: responsive.titleY.to, 
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          }, 
          0.4
        );
      }

      // Add subtle floating animation for non-mobile devices
      if (!responsive.isMobile) {
        tl.to(image, {
          y: -10,
          duration: 0.3,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true
        }, 0.8);
      }
    });

    // Add resize listener for responsive updates
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projectImage.length]); // Remove dependency on imagesLoaded

  // Enhanced loading skeleton component
  const ImageSkeleton = ({ isLoading = true }) => (
    <div className="w-full aspect-[5/3] relative bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
      {isLoading ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl sm:rounded-2xl animate-pulse">
            <div className="absolute inset-0 bg-gray-300 opacity-50 rounded-xl sm:rounded-2xl"></div>
          </div>
          {/* Animated loading spinner */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <span className="text-sm text-gray-500 font-medium">Loading image...</span>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gray-300 rounded-xl sm:rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 mb-2">⚠️</div>
            <span className="text-sm text-gray-500">Failed to load image</span>
          </div>
        </div>
      )}
    </div>
  );

  // Get responsive image sizes
  const getImageSizes = () => {
    return "(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, 60vw";
  };

  // Handle image load success
  const handleImageLoad = (projectId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [projectId]: false
    }));
  };

  // Handle image load error
  const handleImageError = (projectId) => {
    setImageErrors(prev => ({
      ...prev,
      [projectId]: true
    }));
    setImageLoadingStates(prev => ({
      ...prev,
      [projectId]: false
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="horizontal-section"
      className="relative py-8 sm:py-12 bg-[#f6f6f6] overflow-hidden min-h-screen"
    >
      {/* Section title */}
      <div className="container mx-auto px-4 mb-8 sm:mb-12 md:mb-16 relative z-10">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-4" 
        >
          Featured Projects
        </h2>

        <div
          ref={titleLineRef}
          className="w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"
        ></div>

        {/* Horizontal scroll section */}
        <div ref={triggerRef} className="overflow-hidden h-[100vh] sm:h-[65vh] md:h-[110vh]">
          <div
            ref={horizontalRef}
            className="horizontal-section flex h-full"
            style={{
              width: `${projectImage.length * 100}%`
            }}
          >
            {projectImage.map((project, index) => (
              <div
                key={project.id}
                className="panel panel-div relative flex items-center justify-center h-full"
                style={{
                  width: `${100 / projectImage.length}%`,
                  minWidth: `${100 / projectImage.length}%`
                }}
              >
                <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
                  <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl flex flex-col items-center justify-center">
                    <div className="w-full aspect-[5/3] relative">
                      {imageLoadingStates[project.id] || imageErrors[project.id] ? (
                        <ImageSkeleton isLoading={imageLoadingStates[project.id]} />
                      ) : (
                        <Image
                          src={project.imageSrc}
                          fill
                          alt={`${project.title} project`}
                          className="w-full h-full rounded-xl sm:rounded-2xl object-cover project-image shadow-xl sm:shadow-2xl transition-all duration-300 hover:shadow-3xl"
                          priority={index === 0}
                          quality={index === 0 ? 90 : 75}
                          sizes={getImageSizes()}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          loading={index === 0 ? "eager" : "lazy"}
                          onLoad={() => handleImageLoad(project.id)}
                          onError={() => handleImageError(project.id)}
                        />
                      )}
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="project-tech-stack flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 mb-2 sm:mb-4">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="project-title flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold md:font-bold text-black text-center z-50">
                      <span className="text-center leading-tight">{project.title}</span>
                      <Link href={project.link} className="group">
                        <ExternalLink 
                          size={40} 
                          className="text-black transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:text-red-600 cursor-pointer" 
                        />
                      </Link>
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;