'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const IMAGE_WIDTH = 13750;
  const IMAGE_HEIGHT = 1093;

  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState('100vh');
  const [scaledWidth, setScaledWidth] = useState(0);
  const [scaledHeight, setScaledHeight] = useState(0);
  const [maxPan, setMaxPan] = useState(0);

  const [leftCrop, setLeftCrop] = useState(0);
  const [croppedWidth, setCroppedWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const screenAspect = window.innerWidth / window.innerHeight;
      const imageAspect = IMAGE_WIDTH / IMAGE_HEIGHT;

      let newScaledWidth, newScaledHeight;

      if (screenAspect > imageAspect) {
        newScaledWidth = window.innerWidth;
        newScaledHeight = window.innerWidth / imageAspect;
      } else {
        newScaledHeight = window.innerHeight;
        newScaledWidth = window.innerHeight * imageAspect;
      }

      const leftCropVal = newScaledWidth * 0.1;  
      const rightCropVal = newScaledWidth * 0.1; 
      const croppedWidthVal = newScaledWidth - leftCropVal - rightCropVal;

      setScaledWidth(newScaledWidth);
      setScaledHeight(newScaledHeight);
      setLeftCrop(leftCropVal);
      setCroppedWidth(croppedWidthVal);

      const newMaxPan = croppedWidthVal - window.innerWidth;
      setMaxPan(newMaxPan > 0 ? newMaxPan : 0);

      setScrollHeight(`${window.innerHeight + (newMaxPan > 0 ? newMaxPan : 0)}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset =
    maxPan > 0
      ? -(scrollY / (parseFloat(scrollHeight) - window.innerHeight)) * maxPan - leftCrop
      : -leftCrop;

  return (
    <div className="relative" style={{ height: scrollHeight }}>
      <div
        className="fixed top-1/2 left-0"
        style={{
          width: scaledWidth,
          height: scaledHeight,
          transform: `translateY(-50%) translateX(${parallaxOffset}px)`,
          backgroundImage: 'url(/background.svg)',
          backgroundSize: `${scaledWidth}px ${scaledHeight}px`,
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}
