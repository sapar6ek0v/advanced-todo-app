import { FC, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './utils/firebaseConfig';

const App: FC = () => {
  const todoCollectionRef = collection(db, 'todo');

  const getTodos = async () => {
    const data = await getDocs(todoCollectionRef);
    console.log(data)
  };

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="App">
      Edit <code>src/App.tsx</code> and save to reload.
    </div>
  );
}

export default App;
