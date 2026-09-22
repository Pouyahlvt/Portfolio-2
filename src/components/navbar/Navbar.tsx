"use caent";

const Navbar = () => {
  return (
    <section className="fixed flex w-full h-10 items-center justify-center gap-7">
      <h1
        className="text-nowrap  text-3xl  bg-shadow-grey text-bright-snow px-4 absolute left-2 top-4 select-none
      font-pixel italic">
        No Signal
      </h1>
      <ul className="flex w-full h-10 items-center justify-center gap-7 font-pixel">
        <a className="text-xl cursor-pointer font-thin text-black/60 hover:text-black transition-all duration-300 ease-out">
          Home
        </a>
        <a className="text-xl cursor-pointer font-thin text-black/60 hover:text-black transition-all duration-300 ease-out">
          Work
        </a>
        <a className="text-xl cursor-pointer font-thin text-black/60 hover:text-black transition-all duration-300 ease-out">
          Contact
        </a>
      </ul>
    </section>
  );
};

export default Navbar;
