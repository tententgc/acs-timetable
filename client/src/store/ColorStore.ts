import { makeAutoObservable } from "mobx";
import { ColorResponse, fetchAllColor } from "../api/colorRouter";

export class ColorStoreImpl {
  theme: Array<ColorResponse> = [];
  adminSelect: Array<ColorResponse> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchColorTheme() {
    const res = await fetchAllColor();
    this.theme = res;
    this.adminSelect = this.theme.filter(
      (item) => item.color_meaning !== "Your Custom"
    );
  }
}

export const ColorStore = new ColorStoreImpl();
