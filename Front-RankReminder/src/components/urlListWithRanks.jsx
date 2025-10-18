import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


function UrlListWithRanks() {


    const [uid,setUid] = useState(localStorage.getItem('uid') || ''); 

    const {data : urlData,isFetching : urlFetching, refetch:urlsRefetch} = useQuery({

        queryKey:['FindAllurls'],
        queryFn: async () => {
          const res = await axios.get(`http://localhost:3000/api/url/findall/${uid}`);

          if(res.status !== 200) {
            return res.send('Error fetching URLs');
          }
            else 
            {
              return res.data;
            }
        
        }


      }); 


     

        const {data : refreshData, isFetching : refreshFetching, refetch : refetchURL} = useQuery({
          queryKey:['RankCheckHome'],
          queryFn: async () => {
              const res = await axios.get(`http://localhost:3000/api/url/rank/check/home/${uid}`);
               window.location.reload();
               
          },
          enabled: false

        });

           

          
           
        const lastChek = urlData && urlData.length>0 ? new Date(urlData[0].lastChecked).toLocaleString() : 'No Data';

     


    return (
        <div class=" bg-gray-300">
            <h2 class="text-2xl font-black text-center ">Your Rankings</h2>

        <div class="flex justify-center mt-3">
            <p class="text-center">Last Checked - </p> {urlFetching? <p class="">Loading</p> : <p class=""> {lastChek }</p>} 
            <button onClick={refetchURL} class=" bg-black rounded-3xl hover:bg-amber-500 text-amber-50 p-1 text-[15px] font-mono content-center ml-5" type="submit">Check  </button>

        </div>
          {refreshFetching? <p class="text-1xl  text-center m-10">Rechecking in progress ....</p> : null}

        <div class="grid grid-cols-5">
        <div class="col-span-1"></div>

        
        <div class="col-span-3">

        <div class="overflow-x-auto">

        <table class="min-w-full border border-gray-300 divide-y divide-gray-200 mb-10 mt-10">
        <thead class="bg-gray-100">
         <tr>
       
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">URL</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Keyword</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
        <th class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Rank</th>
         <th class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Change</th>
         </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">

        {  urlData && urlData.length>0 ?( urlData.map((item,index)=>(
     <tr key={index}>
        <td class="px-6 py-4 whitespace-nowrap text-blue-600">{index+1}</td>    
        <td class="px-6 py-4 whitespace-nowrap text-blue-600">{item.url}</td>
        <td class="px-6 py-4 whitespace-nowrap">{item.query}</td>
        <td class="px-6 py-4 whitespace-nowrap">{item.location.toUpperCase()}</td>
        <td class="px-6 py-4 whitespace-nowrap text-center">{item.nrank}</td>
        <td class="px-6 py-4 whitespace-nowrap text-center">{item.nrank>item.prank?"Down":item.nrank==item.prank?"No Change":item.nrank<item.prank?"Up":"NA"}</td>
      </tr> 
        
         ))) :<center> <p class="text-center text-lg ">No URLs Found</p></center>


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

export default UrlListWithRanks;