import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "next001",
  apiKey: process.env.API_KEY,
});
