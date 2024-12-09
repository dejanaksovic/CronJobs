import * as dotenv from "dotenv";
import * as fs from "fs";
dotenv.config();

test("Check for nessecarry .env values", () => {
  expect(Boolean(process.env.SERVICE_URL)).toEqual(true);
  expect(Boolean(process.env.COMM_SERVICE_URL)).toEqual(true);
  expect(Boolean(process.env.COMM_SERVICE_KEY)).toEqual(true);
  expect(Boolean(process.env.DEV_EMAIL)).toEqual(true);
  expect(Boolean(process.env.DEV_KEY)).toEqual(true);
})

test("Check if backup folder is create", () => {
  expect(fs.existsSync("./build/backups")).toEqual(true);
})

