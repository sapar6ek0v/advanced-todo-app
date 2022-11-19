import { FC, useState } from 'react';
import Layout from './components/Layout';
import NavBar from './components/NavBar';
import Main from './components/Main';
import { CategoriesContext } from './context/CategoriesContext';

const App: FC = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('Home');

  return (
    <CategoriesContext.Provider value={{ currentCategory, setCurrentCategory }}>
      <Layout>
        <NavBar />
        <Main />
      </Layout>
    </CategoriesContext.Provider>
  );
}

export default App;
