import { ChangeEvent, FC, useState, KeyboardEvent } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import useGetCategories from '../../hooks/useGetCategories';
import Plus from '../svgs/Plus';
import styles from './styles.module.less';
import NavLink from './NavLink';

const NavBar: FC = () => {
  const [category, setCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { categories, isLoading: isCategoriesLoading } = useGetCategories();

  const handleCategoryOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
  };

  const handleOnKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (!category) return;

    if (event.key === 'Enter') {
      setIsLoading(true);

      const docref = collection(db, 'category');
      const newCategory = {
        name: category,
        createdAt: new Date(),
      };
      await addDoc(docref, newCategory);

      setIsLoading(false);
      setCategory('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.fixedContainer}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            {
              (!isCategoriesLoading && !!categories)
                ? categories.map((category) => (
                  <NavLink key={category.id} category={category} />
                ))
                : <div className={styles.categoriesLoadingTitle}>Загружаем категории...</div>
            }
          </ul>
        </nav>

        <div className={styles.inputWrapper}>
          <div className={styles.addIcon}>
            <Plus />
          </div>
          {
            isLoading ?
              <p className={styles.loadingTitle}>Загрузка...</p> :
              <input
                type='text'
                placeholder='Создать новую категорию...'
                className={styles.input}
                value={category}
                onChange={handleCategoryOnChange}
                onKeyDown={handleOnKeyDown}
              />
          }
        </div>
      </div>
    </div>
  );
};

export default NavBar;