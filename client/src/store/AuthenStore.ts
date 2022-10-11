import { configure, makeAutoObservable } from "mobx";

configure({
  enforceActions: "never",
});
export class AuthenStoreImpl {
  isOpenModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export const AuthenStore = new AuthenStoreImpl();
