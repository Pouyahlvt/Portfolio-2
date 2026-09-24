"use caent";

import ScrambleButton from "../ui/scrambleButton";

const Navbar = () => {
  return (
    <section className="fixed  w-fit h-[80vh] items-center right-20 grid ">
      <ScrambleButton className="bg-transparent text-green-digit hover:bg-transparent cursor-pointer ">
        Home
      </ScrambleButton>
      <ScrambleButton className="bg-transparent text-green-digit hover:bg-transparent cursor-pointer ">
        Works
      </ScrambleButton>
      <ScrambleButton className="bg-transparent text-green-digit hover:bg-transparent cursor-pointer ">
        contact me
      </ScrambleButton>
      <ScrambleButton className="bg-transparent text-green-digit hover:bg-transparent cursor-pointer ">
        menu
      </ScrambleButton>
    </section>
  );
};

export default Navbar;
