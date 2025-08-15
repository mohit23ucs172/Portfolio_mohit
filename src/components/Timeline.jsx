"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="c-space section-spacing"
      ref={containerRef}
    >
      <h2 className="text-heading text-4xl font-extrabold text-center text-gradient mb-12">
        Education & Work Experience
      </h2>

      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10 group"
          >
            {/* Left Date & Title Section */}
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              {/* Timeline Dot */}
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-purple-500 shadow-lg shadow-purple-500/30">
                <div className="w-4 h-4 p-2 border rounded-full bg-neutral-900 border-neutral-700" />
              </div>

              {/* Date & Titles */}
              <div className="flex-col hidden gap-2 md:flex md:pl-20">
                <h3 className="text-xl font-semibold text-purple-400">{item.date}</h3>
                <h3 className="text-3xl font-bold text-neutral-200 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <h3 className="text-lg text-neutral-400">{item.job}</h3>
              </div>
            </div>

            {/* Right Content Section */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="block mb-4 text-lg font-bold text-left text-purple-400 md:hidden">
                <h3>{item.date}</h3>
                <h3>{item.job}</h3>
              </div>
              <div className="p-6 bg-neutral-900/70 rounded-xl shadow-lg shadow-purple-500/10 border border-neutral-800 backdrop-blur-md hover:scale-[1.01] transition-transform">
                {item.contents.map((content, idx) => (
                  <p
                    className="mb-3 font-normal text-neutral-400 leading-relaxed"
                    key={idx}
                  >
                    {content}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Timeline Vertical Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-neutral-700 to-transparent rounded-full"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-purple-500 via-purple-300/50 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
