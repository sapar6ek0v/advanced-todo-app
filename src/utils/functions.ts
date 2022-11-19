import dayjs from 'dayjs';

export const convertToDate = (time: string | number | undefined | Object, format = 'MMM D') => {
  if (!time) return;
  return dayjs.unix(Number(time)).format(format);
};
