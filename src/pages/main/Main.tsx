import HeroSection from "./hero/HeroSection";
import Header from "../../shared/components/Header";
import About from "./about/About";
import Services from "./services/Services";
export default function Main() {
  return (
    <div>
      <Header />
      <HeroSection />

      <About />
      <Services />
    </div>
  );
}
