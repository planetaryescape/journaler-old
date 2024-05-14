const isDev = process.env.NODE_ENV === "development";

export const config = {
  baseUrl: isDev ? "http://localhost:3000" : "https://journaler.me",
};
