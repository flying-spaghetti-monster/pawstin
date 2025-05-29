function Header() {
  return (
    <header className="w-full bg-[#212529] text-[#ffffff] bg-[url('../../../public/header-bg.jpg')]">
      <div className='w-full bg-black opacity-50 absolute t-0 z-0 h-[500px]'></div>
      <div className="@container h-[500px] mx-auto flex flex-col justify-center items-center py-30 relative z-1 px-5">
        <h1 className="font-bold text-8xl/normal">
          Stylish Tails, Happy Trails
        </h1>
        <p className="text-3xl  text-[#d5d6d6]">
          Outfits your pet will love to wear
        </p>
      </div>
    </header>
  );
}

export default Header;
