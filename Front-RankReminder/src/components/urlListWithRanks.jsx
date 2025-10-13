import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


function UrlListWithRanks() {


    const [uid,setUid] = useState("12345"); 

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
              const res = await axios.get('http://localhost:3000/api/url/rank/check/home/12345');
               window.location.reload();
          },
          enabled: false

        });

           

          
           


     


    return (
        <div>
            <h2 class="text-2xl font-black text-center m-10">Your Rankings</h2>

        <div class="flex justify-center">
            <p class="text-center ">Last Checked - </p> {urlFetching? <p classs="mt-3">Loading</p> : <p classs="mt-5"> {urlData[0].lastChecked}</p>} 
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
         </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">

        {  urlData && urlData.length>0 ?( urlData.map((item,index)=>(
     <tr key={index}>
        <td class="px-6 py-4 whitespace-nowrap text-blue-600">{index+1}</td>    
        <td class="px-6 py-4 whitespace-nowrap text-blue-600">{item.url}</td>
        <td class="px-6 py-4 whitespace-nowrap">{item.query}</td>
        <td class="px-6 py-4 whitespace-nowrap">{item.location.toUpperCase()}</td>
        <td class="px-6 py-4 whitespace-nowrap text-center">{item.rank}</td>
      </tr> 
        
         ))) : <p class="text-center text-lg ">No URLs Found</p>


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