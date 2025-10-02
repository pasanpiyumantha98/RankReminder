import Header from "../components/header";
import {  useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";


function LinksManager() {


  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");   
  const[uid,setUid] = useState("45");  // Temporary UID for testing purpose

  const {data,isFetching,refetch} = useQuery({
      queryKey:['UrlRegister-ACC', { uid: uid, url:url, query:query, location:location }],
      queryFn: async () => {
        const res = await axios.post('http://localhost:3000/api/url/insert', {uid: uid, url:url, query:query, location:location});
        return res.data;},
        enabled: false
      });

async function registerUrl(e){

    e.preventDefault();
  
      if(url === "" || query === "" || location === ""){
        toast.error("Please fill all the fields");
        return;
      } else{

       const { data: fresh } = await refetch();   // ✅ fresh data here
        
        console.log("fresh", fresh);

        if (fresh?.error) {
      toast.error(fresh.error);
      return;
    }

        toast.success("URL Registered Successfully");
        //setUrl("");
        //setQuery("");
        //setLocation("");

      }


}


  return (
    <div>
        <Header/>

        <h1 class="font-bold text-4xl mt-7 text-center">Links Manager</h1>
      
      <div class="grid grid-cols-3 m-10 p-10 ">
       
       <div></div>
       <div class="bg-gray-300 border-4 border-black p-3 rounded-2xl">
        <h2 class="text-2xl font-semibold content-center pb-3 text-center">Submit New Links</h2>
        
        <form action="/api/tracks" method="POST">
        
        
        <label for="url" class="text-xl mr-15">URL </label>
        <input value={url} onChange={e => setUrl(e.target.value)} id="url" class="bg-amber-100 p-2 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="https://example.com" required />

         <br/>
        <label for="url" class="text-xl mr-3">Keywords </label>
        <textarea value={query} onChange={e=> setQuery(e.target.value)} id="url" class="bg-amber-100 p-2 rounded-2xl hover:bg-white m-2"  name="url" type="url" placeholder="GTA 6, Mods, Serp...." required />

         <br/>
        <label for="url" class="text-xl mr-5">Location </label>
        <input value={location} onChange={e=> setLocation(e.target.value)} id="url" class="bg-amber-100 p-2 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="GTA 6, Mods, Serp...." required />

        <br/>
         <button onClick={registerUrl} class="m-3 pt-3 bg-black rounded-2xl hover:bg-amber-500 text-amber-50 p-2 text-[15px] font-mono content-center" type="submit">Insert</button>
        
        </form> 
        
        </div>
       <div></div>

      </div>
    </div>
  );
}   
export default LinksManager;