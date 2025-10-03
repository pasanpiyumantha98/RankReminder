import Header from "../components/header";
import {  useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


function LinksManager() {


  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");   
  const[uid,setUid] = useState("22");  // Temporary UID for testing purpose
  const [urlList,setUrlList] = useState([]);
  

  const {data,isFetching,refetch} = useQuery({
      queryKey:['UrlRegister-ACC', { uid: uid, url:url, query:query, location:location }],
      queryFn: async () => {
        const res = await axios.post('http://localhost:3000/api/url/insert', {uid: uid, url:url, query:query, location:location});
        return res.data;},
        enabled: false
      });


   const {data : urlData,isFetching : urlFetching,refetch:urlsRefetch} = useQuery({   
    queryKey:['FindAllUrls', { uid: uid }],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/url/findall/${uid}`);

      if(res.status !== 200) {
        
        return res.send('Error fetching URLs');
      } 
      return res.data;},
      
    });


   

async function registerUrl(e){

    e.preventDefault();
  
      if(url === "" || query === "" || location === ""){
        toast.error("Please fill all the fields");
        return;
      } else{

      const { data: fresh } = await refetch();
      if (fresh?.error) return toast.error(fresh.error);
      

      
        toast.success("URL Registered Successfully");
        setUrl("");
        setQuery("");
        setLocation("");
        urlsRefetch();

      }


}


  return (
    <div>
        <Header/>

        <h1 class="font-bold text-4xl mt-7 text-center">Links Manager</h1>
      
      <div class="grid grid-cols-3 m-10 p-10 ">
       
       <div></div>
       <div class="bg-gray-200 border-4 border-black p-3 rounded-2xl">
        <h2 class="text-2xl font-semibold content-center pb-3 text-center">Submit New Links</h2>
        
        <form  method="POST">
        
        
        <label for="url" class="text-xl mr-15">Url </label>
        <input value={url} onChange={e => setUrl(e.target.value)} id="url" class="bg-amber-100 p-2 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="https://example.com" required />

         <br/>
        <label for="url" class="text-xl mr-3">Keyword </label>
        <input value={query} onChange={e=> setQuery(e.target.value)} id="url" class="bg-amber-100 p-2 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="GTA 6, Mods, Serp...." required />

         <br/>
        <label for="url" class="text-xl mr-5">Country </label>
        <input value={location} onChange={e=> setLocation(e.target.value)} id="url" class="bg-amber-100 p-2 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="lk,us,uk...." required />

        <br/>
         <button onClick={registerUrl} class="m-3 pt-3 bg-black rounded-2xl hover:bg-amber-500 text-amber-50 p-2 text-[15px] font-mono content-center" type="submit">Insert</button>
        
        </form> 
        
        </div>
       <div></div>

      </div>

      <div class="grid grid-cols-5">


      <div class="col-span-1"></div>

      <div class="col-span-3">

      <div class="overflow-x-auto">
  <table class="min-w-full border border-gray-300 divide-y divide-gray-200 mb-10">
    <thead class="bg-gray-100">
      <tr>
       
       <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">URL</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Keyword</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
        <th class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
     
        { urlFetching ? <p class="text-center text-lg font-semibold">Loading...</p> :
        urlData.map((item,index)=>(
     <tr key={index}>
        <td class="px-6 py-4 whitespace-nowrap text-blue-600">{index+1}</td>
        <td class="px-6 py-4 whitespace-nowrap text-blue-600">{item.url}</td>
        <td class="px-6 py-4 whitespace-nowrap">{item.query}</td>
        <td class="px-6 py-4 whitespace-nowrap">{item.location.toUpperCase()}</td>
        <td class="px-6 py-4 whitespace-nowrap text-center">
          
          <button class="ml-2 px-3 py-1 bg-red-400 text-white rounded hover:bg-red-300">Remove</button>
        </td>
      </tr>

        ))

        }
       
     
    </tbody>
  </table>
</div>


      </div>

      <div class="col-span-1"></div>
      </div>





    </div>
  );
}   
export default LinksManager;