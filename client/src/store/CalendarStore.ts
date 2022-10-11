import { makeAutoObservable, configure } from "mobx";
import { mockData } from "../config/data";

interface WorkItems {
  color: string;
  header: string;
  dayInMonth: number;
  description?: string;
}

configure({
  enforceActions: "never",
});
export class CalendarStoreImpl {
  public modalOpen: boolean = false;
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

      this.workAll.forEach((item) => {
        this.workDayInMonth[item.dayInMonth].push(item);
      });

      this.workDayFilter = this.workDayInMonth;
    }, 200);
  }

  Init() {
    for (let i = 0; i < 31; i++) {
      this.workDayInMonth.push([]);
      this.workDayFilter.push([]);
    }
  }

  constructor() {
    makeAutoObservable(this);
    this.Init();
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

  public checkWorkDay(n: number) {
    return this.workDayFilter[n];
  }
}

export const CalendarStore = new CalendarStoreImpl();
