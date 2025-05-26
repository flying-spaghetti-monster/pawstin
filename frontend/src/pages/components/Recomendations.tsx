import { getCategoryProducts } from "@/lib/db/product";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";

export default async function Recomendations() {
  const recomends = await getCategoryProducts(0, 4);
  return (
    <>
      {recomends.map((item) => {
        return (
          <div
            key={item.isbn}
            className="border-1 border-[#d2d2d2] rounded-2xl "
          >
            <Link href={`/product/${encodeURI(item.isbn)}`}>
              <Image
                className="rounded-t-2xl"
                src={item.imageUrl}
                alt={item.productName}
                width={450}
                height={300}
              />
            </Link>

            <div className="py-4 text-xl">
              <h5 className="font-bold">{item.productName}</h5>
              <div className="font-medium my-2">$ {item.price.toFixed(2)}</div>
              <AddToCartBtn product={item} />
            </div>
          </div>
        );
      })}
    </>
  );
}
