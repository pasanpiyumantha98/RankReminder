import Header from "../components/header";

function Home() {
  return (
    <div>

      <Header/> 

     <h1 class="font-bold text-4xl mt-7 text-center">My Dashboard</h1>

     <div class="grid grid-cols-5 m-10 p-10 space-x-5">

      <div class="col-span-2 bg-gray-300 border-4 border-black p-3 rounded-2xl">

       <h2 class="text-2xl font-semibold text-center pb-3">Find SERP Rankings</h2>
        
        <div class="grid grid-cols-4  p-1">
        
        <div class=" col-span-3 bg-gray-300 ">
        
        <form action="/api/tracks" method="POST">
        
        
        <label for="url" class="text-xl mr-10">URL </label>
        <input id="url" class="bg-amber-100 p-1 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="https://example.com" required />

         <br/>
        <label for="url" class="text-xl ">Keyword </label>
         <input id="url" class="bg-amber-100 p-1 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="GTA 6, Mods, Serp...." required />

         <br/>
        <label for="url" class="text-xl ">Location </label>
        <input id="url" class="bg-amber-100 p-1 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="lk, us" required />

        <br/>
         
        
        </form> 

       </div>

       <div class=" col-span-1 bg-gray-300 ">
      <button class=" mt-10 bg-black rounded-3xl hover:bg-amber-500 text-amber-50 p-2 text-[20px] font-mono content-center" type="submit">Find > </button>

       </div>

       </div>


      </div>

      <div class="col-span-2 bg-gray-200 border-4 border-black p-3 rounded-2xl">

     <h2 class="text-3xl text-center mt-2 mb-10">Your Rank on Google is 1#</h2>

       <p class=" mb-1 font-bold text-center">GTA 6 Mods</p>

       <p class=" mb-1 text-center">www.gta6modding.com</p>


      </div>

     


    </div>
     
    </div>
  );
}

export default Home;