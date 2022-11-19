import { Dispatch, FC, SetStateAction, memo } from 'react';
import useGetCategories from '../../hooks/useGetCategories';
import styles from './styles.module.less';

type Props = {
  setCategory: Dispatch<SetStateAction<string>>;
};

const CustomSelect: FC<Props> = ({ setCategory }) => {
  const { categories } = useGetCategories();

  return (
    <>
      {
        categories ?
          <select
            className={styles.wrapper}
            defaultValue='Home'
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories
              .map((category) => {
                return (
                  <option
                    key={category.id}
                    value={category.name}
                    className={styles.selectOption}
                  >
                    {category.name}
                  </option>
                )
              })}
          </select> : null
      }
    </>
  );
};

export default memo(CustomSelect);