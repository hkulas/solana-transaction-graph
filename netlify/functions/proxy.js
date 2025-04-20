import fetch from "node-fetch";

export async function handler(event) {
  const RPC_URL = process.env.QUICKNODE_URL;
  if (!RPC_URL) {
    return { statusCode: 500, body: "Missing QUICKNODE_URL" };
  }

  const { method, params } = JSON.parse(event.body);
  const resp = await fetch(RPC_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ jsonrpc:"2.0", id:1, method, params })
  });
  const text = await resp.text();
  return {
    statusCode: resp.status,
    headers:    { "Content-Type": "application/json" },
    body:       text
  };
}
