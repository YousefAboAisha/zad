import Image from "next/image";

const Gallery = () => {
  return (
    <div className="container grid grid-cols-2 md:grid-cols-4 mt-32 gap-10">
      <div className="group relative overflow-hidden rounded-3xl shadow-2xl w-fit h-fit translate-y-5">
        <Image
          src={"/zad-image-1.jpg"}
          alt="zad-image-1"
          width={1000}
          height={1000}
          className="rounded-2xl shadow-3xl group-hover:scale-125 duration-[2s] w-fit h-fit"
        />
      </div>

      <div className="group relative overflow-hidden rounded-3xl shadow-2xl w-fit h-fit  -translate-y-5">
        <Image
          src={"/zad-image-2.jpg"}
          alt="zad-image-2"
          width={1000}
          height={1000}
          className="rounded-2xl shadow-3xl group-hover:scale-125 duration-[2s] w-fit h-fit"
        />
      </div>

      <div className="group relative overflow-hidden rounded-3xl shadow-2xl w-fit h-fit  translate-y-5">
        <Image
          src={"/zad-image-3.jpg"}
          alt="zad-image-3"
          width={1000}
          height={1000}
          className="rounded-2xl shadow-3xl group-hover:scale-125 duration-[2s] w-fit h-fit"
        />
      </div>

      <div className="group relative overflow-hidden rounded-3xl shadow-2xl w-fit h-fit  -translate-y-5">
        <Image
          src={"/zad-image-1.jpg"}
          alt="zad-image-2"
          width={1000}
          height={1000}
          className="rounded-2xl shadow-3xl group-hover:scale-125 duration-[2s] w-fit h-fit"
        />
      </div>
    </div>
  );
};

export default Gallery;
