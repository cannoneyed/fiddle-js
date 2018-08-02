export const getKeyColor = (keyIndex: number) => {
  const key = keyIndex % 12;
  let white = true;
  if (key === 1 || key === 3 || key === 6 || key === 8 || key === 10) white = false;
  return white ? '#EEE' : '#444';
};
