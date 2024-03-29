// import logo from './logo.svg';

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./firebase/firebase.initialize";

initializeAuthentication();
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});

  const handleGoggleSignin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user
        const loggedInUser = {
          name: displayName,
          email: email,
          image: photoURL
        }
        setUser(loggedInUser)
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const loginUser = result.user;
      console.log(loginUser);
      // ...
      })
      .catch(error => {
      console.log(error.message);
    })
  };
  return (
    <div className="App">
      <h1>React Firebase Simple Auth</h1>
      <button onClick={handleGoggleSignin}> Signin with google</button>
      <br />
      {user.email && <div>
        <h2>Welcome {user.name}</h2>
        <h3>{user.email}</h3>
        <img src={user.image} alt="" />
      </div> }
    </div>
  );
}

export default App;
