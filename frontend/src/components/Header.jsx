import React from 'react';
import Scissor from '../assets/sci.png'

function Header() {
  return (
    <header className="bg-gray-300 text-white pl-[80px] py-2 flex justify-between items-center">
      <div className="w-20 h-20">
        <img src={Scissor} alt="logo" className="rounded-full" />
      </div>
      <div className="container mx-auto text-black pr-[100px]">
        {/* <p className="text-right text-lg font-medium bg-orange-600 w-16 mx-auto pr-1 rounded text-white justify-center">Login</p> */}
      </div>
    </header>

  );
}

export default Header;
