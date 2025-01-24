import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import Header from "./Header";

const Browse = () => {

  const fetchMovieData = async()=>{
    try{
    const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    const data = await res.json();
    console.log(data.results);
    }catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    fetchMovieData();
  },[]);


  return (
    <div>
    <Header/>
    </div>
  )
}

export default Browse;