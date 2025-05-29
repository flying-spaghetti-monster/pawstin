import { Link } from "react-router";

import AddToCartBtn from "../components/AddToCartBtn";

//TODO: implement Category page
function Category() {
  // const [products, setProducts] = useState([]);
  // const controller = new AbortController();

  // useEffect(() => {
  //   const controller = new AbortController();
  //   axios("http://localhost:6000/product", { signal: controller.signal })
  //     .then((data) => {
  //       setProducts(data.data);
  //     })
  //     .catch((err) => {
  //       if (err.name === "AbortError") {
  //         // Не помилка, просто запит скасовано
  //         return;
  //       }
  //       console.log(err);
  //     });
  // }, []);

  return (
    <></>
    // <div className="col">
    //   <div className="row">
    //     {products.map((item) => {
    //       return (
    //         <div
    //           key={item.isbn}
    //           className="col-3  mb-5 justify-content-center py-5"
    //         >
    //           <div className="card h-100">
    //             <Link to={`/product/${encodeURI(item.isbn)}`}>
    //               <img
    //                 className="card-img-top"
    //                 src={item.imageUrl}
    //                 alt={item.productName}
    //               />
    //               <div className="card-body p-4">
    //                 <div className="text-center">
    //                   <h5 className="fw-bolder">{item.productName}</h5>$
    //                   {item.price}
    //                 </div>
    //               </div>
    //             </Link>

    //             <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
    //               <div className="text-center">
    //                 <AddToCartBtn
    //                   className="btn btn-outline-dark mt-auto"
    //                   product={item}
    //                 >
    //                   Add to cart
    //                 </AddToCartBtn>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
}

export default Category;
