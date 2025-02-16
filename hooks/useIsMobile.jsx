"use client";
import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  // testing the user agent for mobile devices

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768 || /Mobi/.test(userAgent)); // Now includes tablets
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;