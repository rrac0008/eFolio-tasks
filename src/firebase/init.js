import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDWWpOHK_8cHgXgWbcOk_mzZe4CHmuj9ZQ",
  authDomain: "week7-rachit.firebaseapp.com",
  projectId: "week7-rachit",
  storageBucket: "week7-rachit.firebasestorage.app",
  messagingSenderId: "1081023546844",
  appId: "1:1081023546844:web:5963a704c9890d91ef3b19"
}

const app = initializeApp(firebaseConfig)


const db = getFirestore(app)

export { db }
