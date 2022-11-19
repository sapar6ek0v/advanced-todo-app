import { FC, useMemo, useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import { convertToDate } from '../../utils/functions';
import { db } from '../../utils/firebaseConfig';
import Trash from '../svgs/Trash';
import CustomCheckbox from '../CustomCheckbox';
import Modal from '../Modal/Modal';
import { HandleSubmitType, TodoReturnType, Todo } from '../Form/types';
import Form from '../Form';
import styles from './styles.module.less';
import Spoiler from '../Spoiler';

type Props = {
  todo: TodoReturnType;
};

const TodoCard: FC<Props> = ({ todo }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(todo.completed);

  const todoDate = dayjs.unix(todo.completionDate.seconds).toDate().getTime();
  const today = new Date().getTime();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const defaultValues = useMemo(() => {
    if (todo) {
      const defaultTodo: Todo = {
        id: todo.id,
        header: todo.header,
        description: todo.description,
        completionDate: todo.completionDate,
        category: todo.category,
        attachments: todo.attachments,
        completed: todo.completed
      };
      return defaultTodo;
    }
  }, [todo])

  const handleIsCompleted = async () => {
    setCompleted(!completed);
    try {
      const updateTodo = { completed };
      const docref = doc(db, 'todo', todo.id);
      const d = await updateDoc(docref, updateTodo);
      console.log({ d })
    } catch (error) {
      console.error({ error });
    }
  };

  const handleDelete = async () => {
    try {
      const docref = doc(db, 'todo', todo.id);
      await deleteDoc(docref);
    } catch (error) {
      console.error({ error });
    }
  };

  const isTodoDatePassed = todoDate >= today ? `${styles.datePassed} ${styles.wrapper}` : styles.wrapper;
  const isBtnDisabled =
    todoDate >= today ? `${styles.dateBtnPassed} ${styles.dateButton}` : styles.dateButton;

  return (
    <>
      <div onClick={handleOpenModal} className={isTodoDatePassed}>
        <div className={styles.header} onClick={(e) => e.stopPropagation()}>
          <CustomCheckbox completed={completed} toggle={handleIsCompleted} disabled={todoDate >= today} />
          <div className={styles.headerTitle}>
            {
              todo.header.length < 10
                ? todo.header
                : `${todo.header.substring(0, 12)}...`
            }
          </div>
        </div>
        <Spoiler openModal={handleOpenModal}>
          {todo.description}
        </Spoiler>
        <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
          <button className={isBtnDisabled}>
            {convertToDate(todo.completionDate.valueOf())}
          </button>
          <button className={styles.button} onClick={handleDelete}>
            <Trash />
          </button>
        </div>
      </div>

      {isOpen &&
        <Modal onClose={handleCloseModal}>
          <Form
            handleSubmitType={HandleSubmitType.UPDATE}
            defaultValues={defaultValues}
            onClose={handleCloseModal}
          />
        </Modal>
      }
    </>
  );
};

export default TodoCard;