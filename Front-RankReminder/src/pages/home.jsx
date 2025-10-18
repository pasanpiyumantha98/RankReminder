import Header from "../components/header";
import {  useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UrlListWithRanks from "../components/urlListWithRanks";

function Home() {



  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");   
  const [rank,setRank] = useState("1");
  const[title,setTitle] = useState("My Website");
  const[site,setSite] = useState("www.mywebsite.com");
  const [uname, setUname] = useState(localStorage.getItem('username') || '');
  const [tier, setTier] = useState(localStorage.getItem('tier') || 'free');
  const [uid, setUid] = useState(localStorage.getItem('uid') || '');

    const {data,isFetching,refetch} = useQuery({
        queryKey:['RankCheckManual', { url:url, query:query, location:location }],
        queryFn: async () => {
          const res = await axios.post('http://localhost:3000/api/url/rank/check/manual', {url:url, query:query, location:location});
          return res.data;},
          enabled: false


      });

  

  async function rankCheckManual(e){

      e.preventDefault();

    if(url === "" || query === "" || location === ""){
      toast.error("Please fill all the fields");
      return;
    } else{

  const { data: fresh } = await refetch();   // ✅ fresh data here
  console.log("fresh", fresh);
  setRank(fresh.rank);
  setSite(fresh.link);
  setTitle(fresh.title);

    }
    

  }


  return (
    <div>

      <Header/> 
    

     <h1 class="font-bold text-4xl  text-center pt-10  bg-gray-300">My Dashboard</h1>

     <h2 class="text-2xl font-bold text-center pt-10  bg-gray-300">Rank Checker</h2>


     <div class="grid grid-cols-6 p-10 space-x-5 bg-gray-300 ">

      <div class="col-span-1"></div>

      <div class="col-span-2 bg-white  border-black p-3 rounded-2xl overflow-x-auto">

       <h2 class="text-2xl font-semibold text-center pb-3">Find SERP Rankings</h2>
        
        <div class="grid grid-cols-4  p-1">
        
        <div class=" col-span-3 bg-white ">
        
        <form action="/api/tracks" method="POST">
        
        
        <label for="url" class=" mr-10">URL </label>
        <input id="url" value={url} onChange={e =>setUrl(e.target.value)} class="bg-gray-100 p-1 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="https://example.com" required />

         <br/>
        <label for="url" class=" ">Keyword </label>
         <input id="url" value={query} onChange={e => setQuery(e.target.value)} class="bg-gray-100 p-1 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="GTA 6, Mods, Serp...." required />

         <br/>
        <label for="url" class=" ">Location </label>
        <select 
          id="country"
  name="country"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  className="bg-gray-100 p-2 rounded-2xl hover:bg-white m-2 w-60"
  required
>
  <option value="">Select country</option>
  <option value="lk">lk (Sri Lanka)</option>
  <option value="us">us (United States)</option>
  <option value="uk">uk (United Kingdom)</option>
  <option value="ca">ca (Canada)</option>
  <option value="in">in (India)</option>
  <option value="au">au (Australia)</option>
  <option value="de">de (Germany)</option>
  <option value="fr">fr (France)</option>
  <option value="jp">jp (Japan)</option>
  <option value="cn">cn (China)</option>
</select>
        <br/>
         
        
        </form> 

       </div>

       <div class=" col-span-1 bg-white ">
      <button onClick={rankCheckManual} class=" mt-10 bg-black rounded-3xl hover:bg-amber-500 text-amber-50 p-2 text-[20px] font-mono content-center" type="submit">Find  </button>

       </div>

       </div>


      </div>

      <div class="col-span-2 bg-white border-black p-3 rounded-2xl overflow-x-auto">

     <h2 class="text-3xl text-center mt-2 mb-10">Your Rank on Google is {rank}#</h2>

       <p class=" mb-1 font-bold text-center">{title}</p>

       <p class=" mb-1 text-center">{site}</p>


      </div>
       <div class="col-span-1"></div>

     


    </div>

    <UrlListWithRanks/>
     
    </div>
  );
}

export default Home;