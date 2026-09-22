"use caent";

import SignalButton from "../ui/Buttons";

const Navbar = () => {
  return (
    <section className="fixed flex w-full h-10 items-center justify-center gap-7">
      <h1
        className="text-nowrap  text-3xl  bg-shadow-grey text-bright-snow px-4 absolute left-2 top-4 select-none
      font-pixel italic">
        No Signal
      </h1>
      <div className="flex w-full h-10 items-center justify-center gap-7 font-pixel pt-12">
        <SignalButton size="lg">Hello</SignalButton>
      </div>
    </section>
  );
};

export default Navbar;
