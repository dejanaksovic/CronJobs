export function assert(condition: Boolean | undefined, message?: string): void {
  if (!condition) {
    throw Error(message);
  }
}

export async function sendDevEmail(subject: string, content: string) {
  assert(Boolean(process.env.COMM_SERVICE_URL), "URL for mailing service must be given");
  assert(Boolean(process.env.DEV_EMAIL), "Dev address must be given");

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
