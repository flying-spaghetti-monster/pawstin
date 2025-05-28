import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import axios from "axios";

import AddToCartBtn from "./components/AddToCartBtn";
import Header from '../../components/Header';

function Home() {
  // const [recomends, setRelateds] = useState([]);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   axios("http://localhost:6000/product", {
  //     params: {
  //       count: 4,
  //     },
  //     signal: controller.signal,
  //   })
  //     .then((data) => {
  //       // console.log(data);
  //       setRelateds(data.data);
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
    <Header />
    // recomends && (
    //   <div className="row">
    //     <div className="col">
    //       <section className="py-5 bg-light justify-content-center">
    //         <h2 className="fw-bolder mb-4 text-center">Recommended products</h2>
    //         <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
    //           {recomends.map((item) => {
    //             return (
    //               <div
    //                 key={item.isbn}
    //                 className="col-3 justify-content-center py-5"
    //               >
    //                 <div className="card h-100">
    //                   <Link to={`/product/${encodeURI(item.isbn)}`}>
    //                     <img
    //                       className="card-img-top"
    //                       src={item.imageUrl}
    //                       alt={item.productName}
    //                     />
    //                     <div className="card-body p-4">
    //                       <div className="text-center">
    //                         <h5 className="fw-bolder">{item.productName}</h5>$
    //                         {item.price}
    //                       </div>
    //                     </div>
    //                   </Link>

    //                   <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
    //                     <div className="text-center">
    //                       <AddToCartBtn
    //                         className="btn btn-outline-dark mt-auto"
    //                         product={item}
    //                       >
    //                         Add to cart
    //                       </AddToCartBtn>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             );
    //           })}
    //         </div>
    //         <div className="text-center">
    //           <Link to={"/products"} className="btn btn-outline-dark mt-auto">
    //             {" "}
    //             See All
    //           </Link>
    //         </div>
    //       </section>
    //     </div>
    //   </div>
    // )
  );
}

export default Home;
