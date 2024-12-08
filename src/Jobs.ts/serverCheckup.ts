import { saveToBackupFolder, sendDevEmail } from "../Utils/Utils";

export async function checkServerUp() {
  try {
    const res: Response = await fetch(`${process.env.SERVICE_URL}`);
    if (!res.ok) {
      sendDevEmail("API SERVICE FAILED", `Api service failed at ${new Date()}`);
    }
    console.log("Server is up");
  } catch (err: any) {
    sendDevEmail("API SERVICE FAILED", `Api service failed at ${new Date()}\n${err?.message}`);
    console.log("Server down, sending email");
  }
}

export async function doBackup() {
  try {
    const res: Response = await fetch(`${process.env.SERVICE_URL}/transactions/daily`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${process.env.DEV_KEY}`,
      },
    });

    const data = await res.json();

    const date:Date = new Date();
    const dateReadableFormat: string = `${date.getMonth()}.${date.getDate() + 1}.${date.getFullYear()}`;

    saveToBackupFolder(dateReadableFormat, JSON.stringify(data.res));
  }
  catch (err: any) {
    console.log(err);
    sendDevEmail("MAILING SERVICE FAILED", `Email service failed ${err.message}`);
  }
}
