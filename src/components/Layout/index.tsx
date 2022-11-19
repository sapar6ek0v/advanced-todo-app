import { FC, ReactNode } from 'react';
import styles from './styles.module.less'

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>{children}</div>
  );
};

export default Layout;