import { checkServerUp } from "./serverCheckup"; 
import * as dotenv from "dotenv";

dotenv.config();

test("Check ping server", async () => {
  const res = await checkServerUp();
  
  expect(res).toBeTruthy();
})