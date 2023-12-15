"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export const HoverLinks = () => {
  const imgSrc = "https://picsum.photos/300/400?random";
  return (
    <section
      className={"bg-neutral-950 p-4 md:p-8 min-h-screen overflow-x-hidden"}
    >
      <div className="mx-auto max-w-5xl">
        <Link
          heading="About"
          subheading="Who we are and what we do"
          imgSrc={`${imgSrc}=1`}
          href="#"
        />
        <Link
          heading="Clients"
          subheading="We work with great people"
          imgSrc={`${imgSrc}=2`}
          href="#"
        />
        <Link
          heading="Portfolio"
          subheading="Our work speaks for itself"
          imgSrc={`${imgSrc}=3`}
          href="#"
        />
        <Link
          heading="Careers"
          subheading="We want cool people"
          imgSrc={`${imgSrc}=4`}
          href="#"
        />
        <Link
          heading="Fun"
          subheading="Incase you are bored"
          imgSrc={`${imgSrc}=5`}
          href="#"
        />
      </div>
    </section>
  );
};

type LinkProps = {
  heading: string;
  subheading: string;
  imgSrc: string;
  href: string;
};

const Link = ({ heading, subheading, imgSrc, href }: LinkProps) => {
  const aRef = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const top = useTransform(ySpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(xSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = aRef.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      ref={aRef}
      initial={"initial"}
      onMouseMove={handleMouseMove}
      whileHover={"whileHover"}
      href={href}
      className={
        "group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
      }
    >
      <div>
        <motion.span
          variants={{
            initial: {
              x: 0,
            },
            whileHover: {
              x: -16,
            },
          }}
          transition={{
            type: "spring",
            delayChildren: 0.25,
            staggerChildren: 0.075,
          }}
          className={
            "relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 md:text-6xl group-hover:text-neutral-50"
          }
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  x: 0,
                },
                whileHover: {
                  x: 16,
                },
              }}
              transition={{
                type: "spring",
              }}
              className={"inline-block"}
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span
          className={
            "relative z-10 mt-2 block text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50"
          }
        >
          {subheading}
        </span>
      </div>

      <motion.img
        variants={{
          initial: {
            scale: 0,
            rotate: "-12.5deg",
          },
          whileHover: {
            scale: 1,
            rotate: "12.5deg",
          },
        }}
        transition={{
          type: "spring",
        }}
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        src={imgSrc}
        className={
          "absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        }
        alt={`Image link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.5,
          ease: "backInOut",
        }}
        className={"relative z-10 p-4"}
      >
        <FiArrowRight className={"text-5xl text-neutral-50"} />
      </motion.div>
    </motion.a>
  );
};
