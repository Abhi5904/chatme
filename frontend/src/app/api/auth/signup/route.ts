import { AppConfig } from "@/config/appConfig";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req?.json();

    const url = `${AppConfig.API_URL}/api/auth/signup`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const token = response?.headers?.get("authorization");
    const refreshToken = response?.headers
      ?.get("set-cookie")
      ?.split(";")
      ?.find((cookie: string) => cookie.trim().startsWith("refreshToken="))
      ?.split("=")[1];

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from API" },
        {
          status: response.status,
        }
      );
    }

    const result = await response.json();
    if (!result) {
      return NextResponse.json(
        { error: "Failed to fetch data from API" },
        {
          status: response.status,
        }
      );
    }

    (await cookies()).set(AppConfig.ACCESS_TOKEN, JSON.stringify(token), {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    (await cookies()).set(
      AppConfig.USER_STORAGE,
      JSON.stringify(result?.data),
      {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        path: "/",
      }
    );
    (await cookies()).set(
      AppConfig.REFRESH_TOKEN,
      JSON.stringify(refreshToken),
      {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        path: "/",
      }
    );

    return NextResponse.json({ ...result });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
