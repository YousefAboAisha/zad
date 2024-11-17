const Landing = () => {
  return (
    <div className="relative flex flex-col justify-center items-start w-full min-h-[90vh] mt-[70px] bg-home-landing bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0000009a] bg-fixed">
      <div className="flex items-center abs-center w-full">
        <h2 className="text-4xl lg:text-5xl text-white font-bold z-10 p-4 lg:p-8 backdrop-blur-sm border shadow rounded-2xl mx-auto">
          تعريف بـ &quot;زاد&quot; 
        </h2>
      </div>
    </div>
  );
};

export default Landing;
