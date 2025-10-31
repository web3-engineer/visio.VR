"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Link from 'next/link';

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  const PARTICLES = [
    { x: "8%",  y: "-18%", d: 0.00 },
    { x: "20%", y: "-28%", d: 0.10 },
    { x: "35%", y: "-20%", d: 0.20 },
    { x: "48%", y: "-30%", d: 0.30 },
    { x: "62%", y: "-22%", d: 0.40 },
    { x: "75%", y: "-15%", d: 0.50 },
    { x: "12%", y: "-6%",  d: 0.15 },
    { x: "28%", y: "-10%", d: 0.25 },
    { x: "44%", y: "-8%",  d: 0.35 },
    { x: "58%", y: "-12%", d: 0.45 },
    { x: "70%", y: "-6%",  d: 0.55 },
    { x: "84%", y: "-12%", d: 0.65 },
    { x: "16%", y: "10%",  d: 0.20 },
    { x: "32%", y: "6%",   d: 0.30 },
    { x: "50%", y: "12%",  d: 0.40 },
    { x: "66%", y: "6%",   d: 0.50 },
  ];
  return (
      <div className="relative w-full min-h-screen flex flex-col items-start justify-center px-20 text-start text-white">
        <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start justify-center w-full"
        >
          <motion.div
              variants={slideInFromTop}
              className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]] flex items-center"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">
              Powered by Metahorizon
            </h1>
          </motion.div>

          <motion.h1
            variants={slideInFromLeft(0.5)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, textShadow: [
              "0 0 0px rgba(0,255,255,0.0)",
              "0 0 8px rgba(34,211,238,0.35)",
              "0 0 0px rgba(0,255,255,0.0)"
            ] }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mt-6 text-5xl sm:text-6xl font-light tracking-tight leading-tight max-w-[700px] select-none"
          >
            <motion.span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #3b82f6, #9333ea, #ec4899, #3b82f6)",
                backgroundSize: "300% 100%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              Expanda os horizontes da sua empresa.
            </motion.span>
          </motion.h1>

          <motion.p
              variants={slideInFromLeft(0.8)}
              className="text-lg text-gray-300 my-5 max-w-[600px]"
          >
            Conheça a startup pioneira de realidade virtual no Ceará.
          </motion.p>

          <Link href="#projects-end" scroll={true}>
            <motion.div
              variants={slideInFromLeft(1)}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              whileHover={{
                scale: 1.06,
                boxShadow: '0 0 35px rgba(112,66,248,0.9)',
                background: 'linear-gradient(90deg, rgba(90,40,255,1) 0%, rgba(0,212,255,1) 100%)',
              }}
              whileTap={{ scale: 0.94 }}
              className="mt-8 ml-0 py-3 px-8 text-lg font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-full shadow-[0_0_30px_rgba(112,66,248,0.5)] transition-all duration-500 ease-out hover:shadow-[0_0_45px_rgba(112,66,248,0.8)] cursor-pointer"
              aria-label="Ir para a seção de projetos"
            >
              Saiba Mais
            </motion.div>
          </Link>
        </motion.div>
      </div>
  );
};