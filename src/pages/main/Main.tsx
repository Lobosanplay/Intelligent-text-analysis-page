import HeroSection from "./hero/HeroSection";
import Header from "../../shared/components/Header";
import About from "./about/About";
export default function Main() {
  return (
    <div>
      <Header />
      <HeroSection />

      <About />
    </div>
  );
}
