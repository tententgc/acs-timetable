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
  { color: "bg-[#FF9494]", title: "Exam" },
  { color: "bg-[#9896FF]", title: "Anounce" },
  { color: "bg-[#ECC5FB]", title: "Homework" },
];

// if have backend delete it
interface WorkItems {
  color: string;
  header: string;
  dayInMonth: number;
  description?: string;
  color_meaning?: string;
}

export const mockData: Array<WorkItems> = [
  {
    color: "bg-[#FF9494]",
    header: "Database",
    dayInMonth: 5,
  },
  {
    color: "bg-[#FF9494]",
    header: "Data Structure",
    dayInMonth: 11,
  },
  {
    color: "bg-[#FF9494]",
    header: "Data Structure",
    dayInMonth: 12,
  },
  {
    color: "bg-[#ECC5FB]",
    header: "OOP Proposal",
    dayInMonth: 2,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio itaque voluptatem dolorem cum delectus quod autem! Tempora quas, repellendus nemo harum enim modi placeat sed ad eveniet perferendis iste velit.",
  },
  {
    color: "bg-[#2cbc63]",
    header: "Study break",
    dayInMonth: 21,
  },
  {
    color: "bg-[#2cbc63]",
    header: "Study break",
    dayInMonth: 17,
  },
  {
    color: "bg-[#2cbc63]",
    header: "Study break",
    dayInMonth: 18,
  },
  {
    color: "bg-[#2cbc63]",
    header: "Study break",
    dayInMonth: 19,
  },
  {
    color: "bg-[#2cbc63]",
    header: "Study break",
    dayInMonth: 20,
    description:
      "Helloworld Helloworld Helloworld Helloworld Helloworld Helloworld",
  },
  {
    color: "bg-[#9896FF]",
    header: "Anounce Anounce",
    dayInMonth: 20,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio itaque voluptatem dolorem cum delectus quod autem! Tempora quas, repellendus nemo harum enim modi placeat sed ad eveniet perferendis iste velit.",
  },
];
