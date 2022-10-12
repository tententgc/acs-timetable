import { EventType } from "../api/eventRouter";

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
  { color: "#2cbc63", title: "Study break" },
  { color: "#FF9494", title: "Exam" },
  { color: "#9896FF", title: "Anounce" },
  { color: "#ECC5FB", title: "Homework" },
];

export const mockData: Array<EventType> = [
  {
    event_id: "dedbcb58-180a-47be-a47f-75366acf746e",
    header: "Stydy Break",
    description: "",
    event_date: "2022-10-18T11:39:14.71213",
    time_range: null,
    create_at: "2022-10-11T20:31:59.871669",
    update_at: "2022-10-11T20:31:59.871679",
    color: {
      hex_code: "2cbc63",
      color_meaning: "break day",
      create_at: "2022-10-11T20:18:23.021023",
      update_at: "2022-10-11T21:18:04.190091",
    },
  },
  {
    event_id: "de0b09eb-677d-4309-bd27-d1825fa760b5",
    header: "Stydy Break",
    description: "",
    event_date: "2022-10-19T11:39:14.71213",
    time_range: null,
    create_at: "2022-10-11T20:31:59.872623",
    update_at: "2022-10-11T20:31:59.872631",
    color: {
      hex_code: "2cbc63",
      color_meaning: "break day",
      create_at: "2022-10-11T20:18:23.021023",
      update_at: "2022-10-11T21:18:04.190091",
    },
  },
  {
    event_id: "0c496da1-a3b8-4f16-87f3-e3ca2281e25f",
    header: "Stydy Break",
    description: "",
    event_date: "2022-10-20T11:39:14.71213",
    time_range: null,
    create_at: "2022-10-11T20:31:59.873225",
    update_at: "2022-10-11T20:31:59.873237",
    color: {
      hex_code: "2cbc63",
      color_meaning: "break day",
      create_at: "2022-10-11T20:18:23.021023",
      update_at: "2022-10-11T21:18:04.190091",
    },
  },
  {
    event_id: "3c75dc86-35e7-49ac-95e3-436e3186a1cd",
    header: "Stydy Break",
    description: "",
    event_date: "2022-10-21T11:39:14.71213",
    time_range: null,
    create_at: "2022-10-11T20:31:59.874553",
    update_at: "2022-10-11T20:31:59.874569",
    color: {
      hex_code: "2cbc63",
      color_meaning: "break day",
      create_at: "2022-10-11T20:18:23.021023",
      update_at: "2022-10-11T21:18:04.190091",
    },
  },
  {
    event_id: "0207ccf8-21a5-4011-a761-1d2f55a3a0e9",
    header: "Stydy Break",
    description: "",
    event_date: "2022-10-21T11:39:14.71213",
    time_range: null,
    create_at: "2022-10-11T20:31:59.875733",
    update_at: "2022-10-11T20:31:59.875743",
    color: {
      hex_code: "2cbc63",
      color_meaning: "break day",
      create_at: "2022-10-11T20:18:23.021023",
      update_at: "2022-10-11T21:18:04.190091",
    },
  },
  {
    event_id: "2a550e39-7865-4d19-af63-0192f6736a1c",
    header: "Midterm database system",
    description: "",
    event_date: "2022-10-5T11:39:14.71213",
    time_range: null,
    create_at: "2022-10-11T20:31:59.876919",
    update_at: "2022-10-11T20:31:59.87696",
    color: {
      hex_code: "FF9494",
      color_meaning: "Exam",
      create_at: "2022-10-11T20:18:23.027676",
      update_at: "2022-10-11T20:18:23.027696",
    },
  },
  {
    event_id: "39b59b30-5d69-40cd-929a-df96af434fb1",
    header: "Midterm data structure",
    description: "",
    event_date: "2022-10-10T11:39:14.71213",
    time_range: null,
    create_at: "2022-10-11T20:31:59.877729",
    update_at: "2022-10-11T20:31:59.877804",
    color: {
      hex_code: "FF9494",
      color_meaning: "Exam",
      create_at: "2022-10-11T20:18:23.027676",
      update_at: "2022-10-11T20:18:23.027696",
    },
  },
  {
    event_id: "a1def7be-05a8-4cfa-9d59-12ef6ad5cc4f",
    header: "Test Anouncement",
    description: "",
    event_date: "2022-10-1T11:39:14.71213",
    time_range: null,
    create_at: "2022-10-11T20:31:59.878247",
    update_at: "2022-10-11T20:31:59.878256",
    color: {
      hex_code: "9896FF",
      color_meaning: "Anounce",
      create_at: "2022-10-11T20:18:23.028399",
      update_at: "2022-10-11T20:18:23.028409",
    },
  },
];
