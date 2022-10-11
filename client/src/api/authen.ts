import axios, { AxiosResponse } from "axios";

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

interface SignInProps {
  username: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  data?: {
    user_id: string;
    email: string;
    username: string;
    password: string;
    role: string;
    create_at: Date;
    update_at: Date;
  };
  status: number;
  error?: string;
}

interface SignInResponse {
  data?: {
    user_id: string;
    email: string;
    username: string;
    password: string;
    role: string;
    create_at: Date;
    update_at: Date;
  };
  status: number;
  error?: string;
  token?: string;
}

export async function SignUp(data: SignUpProps) {
  const res: AxiosResponse<SignUpResponse> = await axios.post(
    "http://localhost:8000/api/auth/signup",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.status;
}

export async function SignIn(data: Omit<SignInProps, "username">) {
  const res: AxiosResponse<SignInResponse> = await axios.post(
    "http://localhost:8000/api/auth/signin",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.data.status === 200 && res.data.token) {
    localStorage.setItem("USERDETAIL", res.data.token);
  }
  return res.data.status;
}
