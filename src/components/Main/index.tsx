import { FC, useState } from 'react';
import { useCategoriesContext } from '../../context/CategoriesContext';
import useGetTodos from '../../hooks/useGetTodos';
import CreateLink from '../CreateLink';
import Form from '../Form';
import { HandleSubmitType } from '../Form/types';
import Loader from '../Loader';
import Modal from '../Modal/Modal';
import Plus from '../svgs/Plus';
import TodoCard from '../TodoCard';
import styles from './styles.module.less';

const Main: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { currentCategory } = useCategoriesContext();
  const { todos, isLoading } = useGetTodos(currentCategory);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.createWrapper}>
          <p className={styles.title}>{currentCategory}</p>
          <button onClick={handleOpenModal} className={styles.button}>
            <Plus />
          </button>
        </div>

        <div className={styles.row}>
          {
            (!isLoading && !!todos)
              ?
              (
                todos.length ?
                  todos.map((todo) => (
                    <TodoCard key={todo.id} todo={todo} />
                  ))
                  : <CreateLink path={currentCategory} handleOnClick={handleOpenModal} />
              )
              : <Loader />
          }
        </div>
      </div>
      {
        isOpen &&
        <Modal onClose={handleCloseModal}>
          <Form handleSubmitType={HandleSubmitType.CREATE} onClose={handleCloseModal} />
        </Modal>
      }
    </>
  );
};

export default Main;