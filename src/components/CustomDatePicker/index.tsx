import { Dispatch, FC, useState, memo, SetStateAction } from 'react';
import { Datepicker } from 'bear-react-datepicker';
import styles from './styles.module.less';

type Props = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};

const CustomDatePicker: FC<Props> = ({ date, setDate }) => {
  const [focus, setFocus] = useState<boolean>(false);

  const handleSetDate = (time: string) => {
    setDate(time);
    setFocus(false);
  };

  return (
    <div className={styles.wrapper}>
      <input
        onFocus={() => setFocus(true)}
        className={styles.input}
        value={date}
        readOnly
      />
      {
        focus ?
          <Datepicker
            value={date}
            onChange={handleSetDate}
            isVisibleSetToday
            locale='ru-RU'
            format='YYYY/MM/DD'
            className={styles.datePicker}
          /> : null
      }
    </div>
  );
};

export default memo(CustomDatePicker);