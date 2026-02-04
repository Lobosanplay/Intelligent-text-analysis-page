import Stars from "./shared/components/Stars";
function App() {
  return (
    <div className="flex flex-col relative min-h-screen overflow-hidden justify-start flex-nowrap bg-black">
      <div className="w-screen">
        <Stars numOfStart={100} />
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
          <div className="absolute -bottom-165.5 -left-110.75 -right-110.75 h-[238.75px] bg-[linear-gradient(180deg,#fff,#0a0a0a00)] rounded-full flex-none" />

          <div className="absolute -bottom-150 -left-130 -right-130 aspect-[2.8/1] h-auto bg-[#0a0a0a] rounded-[100%] shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d]" />

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
