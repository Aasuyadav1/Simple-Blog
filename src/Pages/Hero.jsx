import React from "react";

function Hero() {
  return (
    <div className="w-full flex justify-center items-center bg-[url(https://static.wixstatic.com/media/5bfb6f_26f1a5c736e544e09c63c82a4c792645~mv2_d_3839_1306_s_2.jpg/v1/fill/w_1517,h_653,al_b,q_85,usm_0.66_1.00_0.01,enc_auto/5bfb6f_26f1a5c736e544e09c63c82a4c792645~mv2_d_3839_1306_s_2.jpg)] h-[500px] object-cover bg-no-repeat bg-center grayscale-[30%] cursor-pointer hover:grayscale-0 duration-700 transition-all ease-in-out">
      <div className="text-center font-sans text-white text-lg leading-none">
        <p className="text-xl">Travel Blog</p>
        <h1 className="text-6xl">Going Places</h1>
        <p className="mt-4 text-xl">I haven’t been everywhere, but it’s on my list</p>
      </div>
    </div>
  );
}

export default Hero;
