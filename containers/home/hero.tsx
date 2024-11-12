import React from "react";
import Subscribe from "./subscribe";

const Hero = () => {
  return (
    <div className="section relative bg-home-landing w-full min-h-[60vh] bg-fixed lg:bg-cover bg-center rounded-lg flex flex-col justify-center p-8 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-overlay before:rounded-lg mt-24">
     <Subscribe />
    </div>
  );
};

export default Hero;