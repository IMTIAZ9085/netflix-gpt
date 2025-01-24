import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
         dispatch(addUser({uid:uid,email:user.email,displayName:user.displayName,photoURL:user.photoURL}));
         navigate("/browse");
        } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  },[]);

  return (
    <div className="absolute w-screen py-2 px-8 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
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