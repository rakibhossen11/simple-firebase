import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
//   console.log(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvidor = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        // console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        // console.log("error", error.message);
      });
  };

  const handleGithubSignIn = () =>{
    signInWithPopup(auth,githubProvidor)
    .then(result =>{
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser);
    })
    .catch(error=>{
        console.log(error);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* user ? logout : signIn */}
      {user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Google login</button>
          <button onClick={handleGithubSignIn}>Github login</button>
        </>
      )}
      {user && (
        <div>
          <h3>User: {user.displayName}</h3>
          <h3>Email: {user.email}</h3>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
