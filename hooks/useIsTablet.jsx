import { useState, useEffect } from 'react';

const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const userAgent = navigator.userAgent;

      // iPad-specific checks
      const isIpadDimensions = (
        // iPad Mini (7.9")
        (width === 768 && height === 1024) ||
        (width === 1024 && height === 768) ||
        // iPad (10.2")
        (width === 810 && height === 1080) ||
        (width === 1080 && height === 810) ||
        // iPad Air (10.5" and 10.9")
        (width === 834 && height === 1112) ||
        (width === 1112 && height === 834) ||
        (width === 820 && height === 1180) ||
        (width === 1180 && height === 820) ||
        // iPad Pro 11"
        (width === 834 && height === 1194) ||
        (width === 1194 && height === 834) ||
        // iPad Pro 12.9"
        (width === 1024 && height === 1366) ||
        (width === 1366 && height === 1024)
      );

      const isIpadUA = /iPad|Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1;
      const isIpadOS = navigator.platform === 'MacIntel' && 
                      navigator.maxTouchPoints > 1 && 
                      !window.MSStream;

      // Android tablet checks
      const isAndroidTablet = /Android/.test(userAgent) && 
                             !/Mobile/.test(userAgent);

      // General tablet dimension checks
      const isTabletDimensions = (
        // Common Android tablet dimensions
        (width >= 600 && width <= 1280 && height >= 800 && height <= 1920) ||
        // Samsung Galaxy Tab dimensions
        (width >= 800 && width <= 1280 && height >= 1280 && height <= 800) ||
        // Amazon Fire tablet dimensions
        (width >= 600 && width <= 1200 && height >= 800 && height <= 1920) ||
        // Generic tablet ranges
        (width >= 768 && width <= 1280 && height >= 600 && height <= 1280)
      );

      // Additional tablet feature checks
      const hasTabletFeatures = (
        ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
        screenWidth >= 600 &&
        !/Windows NT|Mac OS X/.test(userAgent)
      );

      // Aspect ratio check (most tablets are between 4:3 and 16:10)
      const aspectRatio = width / height;
      const hasTabletRatio = aspectRatio >= 0.5 && aspectRatio <= 1.8;

      // Microsoft Surface and Windows tablet detection
      const isWindowsTablet = /Windows/.test(userAgent) && 
                             (navigator.maxTouchPoints > 0) && 
                             (/Tablet|Touch/.test(userAgent) || 
                              width >= 768 && hasTabletRatio);

      const isIpad = isIpadDimensions || isIpadUA || isIpadOS;
      const isGenericTablet = isTabletDimensions && hasTabletFeatures && hasTabletRatio;
      const isAnyTablet = isIpad || isAndroidTablet || isWindowsTablet || isGenericTablet;

      setIsTablet(isAnyTablet);
    };

    // Initial check
    checkDevice();

    // Add event listeners
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return isTablet;
};

export default useIsTablet;