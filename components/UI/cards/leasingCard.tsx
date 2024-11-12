type LeasingCardProps = {
  type: string;
  price: number;
  color: string;
};

const LeasingCard = ({ type, price, color }: LeasingCardProps) => {
  return (
    <div
      className={`group relative flex flex-col items-center justify-center gap-6 p-8 shadow-sm border `}
    >
      <h2 className="text-2xl font-el_messiri text-white z-10" >{type}</h2>
      <div className="flex flex-row gap-2 z-10">
        <p className="text-7xl font-extrabold text-white">{price}</p>
        <p className="text-xl font-extralight text-white">&#8362;</p>
      </div>
      <span
        className="absolute top-0 left-0 h-full w-3 group-hover:w-full duration-700 "
        style={{ backgroundColor: color }}
      ></span>
    </div>
  );
};

export default LeasingCard;
