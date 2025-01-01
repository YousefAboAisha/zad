'use client'
import { galleryData } from "@/data/galleryData";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// Add the onClick gallery function and UI
const Gallery = () => {
  return (
    <div className="container grid grid-cols-2 md:grid-cols-4 mt-32 gap-10">
      {galleryData.map(({ alt, src }, index) => {
        // console.log([index, src, alt]);

        return (
          <PhotoProvider key={index}>
            <PhotoView src={src}>
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl w-fit h-fit border even:-translate-y-5 odd:translate-y-5">
                <Image
                  src={src}
                  alt={alt}
                  width={1000}
                  height={1000}
                  className="rounded-2xl shadow-3xl group-hover:scale-150 duration-[1.3s] w-fit h-fit border cursor-pointer"
                  loading="lazy"
                />
              </div>
            </PhotoView>
          </PhotoProvider>
        );
      })}
    </div>
  );
};

export default Gallery;
