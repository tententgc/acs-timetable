import { makeAutoObservable, configure } from "mobx";
import { EventType, getEventData } from "../api/eventRouter";

configure({
  enforceActions: "never",
});
export class CalendarStoreImpl {
  public modalOpen: boolean = false;
  public modalData: Array<EventType> = [];
  public colorFilter: Array<string> = [];
  public workAll: Array<EventType> | null = null;
  public currMonth: number = new Date().getMonth();
  public currYear: number = new Date().getFullYear();

  public workDayInMonth: Array<Array<EventType>> = [[]];
  public workDayFilter: Array<Array<EventType>> = [[]];

  Init() {
    this.workDayInMonth = [[]];
    this.workDayFilter = [[]];

    for (let i = 0; i < 31; i++) {
      this.workDayInMonth.push([]);
      this.workDayFilter.push([]);
    }
  }

  constructor() {
    makeAutoObservable(this);
    this.Init();
  }

  public async setWorkAll(data: string) {
    this.Init();
    const res = await getEventData(data);

    this.workAll = res;

    this.workAll.forEach((item) => {
      this.workDayInMonth[new Date(item.event_date).getDate()].push(item);
    });

    this.workDayFilter = this.workDayInMonth;
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
        ? item.filter((itemIn) =>
            this.colorFilter.includes(itemIn.color.hex_code)
          )
        : [];
    });
  }

  public checkWorkDay(n: number) {
    return this.workDayFilter[n];
  }
}

export const CalendarStore = new CalendarStoreImpl();
