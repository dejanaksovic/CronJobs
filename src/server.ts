import * as http from "http";
import dotenv from "dotenv";
import { checkServerUp, doBackup } from "./Jobs.ts/serverCheckup";
import scheduler from "node-schedule";
import { saveToBackupFolder } from "./Utils/Utils";

dotenv.config();

saveToBackupFolder("test", JSON.stringify({ message: "Just testing lmao" }));

const scheduleServiceHealtyCheck = scheduler.scheduleJob("*/15 * * * *", checkServerUp);
const sceduleDailyBackup = scheduler.scheduleJob("59 11 * * *", doBackup);

http
  .createServer((req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write("Default works");
    res.end();
  })
  .listen(8080);
