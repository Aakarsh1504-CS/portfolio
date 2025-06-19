'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaCode, FaDownload } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="mb-6 relative group"
            >
              <FaCode className="w-16 h-16 text-blue-600 dark:text-blue-400 transform transition-transform duration-200 group-hover:scale-110" />
            </motion.div>

            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                Hi, I&apos;m
              </h1>
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent min-h-[80px]">
                <TypeAnimation
                  sequence={[
                    'Aakarsh Arora',
                    2000,
                    'Reliable Engineer',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  cursor={true}
                  style={{ display: 'inline-block' }}
                />
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              Backend Developer specializing in Financial Systems
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              Experienced in designing and delivering secure, high-volume financial systems
              with production-grade reliability. Focused on payment integrations, KYC automation,
              and fraud prevention. Solved 400+ DSA problems on LeetCode, demonstrating strong
              problem-solving skills and algorithmic thinking.
            </p>
            
            <div className="flex items-center space-x-6 mb-8">
              {[
                {
                  href: "https://github.com/Aakarsh1504-CS",
                  icon: FaGithub,
                  label: "GitHub",
                  color: "hover:text-gray-800 dark:hover:text-white"
                },
                {
                  href: "https://www.linkedin.com/in/aakarsh-arora-b3965822b/",
                  icon: FaLinkedin,
                  label: "LinkedIn",
                  color: "hover:text-blue-600 dark:hover:text-blue-400"
                },
                {
                  href: "https://leetcode.com/u/Aakarsh_1504/",
                  icon: SiLeetcode,
                  label: "LeetCode",
                  color: "hover:text-[#FFA116] dark:hover:text-[#FFA116]"
                }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-3xl ${social.color} transition-all duration-200 transform hover:scale-110 active:scale-95`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>

              <motion.a
                href="/resumee.pdf"
                download
                className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="text-lg" />
                Download Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:ml-auto">
              <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/10 rounded-2xl transform -rotate-6"></div>
              <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/10 rounded-2xl transform rotate-3"></div>
              <div className="relative rounded-2xl overflow-hidden w-full h-full">
                <Image
                  src="/profile.png"
                  alt="Aakarsh Arora"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 