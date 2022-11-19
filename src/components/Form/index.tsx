import { FC, useState, FormEvent, useRef, ChangeEvent, useCallback } from 'react';
import dayjs from 'dayjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import useUploadFiles from '../../hooks/useUploadFiles';
import CustomSelect from '../CustomSelect';
import CustomCheckbox from '../CustomCheckbox';
import CustomDatePicker from '../CustomDatePicker';
import styles from './styles.module.less';
import { HandleSubmitType, Todo } from './types';
import { convertToDate } from '../../utils/functions';

type Props = {
  defaultValues?: Todo;
  handleSubmitType: HandleSubmitType;
  onClose: () => void;
};

const Form: FC<Props> = ({ defaultValues, handleSubmitType, onClose }) => {
  const today = dayjs(new Date()).format('YYYY/MM/DD');

  const [header, setHeader] = useState<string>(defaultValues?.header || '');
  const [description, setDescription] = useState<string>(defaultValues?.description || '');
  const [completed, setCompleted] = useState<boolean>(defaultValues?.completed || false);
  const [completionDate, setCompletionDate] = useState<string>(
    convertToDate(defaultValues?.completionDate.valueOf()) || today
  );
  const [category, setCategory] = useState<string>(defaultValues?.category || 'Home');
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleHeaderOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newHeader = event.target.value;
    setHeader(newHeader);
  };

  const handleDescriptionOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  };

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setFile(file[0]);
    }
  };

  const { loadingPercent, url } = useUploadFiles(file);

  const handleCreateTodo = async () => {
    try {
      const newTodo: Omit<Todo, 'id'> = {
        header,
        completed,
        description,
        category,
        completionDate: new Date(completionDate),
        attachments: url,
        createdAt: new Date(),
      };

      const docref = collection(db, 'todo');
      await addDoc(docref, newTodo);
    } catch (error) {
      console.error({ error });
    }
  };

  const handleUpdateTodo = async () => {
    try {
      if (defaultValues) {
        const updateTodo: Omit<Todo, 'id'> = {
          header,
          completed,
          description,
          category,
          completionDate: new Date(completionDate),
          attachments: url,
          updatedAt: new Date(),
        };

        const docref = doc(db, 'todo', defaultValues.id);
        await updateDoc(docref, updateTodo);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!header || !description) return;

    if (handleSubmitType === HandleSubmitType.CREATE) {
      await handleCreateTodo();
    }

    if (handleSubmitType === HandleSubmitType.UPDATE) {
      await handleUpdateTodo();
    }
    setDescription('');
    setHeader('');
    setFile(null);
    onClose();
    formRef.current?.reset();
  };

  const handleIsCompleted = useCallback(() => {
    setCompleted(!completed)
  }, [completed]);

  return (
    <>
      <h3 className={styles.title}>
        {handleSubmitType === HandleSubmitType.UPDATE ? 'Обновить Todo' : 'Создать Todo'}
      </h3>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.selectContainer}>
          <CustomCheckbox completed={completed} toggle={handleIsCompleted} />
          <CustomDatePicker date={completionDate} setDate={setCompletionDate} />
          <CustomSelect setCategory={setCategory} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor='header' className={styles.label}>Загаловок</label>
          <input
            placeholder='Загаловок'
            type='text'
            id='header'
            className={styles.input}
            value={header}
            onChange={handleHeaderOnChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor='description' className={styles.label}>Описание</label>
          <textarea
            placeholder='Описание'
            id='description'
            className={styles.textarea}
            cols={30}
            rows={10}
            value={description}
            onChange={handleDescriptionOnChange}
          ></textarea>
        </div>

        <div className={styles.fileUploadContainer}>
          <label htmlFor="file" className={styles.customFileUpload}>
            Выберите файл
          </label>
          <input id="file" type="file" onChange={handleUploadFile} />

          {file ? <p className={styles.fileTitle}>Файл: <span>{file.name}</span></p> : null}
          {
            (defaultValues?.attachments && !file) ?
              <p className={styles.fileTitle}>
                Файл: <a href={defaultValues?.attachments} target='_blank' rel="noreferrer">Посмотреть</a>
              </p> : null
          }
        </div>

        <div className={styles.buttonContainer}>
          <button
            type='submit'
            className={styles.button}
            disabled={loadingPercent !== null && loadingPercent < 100}
          >
            {handleSubmitType === HandleSubmitType.UPDATE ? 'Сохранить' : 'Создать'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;