export const moveArrayItem = <T>(arr: T[], from: number, to: number): T[] => {
  const copy = [...arr];
  [copy[from], copy[to]] = [copy[to], copy[from]];
  return copy;
};
