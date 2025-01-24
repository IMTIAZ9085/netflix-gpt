import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store)=>store.user);
  
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
    
    }).catch((error) => {
      navigate("/error")
    });
    
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
         dispatch(addUser({uid:uid,email:user.email,displayName:user.displayName,photoURL:user.photoURL}));
         navigate("/browse");
        } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return ()=> unsubscribe();
  },[]);

  return (
    <div className="absolute w-screen py-2 px-8 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO_URL} alt="logo" />
     {user && 
     <div className="flex p-3">
      <img className="w-12 h-12 rounded-xl" src={user?.photoURL} alt="userIcon" />
      <button onClick={handleSignOut} className="font-bold text-white bg-red-700 rounded-lg p-2 mx-2">Sign Out</button>
     </div>
     }
    </div>
  ) 
}

export default Header;