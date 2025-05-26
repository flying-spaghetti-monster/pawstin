

function Header() {
  const itemData = [
    {
      img: "photo_9_2025-04-29_22-02-40.jpg",
      title: "Ostin",
    },
    {
      img: "photo_9_2025-04-29_22-02-37.jpg",
      title: "Ostin",
    },
    {
      img: "photo_8_2025-04-29_22-02-37.jpg",
      title: "Ostin",
    },
    {
      img: "photo_7_2025-04-29_22-02-37.jpg",
      title: "Ostin",
    },
    {
      img: "photo_6_2025-04-29_22-02-40.jpg",
      title: "Ostin",
    },
    {
      img: "photo_6_2025-04-29_22-02-32.jpg",
      title: "Ostin",
    },
    {
      img: "photo_5_2025-04-29_22-02-37.jpg",
      title: "Ostin",
    },
    {
      img: "photo_3_2025-04-29_22-02-37.jpg",
      title: "Ostin",
    },
    {
      img: "photo_2025-04-29_22-02-21.jpg",
      title: "Ostin",
    },
    {
      img: "photo_2_2025-04-29_22-02-37.jpg",
      title: "Ostin",
    },
  ];
  return (
    <div className="bg-[#212529] text-[#ffffff] relative">
      <header className="absolute top-0 left-0 w-full sm:h-[350px] h-[450px] z-1">
        <div className="container mx-auto flex flex-col justify-center items-center py-30">
          <h1 className="font-bold text-8xl/normal">
            Stylish Tails, Happy Trails
          </h1>
          <p className="text-3xl  text-[#d5d6d6]">
            Outfits your pet will love to wear
          </p>
        </div>
      </header>
      <div className="flex justify-center items-center">
        {itemData.map((item) => (
          <img
            key={item.img}
            src={`/gallery/${item.img}`}
            alt={item.title}
            loading="lazy"
            width={300}
            height={450}
            className="opacity-50 overflow-hidden"
          />
        ))}
      </div>
    </div>
  );
}

export default Header;
