import { Link } from "react-router";
import Header from '../Header';
import Recomendations from '../components/Recomendations';

function Home() {
  return (
    <>
      <Header/>
      <section className="container flex flex-col mx-auto justify-center items-center py-20 bg-light text-center px-4">
        <h1 className="fw-bolder mb-4 text-4xl">Recommended products</h1>
        <div className="flex flex-row justify-between gap-4" >
          <Recomendations />
        </div>
        <div className="">
          <Link to={"/products"} className="btn btn-outline-dark mt-auto text-2xl border-2 p-1 px-4 rounded-xl hover:bg-gray-500"> See All </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
