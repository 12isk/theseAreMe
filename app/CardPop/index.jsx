"use client";
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import styles from "./styles.module.scss";
import MuteButton from '../components/Buttons';

const images = [
    "/images/pop/blur serifa.jpeg",
    "/images/pop/chromatic abb.gif",
    "/images/pop/kazakhstan.webp",
    "/images/pop/me.webp",
    "/images/pop/soloEx.webp",
    "/images/pop/pixels.jpeg",
];
const sound = "/audio/Nichel.mp3"

export default function Index() {
    const [isHovering, setIsHovering] = useState(false);
    const mouse = useRef({ x: 0, y: 0 });
    const imageRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(images[0]);
    const intervalRef = useRef(null);
    const animationFrameRef = useRef(null);

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0.01,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        }
    };

    // Mouse movement handler
    const handleMouseMovement = (e) => {
        mouse.current = {
            x: e.pageX,
            y: e.pageY
        };
    };

    // Touch movement handler
    const handleTouchMovement = (e) => {
        if (e.touches && e.touches.length > 0) {
            mouse.current = {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            };
        }
    };

    useEffect(() => {
        if (!imageRef.current) return;

        const moveImageX = gsap.quickTo(imageRef.current, "left", {
            duration: 0.82,
            ease: "power3",
            yPercent: -50,
        });

        const moveImageY = gsap.quickTo(imageRef.current, "top", {
            duration: 0.82,
            ease: "power3",
            xPercent: -50,
        });

        const updatePosition = () => {
            moveImageX(mouse.current.x);
            moveImageY(mouse.current.y);
            animationFrameRef.current = requestAnimationFrame(updatePosition);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMovement);
            window.addEventListener('touchmove', handleTouchMovement, { passive: true });
            animationFrameRef.current = requestAnimationFrame(updatePosition);

            return () => {
                window.removeEventListener('mousemove', handleMouseMovement);
                window.removeEventListener('touchmove', handleTouchMovement);
                if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            };
        }
    }, [isHovering]);

    const handleHover = () => {
        setIsHovering(true);
        intervalRef.current = setInterval(() => {
            setCurrentImage((prevImage) => {
                const currentIndex = images.indexOf(prevImage);
                const nextIndex = (currentIndex + 1) % images.length;
                return images[nextIndex];
            });
        }, 1000);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        clearInterval(intervalRef.current);
    };

    // Toggle function for touch (or click) based devices
    const handleToggle = () => {
        if (isHovering) {
            // Stop and leave the current image visible
            setIsHovering(false);
            clearInterval(intervalRef.current);
        } else {
            handleHover();
        }
    };

    return (
        <>
            <div className={styles.cardPopcontainer}>
                <div className={styles.around}>
                    <p className={styles.topLeft}>a display of things</p>
                    <p className={styles.topRight}>that make me</p>
                    <p className={styles.botLeft}>discover</p>
                    <p className={styles.botRight}>who i am</p>
                    <div className={styles.muteButton}>
                        <MuteButton soundFile={sound} />
                    </div>
                </div>

                <motion.div
                    className={styles.image}
                    ref={imageRef}
                    variants={imageVariants}
                    animate={isHovering ? "visible" : "hidden"}
                >
                    <img
                        src={currentImage}
                        alt="pop"
                        width={200}
                        height={200}
                    />
                </motion.div>
                <div
                    className={styles.popZone}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleToggle}
                >
                    <span className={styles.these}>these</span>
                    <span className={styles.text}>
                        are me<span className={styles.orange}>*</span>
                    </span>
                </div>
            </div>
        </>
    );
}