import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const userSnap = await getDoc(doc(db, 'users', userCred.user.uid));
      const userData = userSnap.data();
      alert('Logged in!');
      if (userData && userData.admin === true) {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'premium.html';
      }
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCred.user.uid), { email, premium: false });
      alert('Signed up!');
      window.location.href = 'premium.html';
    } catch (err) {
      alert('Signup failed: ' + err.message);
    }
  });
}
