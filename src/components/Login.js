import { useState,useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm,setIsSignInForm] = useState(true);
  const [error,setError] = useState(null);
   
   const name = useRef(null);
   const email = useRef(null);
   const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  

  const handleButtonClick = () => {
    const response = checkValidData(email.current.value, password.current.value);
    setError(response);
    if(response) return;

    if(!isSignInForm){
      createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, 
      photoURL: "https://dk2dv4ezy246u.cloudfront.net/widgets/sSYVla14U5v6_large.jpg"
    }).then(() => {
      const {uid,email,displayName,photoURL} = auth.currentUser;
      dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
    }).catch((error) => {
      setError(error.message);
    });
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorCode +" "+ errorMessage);
  
  });
    }else{
    
      signInWithEmailAndPassword(auth,email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed In 
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode +" "+ errorMessage);
      
      });
    }

  };
  
  return (
    <div>
      <Header/>
      <div className="absolute">
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_large.jpg" alt="login_body" />
      </div>

      {/* --------Sign In Form-------------------------------- */}

      <form onSubmit={(e) => e.preventDefault()} className="w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
      <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
     {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-3 my-3 w-full bg-gray-700" /> }
      <input ref={email} type="email" placeholder="Email Address" className="p-3 my-3 w-full bg-gray-700 rounded-md" />
      <input ref={password} type="password" placeholder="Password" className="p-3 my-2 w-full bg-gray-700 rounded-md" />
      <p className="p-3 my-3 w-full text-red-500">{error}</p>
      <button className="bg-red-700 p-4 my-1 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
     {isSignInForm ? <p className="my-4">New to Netflix? <span className="cursor-pointer font-bold text-red-700" onClick={toggleSignInForm}>Sign Up</span></p>
      : <p className="my-4">Already Registered? <span className="cursor-pointer font-bold text-red-700" onClick={toggleSignInForm}>Sign In</span></p>
     }</form>

    </div>
  )
}

export default Login;