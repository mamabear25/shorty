import React from 'react';
import Scissor from '../assets/sci.png'

function Header() {
  return (
    <header className="bg-gray-300 text-white md:pl-[80px] pl-[40px] md:py-2 py-1 flex justify-between items-center">
      <div className="w-20 h-20">
        <img src={Scissor} alt="logo" className="rounded-full" />
      </div>
    </header>

  );
}

export default Header;
