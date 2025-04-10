import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD8aUACMkdIDfBtcVZqAFDlyXmAFApVpZs",
  authDomain: "fadeblack-c190e.firebaseapp.com",
  projectId: "fadeblack-c190e",
  storageBucket: "fadeblack-c190e.firebasestorage.app",
  messagingSenderId: "1011036139129",
  appId: "1:1011036139129:web:834ee4df19eebae9962ea8",
  measurementId: "G-78XGY2S6VN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userList = document.getElementById("userList");
    const usersSnap = await getDocs(collection(db, "users"));
    usersSnap.forEach((docSnap) => {
      const userData = docSnap.data();
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `
        <p><strong>${docSnap.id}</strong> - Premium: ${userData.premium}</p>
        <button onclick="upgradeUser('${docSnap.id}')">Toggle Premium</button>
      `;
      userList.appendChild(userDiv);
    });
  }
});

window.upgradeUser = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  const current = userSnap.data().premium;
  await updateDoc(userRef, { premium: !current });
  alert("Updated premium status");
  location.reload();
};
