const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const RPC_URL = process.env.QUICKNODE_URL;
  if (!RPC_URL) {
    return { statusCode: 500, body: "Missing QUICKNODE_URL env var" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { method, params } = body;
  try {
    const resp = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
    });
    const text = await resp.text();
    return {
      statusCode: resp.status,
      headers: { "Content-Type": "application/json" },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: `Proxy error: ${err.message}`
    };
  }
};
