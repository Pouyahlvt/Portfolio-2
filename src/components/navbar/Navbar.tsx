"use caent";

const Navbar = () => {
  return (
    <section className="fixed flex w-full h-10 items-center justify-center gap-7">
      <ul className="flex w-full h-10 items-center justify-center gap-7">
        <a className="text-xl cursor-pointer font-mono font-thin text-black/60 hover:text-black transition-all duration-300 ease-out">
          Home
        </a>
        <a className="text-xl cursor-pointer font-mono font-thin text-black/60 hover:text-black transition-all duration-300 ease-out">
          Work
        </a>
        <a className="text-xl cursor-pointer font-mono font-thin text-black/60 hover:text-black transition-all duration-300 ease-out">
          Contact
        </a>
      </ul>
    </section>
  );
};

export default Navbar;
