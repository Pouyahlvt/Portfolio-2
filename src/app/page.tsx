import Hero from "../components/hero/hero";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";

const Home = () => {
  return (
    <main className="flex w-full min-h-screen ">
      <div className="fixed w-full h-full flex -z-9999 overflow-hidden bg-black">
        <Image
          src={"/monitor.png"}
          width={2000}
          height={2000}
          alt="monitor frame"
          className="w-full h-full "
        />
      </div>
      <main className="fixed inset-0 py-12 px-20 ">
        {/* Scrollable inner frame */}
        <div className="w-full h-full overflow-y-auto scrollbar-none">
          <Navbar />
          <Hero />
        </div>
      </main>
    </main>
  );
};

export default Home;
