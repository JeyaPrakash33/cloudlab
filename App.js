import React, { useState } from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert(" User created: " + userCredential.user.email);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert(" Logged in as: " + userCredential.user.email);
    } catch (error) {
      alert(error.message);
    }
  };

  const addUserData = async () => {
    try {
      await addDoc(collection(db, "users"), { email, createdAt: new Date() });
      alert(" User data added to Firestore!");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    setUsers(snapshot.docs.map((doc) => doc.data()));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1> Firebase React Integration</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={addUserData}>Add User Data</button>
      <button onClick={fetchUsers}>Fetch Users</button>

      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;


//npx create-react-app myapp
//cd myapp
//npm install firebase
//after copying firebase.js
//import {getAuth} from "firebase/auth"
//import {getFirestore} from "firebase/firestore"
//export const auth=getAuth(app)
//export const db=getFirestore(app)
//firebase login
//npm install -g firebase-tools
//npm start
//firebase init
//npm run build
//firebase deploy
