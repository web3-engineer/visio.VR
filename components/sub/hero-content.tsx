"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
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
              os horizontes
            </span>{" "}
            da sua empresa.
          </span>
          </motion.div>

          <motion.p
              variants={slideInFromLeft(0.8)}
              className="text-lg text-gray-300 my-5 max-w-[600px]"
          >
            Conheça a startup pioneina de realidade virtual para empresas.
          </motion.p>

          <motion.a
              variants={slideInFromLeft(1)}
              className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
          >
            Learn more
          </motion.a>
        </motion.div>
      </div>
  );
};