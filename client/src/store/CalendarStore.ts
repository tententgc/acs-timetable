import { observable, makeObservable } from "mobx";

interface WorkItems {
  color: string;
  title: string;
}

export class CalendarStoreImpl {
  public modalTitle: string = "";
  public modalOpen = false;
  public colorFilter = "";
  public workAll: Array<WorkItems> = [
    {
      color: "bg-[#94FFAC]",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      color: "bg-[#575454]",
      title: "test 2",
    },
  ];

  public workFilter = this.workAll;

  constructor() {
    makeObservable(this, {
      modalTitle: observable,
      modalOpen: observable,
      workAll: observable,
      workFilter: observable,
    });
  }

  public changeColorFilter(value: string, n: string) {
    if (n === "reset filter") {
      this.workFilter = this.workAll;
    } else {
      this.workFilter = this.workAll.filter((item) => item.color === value);
    }
  }
}

export const CalendarStore = new CalendarStoreImpl();
