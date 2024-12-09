import * as fs from "fs";

export function assert(condition: Boolean | undefined, message?: string): void {
  if (!condition) {
    throw Error(message);
  }
}

export async function sendDevEmail(subject: string, content: string) {
  try {
    const res: Response = await fetch(`${process.env.COMM_SERVICE_URL}/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `X-API-KEY ${process.env.COMM_SERVICE_KEY}`,
      },
      body: JSON.stringify({
        title: subject,
        content,
        addresses: [process.env.DEV_EMAIL],
      }),
    });

    const data = await res.json();
  } catch (err: any) {
    console.log("Mail service not working");
  }
}

export async function saveToBackupFolder(filename: string, data: string) {
  let path:string = `./build/backups/${filename}.json`;

  try {
    fs.writeFileSync(path, data);
    console.log("writing to file");
  }
  catch(err: any) {
    console.log(err);
  }
}
