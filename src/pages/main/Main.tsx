import HeroSection from "./heroSection/HeroSection";
import Header from "../../shared/components/Header";
import About from "./aboutSection/AboutSection";
import Services from "./serviceSection/ServicesSetion";
import PlanSection from "./planSection/PlanSection";
import WhyUsSection from "./WhyUsSection/WhyUsSetion";
export default function Main() {
  return (
    <div>
      <Header />
      <HeroSection />

      <About />
      <Services />
      <WhyUsSection />
      <PlanSection />
    </div>
  );
}
