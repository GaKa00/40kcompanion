import Footer from "./components/ui/Footer";
import Hero from "./components/Hero";
import ShowcaseFeatures from "./components/ShowcaseFeatures";
import useAutoLogin from "./hooks/useAutoLogin";

function App() {

   useAutoLogin();
  return (
    <div className="">
      <Hero />
      <ShowcaseFeatures />
      <Footer />
    </div>
  );
}

export default App;
