'use client';

import { useHorizontalPanorama } from "@/hooks/useHorizontalScroll";

export default function Home() {
  const IMAGE_WIDTH = 13750;
  const IMAGE_HEIGHT = 1093;

  const { scrollHeight, scaledWidth, scaledHeight, parallaxOffset } =
    useHorizontalPanorama(IMAGE_WIDTH, IMAGE_HEIGHT, 0.1);

  return (
    <div className="relative" style={{ height: scrollHeight }}>
      <div
        className="fixed top-1/2 left-0"
        style={{
          width: scaledWidth,
          height: scaledHeight,
          transform: `translateY(-50%) translateX(${parallaxOffset}px)`,
          backgroundImage: "url(/background.svg)",
          backgroundSize: `${scaledWidth}px ${scaledHeight}px`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
