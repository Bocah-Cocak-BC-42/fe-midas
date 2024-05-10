function StepNavigation(props) {
  const { stepOptions, tab } = props;
  return (
    <div className="flex flex-wrap justify-center gap-4 border-b-8 pb-8 mb-4 items-baseline">
      {/* <div
      className={`grid grid-cols-${stepOptions.length} border-b-8 pb-8 mb-4 items-baseline`}
    > */}
      {stepOptions.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center w-48`}
        >
          <div
            className={`${
              tab === index + 1 ? "bg-[#C07F00]" : "bg-[#FFD95A]"
            } h-14 w-14 flex justify-center items-center text-white rounded-full`}
          >
            {index + 1}
          </div>

          <p
            className={`text-center ${
              tab === index + 1 ? "text-[#C07F00]" : "text-[#FFD95A]"
            }`}
          >
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StepNavigation;
