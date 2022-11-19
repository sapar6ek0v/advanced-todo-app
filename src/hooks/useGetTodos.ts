import { useEffect, useState } from 'react';
import { query, collection, onSnapshot, where } from 'firebase/firestore';
import { TodoReturnType } from '../components/Form/types';
import { db } from '../utils/firebaseConfig';

function useGetTodos(param: string) {
  const [todos, setTodos] = useState<TodoReturnType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const todosQuery = query(collection(db, 'todo'), where('category', 'in', [param]));

    const unsub = onSnapshot(
      todosQuery,
      (snapShot) => {
        const todosList = [] as any;

        snapShot.docs.forEach((doc) => {
          todosList.push({ id: doc.id, ...doc.data() });
        });

        setIsLoading(false);
        setTodos(todosList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [param]);

  return { todos, isLoading };
}

export default useGetTodos;
