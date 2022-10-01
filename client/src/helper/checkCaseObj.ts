export const checkCaseObj = (data: any): boolean => {
  return Object.values(data).some((value) => !value);
};
