import { useEffect, useState } from "react";

export function useHorizontalPanorama(imageWidth: number, imageHeight: number, cropPercent = 0.1) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState("100vh");
  const [scaledWidth, setScaledWidth] = useState(0);
  const [scaledHeight, setScaledHeight] = useState(0);
  const [maxPan, setMaxPan] = useState(0);
  const [leftCrop, setLeftCrop] = useState(0);
  const [croppedWidth, setCroppedWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const screenAspect = window.innerWidth / window.innerHeight;
      const imageAspect = imageWidth / imageHeight;

      let newScaledWidth, newScaledHeight;
      if (screenAspect > imageAspect) {
        newScaledWidth = window.innerWidth;
        newScaledHeight = window.innerWidth / imageAspect;
      } else {
        newScaledHeight = window.innerHeight;
        newScaledWidth = window.innerHeight * imageAspect;
      }

      const leftCropVal = newScaledWidth * cropPercent;
      const rightCropVal = newScaledWidth * cropPercent;
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageWidth, imageHeight, cropPercent]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset =
    maxPan > 0
      ? -(scrollY / (parseFloat(scrollHeight) - window.innerHeight)) * maxPan - leftCrop
      : -leftCrop;

  return {
    scrollHeight,
    scaledWidth,
    scaledHeight,
    parallaxOffset,
  };
}
