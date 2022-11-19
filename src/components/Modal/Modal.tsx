import { FC, ReactNode } from 'react';
import styles from './styles.module.less';

type Props = {
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<Props> = ({ onClose, children }) => {
  return (
    <div onClick={onClose} className={styles.wrapper}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalCard}>
        {children}
      </div>
    </div>
  );
};

export default Modal;