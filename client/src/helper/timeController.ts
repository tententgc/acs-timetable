import { dateList } from "../config/data";

export function strDay2Num(s: string) {
  return dateList.findIndex(
    (item) => item.toLocaleLowerCase() === s.toLocaleLowerCase()
  );
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).toString().slice(0, 3);
}
