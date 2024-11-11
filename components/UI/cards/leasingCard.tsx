type FeatureCardProps = {
  type: string;
  price: number;
};

const LeasingCard = ({ type, price }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl border border-white">
      <h2 className="text-2xl font-el_messiri text-white">{type}</h2>
      <div className="flex flex-row gap-2">
        <p className="text-7xl font-extrabold text-white">{price}</p> <p className="text-xl font-extralight text-white">&#8362;</p>
      </div>
    </div>
  );
};

export default LeasingCard;
