const fetch = require("node-fetch");
exports.handler = async () => {
  const res = await fetch("https://api.printful.com/store/products", {
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
    },
  });
  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};