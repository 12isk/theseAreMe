"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

export default function Slider() {
  return (
    <div className={styles.imageContainer}>
      <motion.div 
        className={styles.slider}
        animate={{
          x: ["0%", "-68.9%"]  // Only animate to half the width
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",  // Use mirror instead of loop for seamless transition
          ease: "linear"
        }}
      >
        {/* First set */}
        <Image
          className={styles.image}
          src="/images/slider/corridor.gif"
          height={350}
          width={500}
          alt="woman decisively walking down corridor"
        />
        <Image
          className={styles.image}
          src="/images/slider/dollyzoom.gif"
          height={350}
          width={500}
          alt="close-up dolly zoom of lady"
        />
        <Image
          className={styles.image}
          src="/images/slider/running.gif"
          height={350}
          width={500}
          alt="man facing the camera and running"
        />
        {/* Duplicate set for seamless loop */}
        <Image
          className={styles.image}
          src="/images/slider/corridor.gif"
          height={350}
          width={500}
          alt="woman decisively walking down corridor"
        />
        <Image
          className={styles.image}
          src="/images/slider/dollyzoom.gif"
          height={350}
          width={500}
          alt="close-up dolly zoom of lady"
        />
        <Image
          className={styles.image}
          src="/images/slider/running.gif"
          height={350}
          width={500}
          alt="man facing the camera and running"
        />
      </motion.div>
    </div>
  );
}