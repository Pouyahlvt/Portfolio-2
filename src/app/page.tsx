import Hero from "../components/hero/hero";
import Navbar from "../components/navbar/Navbar";

const Home = () => {
  return (
    <main className="flex w-full min-h-screen bg-green-600 font-mono ">
      <Navbar />
      <Hero />
    </main>
  );
};

export default Home;
