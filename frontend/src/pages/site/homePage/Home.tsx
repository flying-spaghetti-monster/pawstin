import PageMeta from '../../components/PageMeta';
import Header from '../Header';
import Recomendations from '../components/Recomendations';

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
