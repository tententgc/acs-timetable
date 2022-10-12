import axios, { AxiosResponse } from "axios";
import { ADDLOCALEVENT } from "../config/API";
import { getAcessToken } from "../helper/getToken";

export interface Color {
  hex_code: string;
  color_meaning: string;
  create_at: string;
  update_at: string;
}

export interface EventType {
  event_id: string;
  header: string;
  description: string;
  event_date: string;
  time_range?: any;
  create_at: string;
  update_at: string;
  color: Color;
  message?: string;
}

export interface EventResponse {
  data: EventType[];
  status: number;
}

export interface formDataType {
  header: string;
  description?: string;
  time_range?: string;
  event_date: string;
}

// if admin post get
export async function getEventData(pathVarible: string) {
  const token = getAcessToken();

  const res: AxiosResponse<EventResponse> = await axios.get(
    `http://localhost:8000/api/event/get/${pathVarible}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {},
    }
  );

  return res.data.data;
}

export async function addLocalEvent(data: formDataType) {
  const token = getAcessToken();

  const res: AxiosResponse = await axios.post(ADDLOCALEVENT, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function deleteEvent(id: string) {
  const token = getAcessToken();
  const res: AxiosResponse = await axios.delete(
    `http://localhost:8000/api/event/add/delete/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.status;
}
