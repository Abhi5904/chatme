"use server";
import { GetResponseType } from "@/types/common";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getResponse = (data: GetResponseType, type: "try" | "catch" = "try") => {
  console.log(data?.data, " response data");
  if (type === "try") {
    return {
      success: data?.status === "success",
      title: data?.status || "Unknown",
      message: data?.message || "No message provided",
      statusCode: data?.code || 200, // Default to 200 for success
      data: data?.data ?? null,
    };
  }

  // Handle error case
  return {
    success: false,
    title: "Error",
    message: data?.message || "An error occurred",
    statusCode: data?.code || 500, // Default to 500 if no code is provided
  };
};
export default getResponse;
