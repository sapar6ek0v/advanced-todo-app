import { FC } from 'react';
import styles from './styles.module.less';

type Props = {
  path: string;
  handleOnClick: () => void;
};

const CreateLink: FC<Props> = ({ path, handleOnClick }) => {
  return (
    <div className={styles.createTitle}>
      У вас еще нету <strong>Todo</strong> на
      категорию <strong>{path}</strong>.&nbsp;
      <strong className={styles.createLink} onClick={handleOnClick}>Создать?</strong>
    </div>
  );
};

export default CreateLink;