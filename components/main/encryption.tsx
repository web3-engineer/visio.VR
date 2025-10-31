"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { slideInFromTop } from "@/lib/motion";
import visiovrlogo from "@/app/visiovrlogo.png";

export const Encryption = () => {
  return (
    <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full -z-20">
      <div className="absolute w-auto h-auto top-0 z-[5]">
        <motion.div
          variants={slideInFromTop}
          animate={{
            y: [0, -10, 0],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity
          }}
          className="text-[40px] font-medium text-center text-gray-200 select-none"
        >
          Mundos sob medida{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse">
            &
          </span>{" "}
          feitos para você.
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center absolute z-[20] w-auto h-auto top-[58%] sm:top-[60%] md:top-[62%] lg:top-[62%] -translate-y-1/2">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">

          <Image
            src={visiovrlogo}
            alt="VisioVR Logo"
            width={160}
            height={160}
            className="z-60 relative drop-shadow-[0_0_35px_rgba(112,66,248,0.9)] hover:scale-110 transition-transform duration-700 ease-in-out"
            priority
          />
        </div>

        <div className="Welcome-box px-[15px] py-[4px] z-[20] border mt-[160px] border-[#7042F88B] opacity-[0.9]">
          <h1 className="text-[18px] leading-relaxed text-gray-200 text-center max-w-[700px]">A Vision VR é uma Startup focada em oferecer tecnologia de ponta por um preço acessivel.
          Através de avançados algoritmos de IA e mãos habilidosas, entregamos mundos e experiências imersivas para empresas e instituições.</h1>
        </div>
      </div>


      <div className="w-full flex items-start justify-center absolute">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-auto"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};
