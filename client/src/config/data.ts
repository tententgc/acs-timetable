export const monthList: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "october",
  "november",
  "december",
];

export const dateList: Array<string> = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];

interface ColorItems {
  color: string;
  title: string;
}

export const ColorThemeTitle: Array<ColorItems> = [
  { color: "bg-[#2cbc63]", title: "Study break" },
  { color: "bg-[#FF9494]", title: "Test" },
  { color: "bg-[#9896FF]", title: "Anounce" },
  { color: "bg-[#ECC5FB]", title: "Homework" },
];

// if have backend delete it
interface WorkItems {
  color: string;
  title: string;
  dayInMonth: number;
}

export const mockData: Array<WorkItems> = [
  {
    color: "bg-[#FF9494]",
    title: "Database",
    dayInMonth: 5,
  },
  {
    color: "bg-[#FF9494]",
    title: "Data Structure",
    dayInMonth: 11,
  },
  {
    color: "bg-[#FF9494]",
    title: "Data Structure",
    dayInMonth: 12,
  },
  {
    color: "bg-[#ECC5FB]",
    title: "OOP Proposal",
    dayInMonth: 2,
  },
  {
    color: "bg-[#2cbc63]",
    title: "Study break",
    dayInMonth: 21,
  },
  {
    color: "bg-[#2cbc63]",
    title: "Study break",
    dayInMonth: 17,
  },
  {
    color: "bg-[#2cbc63]",
    title: "Study break",
    dayInMonth: 18,
  },
  {
    color: "bg-[#2cbc63]",
    title: "Study break",
    dayInMonth: 19,
  },
  {
    color: "bg-[#2cbc63]",
    title: "Study break",
    dayInMonth: 20,
  },
];
