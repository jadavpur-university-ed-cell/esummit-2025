"use client";
import React from "react";
import "./Gallery.css";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
  { src: "/gallery/1.jpg", alt: "1" },
  { src: "/gallery/2.jpg", alt: "2" },
  { src: "/gallery/3.jpg", alt: "3" },
  { src: "/gallery/4.jpg", alt: "4" },
  { src: "/gallery/5.jpg", alt: "5" },
  { src: "/gallery/6.jpg", alt: "6" },
  { src: "/gallery/7.jpg", alt: "7" },
  { src: "/gallery/8.jpg", alt: "8" },
  { src: "/gallery/9.jpg", alt: "9" },
  { src: "/gallery/10.jpg", alt: "10" },
  { src: "/gallery/11.jpg", alt: "11" },
  { src: "/gallery/12.jpg", alt: "12" },
  { src: "/gallery/13.jpg", alt: "13" },
  { src: "/gallery/14.jpg", alt: "14" },
  { src: "/gallery/15.jpg", alt: "15" },
  { src: "/gallery/16.jpg", alt: "16" },
  { src: "/gallery/17.jpg", alt: "17" },
  { src: "/gallery/18.jpg", alt: "18" },
  { src: "/gallery/19.jpg", alt: "19" },
  { src: "/gallery/20.jpg", alt: "20" },
  { src: "/gallery/21.jpg", alt: "21" },
  { src: "/gallery/22.jpg", alt: "22" },
  { src: "/gallery/23.jpg", alt: "23" },
  { src: "/gallery/24.jpg", alt: "24" },
];

function Gallery() {
  return (
    <section
      id="gallery"
      className=" min-h-[50vh] lg:min-h-screen flex mt-80 flex-col justify-center w-full overflow-hidden"
    >
      <div className="flex flex-col items-center justify-start p-5 gap-y-10">
        <h1 className="animated-title text-5xl sm:text-7xl text-white py-3 mb-7 font-bold">
          Gallery
        </h1>
        {/*
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          autoplay={{
            delay: 2500, // Adjust the delay time (in milliseconds) between slides
            disableOnInteraction: false, // Continue autoplay after user interactions
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]} // Include Autoplay module
          className="flex flex-col items-center justify-center w-[100%] lg:w-[71.5%] mx-auto sm:rounded-[6rem]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image.src} alt={image.alt} fill />
            </SwiperSlide>
          ))}
        </Swiper>
        */}
        <Carousel
          opts={{ loop: true, align: "start" }}
          className="w-5/6 md:w-1/2"
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.alt}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={600}
                  className="rounded-4xl aspect-video"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default Gallery;
