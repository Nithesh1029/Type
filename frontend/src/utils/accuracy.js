export const Accuracy = (correctChara, total) => {
  if (total === 0) return 0;

  return Math.round((correctChara / total) * 100);
};