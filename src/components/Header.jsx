"use client";

import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import Image from "next/image";

// Lazy load the ContactForm component
const ContactForm = lazy(() => import("./ContactForm"));

// SVG Icons as React components
const GithubIcon = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openContactForm = () => {
    setIsContactFormOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const menuItems = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <>
      <section className="absolute w-full z-50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              delay: 0.3,
              duration: 1.2,
            }}
            className="flex items-center z-50"
          >
            {/* <div className="h-8 w-10 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-2 sm:mr-3">
              LM
            </div> */}
            {/* <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              {"<"} <span className="text-red-500">/</span>{" Lokesh >"}
            </p> */}
            <Image
              src="/logo.png"
              alt="logo"
              width={120}
              height={120}
            />
          </motion.div>

          {/* desktop navigation */}
          <nav className="lg:flex hidden space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.7 + index * 0.2,
                }}
                key={item}
                className="relative text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300 group"
                href="#"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>

          {/* desktop social icons and connect button */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.a
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              href="#"
            >
              <GithubIcon className="w-6 h-6" />
            </motion.a>

            <motion.a
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              href="#"
            >
              <LinkedinIcon className="w-6 h-6" />
            </motion.a>

            <motion.a
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              href="#"
            >
              <MailIcon className="w-8 h-8" />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.6,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 30,
              }}
            >
              <div className="ml-4" onClick={openContactForm}>
                <Button />
              </div>
            </motion.div>
          </div>

          {/* mobile menu button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={toggleMenu}
            className="lg:hidden z-50 relative p-2 rounded-lg  backdrop-blur-sm transition-all duration-300"
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-200" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* mobile menu overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={toggleMenu}
              />

              {/* mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="absolute top-full left-0 right-0 bg-gradient-to-t from-gray-950 to-purple-950/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-2xl z-40 md:hidden lg:hidden"
              >
                <div className="container mx-auto px-4 py-6 ">
                  {/* mobile navigation */}
                  <nav className="flex flex-col space-y-4 mb-6 ">
                    {menuItems.map((item, index) => (
                      <motion.a
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        key={item}
                        className="relative text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        href="#"
                        onClick={toggleMenu}
                      >
                        {item}
                      </motion.a>
                    ))}
                  </nav>

                  {/* mobile social icons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="flex items-center justify-center space-x-6 mb-6 "
                  >
                    <a
                      className="text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      href="#"
                    >
                      <GithubIcon className="w-6 h-6" />
                    </a>

                    <a
                      className="text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      href="#"
                    >
                      <LinkedinIcon className="w-6 h-6" />
                    </a>

                    <a
                      className="text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      href="#"
                    >
                      <MailIcon className="w-8 h-8" />
                    </a>
                  </motion.div>

                  {/* mobile connect button */}
                  <div
                    className="flex justify-center"
                    onClick={openContactForm}
                  >
                    <Button />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={closeContactForm}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Suspense
                fallback={
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                  </div>
                }
              >
                <ContactForm onClose={closeContactForm} />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
