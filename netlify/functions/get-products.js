// netlify/functions/get-products.js

const fetch = require('node-fetch');

exports.handler = async function () {
  const apiKey = process.env.PRINTFUL_API_KEY;
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const json = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(json.result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch from Printful API' }),
    };
  }
};
