import { configure, makeAutoObservable } from "mobx";
import { VerifyToken } from "../api/authen";

configure({
  enforceActions: "never",
});
export class AuthenStoreImpl {
  isOpenModal: boolean = false;
  user_status: number = 0;
  username: string = "";
  role: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  public async verifyToken() {
    const res = await VerifyToken();
    this.user_status = res.status;
    this.username = res.username;
    if (res.role) {
      this.role = res.role;
    }
    return res;
  }
}

export const AuthenStore = new AuthenStoreImpl();
