import HeroSection from "./heroSection/HeroSection";
import Header from "../../shared/components/Header";
import About from "./aboutSection/AboutSection";
import Services from "./serviceSection/ServicesSetion";
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
