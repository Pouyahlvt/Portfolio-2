"use client";

import TypewriterText from "../ui/animated/typeWriterText";
import MagneticPlanet from "../arts/magneticPlanet";

const Hero = () => {
  return (
    <main className="w-full min-h-screen flex">
      <div className="w-1/2">
        <h1 className="ml-10 text-[5rem] font-vt323 text-green-digit font-light">
          <TypewriterText text={`Pouya Halavat`} />
        </h1>
        <h1 className="ml-10 text-3xl font-vt323 text-green-digit font-light -mt-4">
          <TypewriterText text="Frontend developer" delay={1000} />
        </h1>
        <h2 className="ml-10 text-3xl font-vt323 text-green-digit font-light -mt-2">
          <TypewriterText
            text="focuse on react and intersted about ai."
            delay={2000}
          />
        </h2>
        <p className="ml-10 text-3xl font-vt323 text-green-digit font-light">
          <TypewriterText text={` :) `} loop delay={4500} />
        </p>
      </div>
      <div className="w-1/2 items-center flex "></div>
    </main>
  );
};

export default Hero;
