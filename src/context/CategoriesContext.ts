import { createContext, useContext, SetStateAction, Dispatch } from 'react';

type CategoriesContextProps = {
  currentCategory: string;
  setCurrentCategory: Dispatch<SetStateAction<string>>;
};

export const CategoriesContext = createContext<CategoriesContextProps>({
  currentCategory: 'Home',
  setCurrentCategory: () => {},
});

export const useCategoriesContext = () => useContext(CategoriesContext);
