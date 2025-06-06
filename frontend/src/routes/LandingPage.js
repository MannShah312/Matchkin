import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Services from "../components/Services";
import Navbar from "../components/Navbar";


// const LandingPage = () => {
//   return (
//     <div className="w-full h-full overflow-x-hidden">
//         <Navbar />
//         <HeroSection />
//         <HowItWorks />
//         <Services />
//     </div>
//   );
// };
// export default LandingPage;


const LandingPage = () => {
  return (
    <div className="w-full h-full overflow-x-hidden scroll-smooth">
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <HowItWorks />
      </div>
      <div id="services">
        <Services />
      </div>
    </div>
  );
};
export default LandingPage;