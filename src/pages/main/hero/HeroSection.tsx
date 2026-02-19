import HeroBackground from "./components/HeroBackground";
import HeroContent from "./components/HeroContent";
export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <HeroBackground />

      <HeroContent />
    </section>
  );
}
