import { observable, makeObservable, action, configure } from "mobx";

interface WorkItems {
  color: string;
  title: string;
  dayInMonth: number;
}

configure({
  enforceActions: "never",
});
export class CalendarStoreImpl {
  public modalTitle: string = "";
  public modalOpen = false;
  public colorFilter: Array<string> = [];
  public workAll: Array<WorkItems> = [
    {
      color: "bg-[#2cbc63]",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      dayInMonth: 4,
    },
    {
      color: "bg-[#575454]",
      title: "test 2",
      dayInMonth: 5,
    },
  ];

  public workDayInMonth: Array<Array<WorkItems>> = [[]];
  public workDayFilter: Array<Array<WorkItems>> = [[]];

  public setWorkDay() {
    for (let i = 0; i < 31; i++) {
      this.workDayInMonth.push([]);
    }

    this.workAll.forEach((item) => {
      this.workDayInMonth[item.dayInMonth].push(item);
    });

    this.workDayFilter = this.workDayInMonth;
  }

  constructor() {
    makeObservable(this, {
      modalTitle: observable,
      modalOpen: observable,
      workAll: observable,
      colorFilter: observable,
      workDayFilter: observable,
      changeColorFilter: action,
    });

    this.setWorkDay();
  }

  public changeColorFilter(value: string, n: string) {
    if (n === "reset filter") {
      this.colorFilter = [];
      this.workDayFilter = this.workDayInMonth;
      return;
    }
    if (this.colorFilter.includes(value)) {
      this.colorFilter = this.colorFilter.filter((item) => item !== value);
      if (this.colorFilter.length === 0) {
        this.workDayFilter = this.workDayInMonth;
        return;
      }
    } else {
      this.colorFilter.push(value);
    }

    this.workDayFilter = this.workDayInMonth.map((item) => {
      return item
        ? item.filter((itemIn) => this.colorFilter.includes(itemIn.color))
        : [];
    });
  }

  public closeModal() {
    this.modalOpen = false;
  }
}

export const CalendarStore = new CalendarStoreImpl();
