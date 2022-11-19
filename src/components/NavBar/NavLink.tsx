import { FC, MouseEvent } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import { useCategoriesContext } from '../../context/CategoriesContext';
import { Category } from '../../context/types';
import Trash from '../svgs/Trash';
import styles from './styles.module.less';

type Props = {
  category: Category;
};

const NavLink: FC<Props> = ({ category }) => {
  const { setCurrentCategory, currentCategory } = useCategoriesContext();
  const { id, name } = category;

  const handleDelete = async (event: MouseEvent<HTMLDivElement> | undefined) => {
    event?.stopPropagation();
    try {
      const docref = doc(db, 'category', id);
      await deleteDoc(docref);
    } catch (error) {
      console.error({ error });
    }
  };

  const handleActive = (event: MouseEvent<HTMLElement> | undefined) => {
    event?.stopPropagation();
    setCurrentCategory(name);
  };

  return (
    <li
      className={name === currentCategory ? `${styles.active} ${styles.li}` : styles.li}
      onClick={handleActive}
    >
      <p>{name}</p>
      {
        name !== 'Home' ?
          <div className={styles.totalQuantity} onClick={handleDelete}>
            <div className={styles.trash} >
              <Trash />
            </div>
          </div> : null
      }
    </li >
  );
};

export default NavLink;