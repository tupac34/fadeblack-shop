import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function logOrder({ userId, name, email, items }) {
  for (const item of items) {
    await addDoc(collection(db, 'orders'), {
      user_id: userId,
      customer_name: name,
      customer_email: email,
      product_name: item.name,
      quantity: item.quantity || 1,
      price: item.price || 0,
      timestamp: serverTimestamp()
    });
  }
}
