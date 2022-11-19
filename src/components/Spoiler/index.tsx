import { Dispatch, FC, SetStateAction } from 'react';
import styles from './styles.module.less';

type Props = {
  children: string;
  openModal: Dispatch<SetStateAction<boolean>>;
};

const Spoiler: FC<Props> = ({ children, openModal }) => {

  const handleOpenModal = () => {
    openModal(true);
  };

  return (
    <div
      className={styles.wrapper}
      onClick={handleOpenModal}
    >
      {
        children.length < 43 ?
          children :
          <div className={styles.link}>
            {children.substring(0, 43)}...
          </div>
      }
    </div>
  );
};

export default Spoiler;