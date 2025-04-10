const fetch = require("node-fetch");
exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const res = await fetch("https://api.printful.com/orders", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.PRINTFUL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
