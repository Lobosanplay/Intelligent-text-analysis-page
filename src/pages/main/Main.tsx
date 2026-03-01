import HeroSection from "./heroSection/HeroSection";
import About from "./aboutSection/AboutSection";
import Services from "./serviceSection/ServicesSetion";
import PlanSection from "./planSection/PlanSection";
import WhyUsSection from "./WhyUsSection/WhyUsSetion";
import FAQSection from "./fqaSection/FAQSection";
import Layout from "./layout/Layout";

export default function Main() {
  return (
    <Layout>
      <HeroSection />
      <About />
      <Services />
      <WhyUsSection />
      <PlanSection />
      <FAQSection />
    </Layout>
  );
}
