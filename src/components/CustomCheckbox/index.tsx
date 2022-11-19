import { FC, memo } from 'react';
import './styles.less'

type Props = {
  completed: boolean;
  toggle: () => void;
  disabled?: boolean;
};

const CustomCheckbox: FC<Props> = ({ completed, toggle, disabled }) => {

  return (
    <label htmlFor='completed'>
      <input
        type="checkbox"
        id='completed'
        defaultChecked={completed}
        onChange={toggle}
        disabled={disabled}
      />
    </label>
  );
};

export default memo(CustomCheckbox);