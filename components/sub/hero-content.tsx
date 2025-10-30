"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

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

          <motion.div
              variants={slideInFromLeft(0.5)}
              className="flex flex-col gap-6 mt-6 text-6xl font-bold max-w-[600px]"
          >
          <span>
            Expanda{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              os
              horizontes
            </span>{" "}
            da sua empresa.
          </span>
          </motion.div>

          <motion.p
              variants={slideInFromLeft(0.8)}
              className="text-lg text-gray-300 my-5 max-w-[600px]"
          >
            Conheça a startup pioneira de realidade virtual no Ceará.
          </motion.p>

          <div className="relative mt-4 w-[240px] h-[120px] pointer-events-none select-none">
            {/* Partículas decorativas */}
            {PARTICLES.map((p, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.6, y: 6 }}
                animate={{ opacity: [0.2, 0.9, 0.4, 0.9], y: [6, -6, 6] }}
                transition={{ duration: 3.2, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
                style={{ left: p.x, top: p.y }}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 blur-[1px] shadow-[0_0_12px_rgba(112,66,248,0.7)]"
              />
            ))}

            {/* Anel externo brilhante */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.2, 0.6] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-cyan-500/10 blur-xl"
            />

            {/* Botão */}
            <motion.a
              variants={slideInFromLeft(1)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.55, ease: 'easeOut' }}
              whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(112,66,248,0.8)" }}
              whileTap={{ scale: 0.96 }}
              className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 relative py-3 px-6 text-center font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-cyan-500 hover:to-purple-600 transition-all duration-300 cursor-pointer overflow-hidden max-w-[220px]"
              aria-label="Saiba Mais sobre a VisioVR"
            >
              <span className="relative z-10">Saiba Mais</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 hover:opacity-40 blur-md transition-opacity duration-300"></div>
              {/* brilho central sutil */}
              <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_60%)]" />
            </motion.a>
          </div>
        </motion.div>
      </div>
  );
};