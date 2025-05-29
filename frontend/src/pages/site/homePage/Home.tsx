import PageMeta from '../../components/PageMeta';
import Header from '../Header';
import Recomendations from '../components/Recomendations';

//TODO: api search url rom config
//TODO: @le-pepe/url-helper  ?

function Home() {
  return (
    <>
      <PageMeta
        title="Home"
        description="Pawstin Store"
      />
      <Header/>
      <Recomendations />
    </>
  );
}

export default Home;
