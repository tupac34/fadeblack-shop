const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fetch = require("node-fetch");

let app, db;
if (!app) {
  app = initializeApp({ credential: applicationDefault() });
  db = getFirestore();
}

exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body);
    const { orderID, brand, product_name, quantity, price, customer } = body;

    const storeSnap = await db.collection("stores").where("name", "==", brand).get();
    if (storeSnap.empty) {
      return { statusCode: 404, body: JSON.stringify({ error: "Store not found" }) };
    }

    const storeData = storeSnap.docs[0].data();
    const printfulApiKey = storeData.printful_api;

    // Save order in Firestore
    await db.collection("orders").add({
      order_id: orderID,
      brand,
      customer_name: customer.name,
      customer_email: customer.email,
      product: product_name,
      quantity,
      price,
      createdAt: new Date()
    });

    // Trigger fulfillment via Printful API
    const response = await fetch("https://api.printful.com/orders", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${printfulApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipient: {
          name: customer.name,
          email: customer.email,
          address1: customer.address,
          city: customer.city,
          country_code: "US",
          zip: customer.zip
        },
        items: [{
          quantity,
          variant_id: customer.variant_id // You must pass this
        }]
      })
    });

    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, printful: result })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
