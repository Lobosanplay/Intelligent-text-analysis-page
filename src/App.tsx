import Stars from "./shared/components/Stars";

function App() {
  return (
    <div className="flex flex-col relative min-h-screen overflow-hidden justify-start flex-nowrap bg-black">
      <div className="w-screen fixed inset-0 z-0">
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-[80px] bg-linear-to-b from-black/80 via-black/40 to-transparent"></div>

          <div className="relative w-full h-full">
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-225 h-225 bg-[radial-gradient(circle,#8b5cf680_0%,transparent_60%)] blur-[120px] opacity-50 animate-pulse-slow"></div>
            <div className="absolute top-[30%] right-[20%] w-175 h-175 bg-[radial-gradient(circle,#3b82f680_0%,transparent_65%)] blur-[100px] opacity-40 animate-float"></div>
            <div className="absolute bottom-[10%] left-[30%] w-162.5 h-162.5 bg-[radial-gradient(circle,#ec489980_0%,transparent_65%)] blur-[90px] opacity-35 animate-float-reverse"></div>

            <div className="absolute top-[40%] left-[20%] w-75 h-75 bg-[radial-gradient(circle,#06b6d480_0%,transparent_70%)] blur-[80px] opacity-20 animate-pulse-slow"></div>
            <div className="absolute bottom-[20%] right-[15%] w-87.5 h-87.5 bg-[radial-gradient(circle,#10b98180_0%,transparent_70%)] blur-[70px] opacity-20 animate-move-slow"></div>
            <div className="absolute top-[40%] left-[70%] w-62.5 h-62.5 bg-[radial-gradient(circle,#f59e0b80_0%,transparent_70%)] blur-[60px] opacity-15 animate-float"></div>
          </div>
          <Stars numOfStart={100} />
        </div>
      </div>
      <div className="flex flex-col min-h-screen justify-center items-center z-10 relative">
        <h1 className="text-3xl font-bold text-white">
          Intelligent text analysis
        </h1>
        <span className="mt-3 text-white text-center max-w-xl">
          Intelligent text analysis It is a program that will help you create
          summaries efficiently and understand their fundamental topics.
        </span>

        <div className="flex-none overflow-hidden absolute w-full h-full z-0">
          <div className="absolute -bottom-40 md:-bottom-165.5 -left-10 md:-left-110.75 -right-10 md:-right-110.75 h-25 md:h-[238.75px] bg-[linear-gradient(180deg,#fff,#0a0a0a00)] rounded-full flex-none" />

          <div className="absolute bottom-0 md:-bottom-150 left-0 md:-left-140 right-0 md:-right-130 aspect-[2.8/1] h-auto">
            <div className="absolute w-full h-100 md:h-200 -bottom-50 md:bottom-10 lg:bottom-0 bg-[#0a0a0a] rounded-[100%] shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d] z-0" />

            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,#ffffff80,#0a0a0a00)] flex-none overflow-hidden absolute w-full max-w-[80vw] md:max-w-196.75 h-12.5 md:h-27.75 bottom-40 md:bottom-170 blur-[28px] md:blur-[57px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
          </div>

          <div className="flex flex-row items-center gap-0 justify-center inset-0 overflow-hidden p-0 absolute flex-nowrap">
            <div className="bg-[linear-gradient(90deg,#0a0a0a,#0a0a0a00)] flex-none h-full overflow-hidden relative w-1/2"></div>
            <div className="bg-[linear-gradient(270deg,#0a0a0a,#0a0a0a00)] flex-none h-full overflow-hidden relative w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
