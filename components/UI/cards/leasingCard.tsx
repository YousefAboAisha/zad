type LeasingCardProps = {
  type: string;
  price: number;
  color: string;
};

const LeasingCard = ({ type, price, color }: LeasingCardProps) => {
  return (
    <div
      style={{ color: "white", borderColor: color }}
      className={`group relative flex flex-col items-center justify-center gap-6 p-8 border bg-white`}
    >
      <h2
        style={{ color: color }}
        className={`text-xl font-el_messiri group-hover:!text-white z-10 duration-700`}
      >
        {type}
      </h2>

      <div className="flex flex-row gap-2 z-10">
        <p
          style={{ color: color }}
          className="text-7xl font-extrabold group-hover:!text-white duration-700"
        >
          {price}
        </p>
        <p
          style={{ color: color }}
          className="text-xl font-extralight group-hover:!text-white duration-700"
        >
          &#8362;
        </p>
      </div>
      <span
        className="absolute top-0 left-0 h-full w-3 group-hover:w-full duration-700"
        style={{ backgroundColor: color }}
      ></span>
    </div>
  );
};

export default LeasingCard;
