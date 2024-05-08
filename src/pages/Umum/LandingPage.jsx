import Tagline from "../../components/Umum/Tagline";
import AboutUs from "../../components/Umum/AboutUs";
import Product from "../../components/Umum/Product";
import Simulation from "../../components/Umum/Simulation";
function LandingPage() {
  return (
    <>
      <div className="flex flex-col">
        <Tagline/>
        <AboutUs/>
        <Product/>
        <Simulation/>
      </div>
    </>
  );
}

export default LandingPage;
