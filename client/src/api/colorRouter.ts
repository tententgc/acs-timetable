import axios, { AxiosResponse } from "axios";
import { FETCHALLCOLOR } from "../config/API";

export interface ColorResponse {
  hex_code: string;
  color_meaning: string;
  create_at: Date | string;
  update_at: Date | string;
}

export async function fetchAllColor() {
  const res: AxiosResponse<Array<ColorResponse>> = await axios.get(
    FETCHALLCOLOR,
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    }
  );

  return res.data;
}
