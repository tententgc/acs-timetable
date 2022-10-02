import { observable, makeObservable, action, configure } from "mobx";
import { mockData } from "../config/data";

interface WorkItems {
  color: string;
  title: string;
  dayInMonth: number;
}

configure({
  enforceActions: "never",
});
export class CalendarStoreImpl {
  public modalOpen = false;
  public modalData: Array<WorkItems> = [];
  public colorFilter: Array<string> = [];
  public workAll: Array<WorkItems> = [];
  public currMonth: number = 0;
  public currYear: number = 0;

  public workDayInMonth: Array<Array<WorkItems>> = [[]];
  public workDayFilter: Array<Array<WorkItems>> = [[]];

  public async setWorkAll() {
    setTimeout(() => {
      this.workAll = mockData;

      for (let i = 0; i < 31; i++) {
        this.workDayInMonth.push([]);
      }

      this.workAll.forEach((item) => {
        this.workDayInMonth[item.dayInMonth].push(item);
      });

      this.workDayFilter = this.workDayInMonth;
    }, 1000);
  }

  constructor() {
    makeObservable(this, {
      modalData: observable,
      modalOpen: observable,
      workAll: observable,
      colorFilter: observable,
      workDayFilter: observable,
      currMonth: observable,
      currYear: observable,
      changeColorFilter: action,
    });
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

  public checkWorkDay(n: number) {
    return this.workDayInMonth[n];
  }
}

export const CalendarStore = new CalendarStoreImpl();
