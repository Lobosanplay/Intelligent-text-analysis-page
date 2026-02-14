import HeroSection from "./hero/HeroSection";

function App() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      <HeroSection />

      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Nueva sección debajo del hero 🚀</h2>
      </section>
    </main>
  );
}

export default App;
