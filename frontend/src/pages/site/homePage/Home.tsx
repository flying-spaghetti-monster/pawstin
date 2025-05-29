import { Link } from "react-router";
import Header from '../Header';
import Recomendations from '../components/Recomendations';

function Home() {
  return (
    <>
      <Header/>
      <div className="row">
        <div className="col">
          <section className="py-5 bg-light justify-content-center">
            <h1 className="fw-bolder mb-4 text-center text-4xl">Recommended products</h1>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              <Recomendations />
            </div>
            <div className="text-center">
              <Link to={"/products"} className="btn btn-outline-dark mt-auto text-2xl border-2 p-1 px-4 rounded-xl hover:bg-gray-500"> See All </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
