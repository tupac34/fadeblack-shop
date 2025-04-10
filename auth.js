import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";

// Firebase Config
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
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Handle login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.loginEmail.value;
    const password = loginForm.loginPassword.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "premium.html";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });
}

// Handle signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signupForm.signupEmail.value;
    const password = signupForm.signupPassword.value;
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), {
        premium: false,
        admin: false
      });
      window.location.href = "premium.html";
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  });
}
await fetch("/.netlify/functions/send-notification", {
    method: "POST",
    body: JSON.stringify({
      type: "signup",
      user: { email }
    }),
  });
  
// Handle premium content gating
onAuthStateChanged(auth, async (user) => {
  const premiumEl = document.getElementById("premiumContent");
  const deniedEl = document.getElementById("accessDenied");

  if (premiumEl || deniedEl) {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const isPremium = userDoc.exists() && userDoc.data().premium;

    if (isPremium) {
      premiumEl && (premiumEl.style.display = "block");
    } else {
      deniedEl && (deniedEl.style.display = "block");
    }
  }
});
await fetch("/.netlify/functions/send-notification", {
    method: "POST",
    body: JSON.stringify({
      type: "order",
      user: { email },
      details: cartItems  // [{ name: "", quantity: 1, price: 299 }]
    }),
  });
  