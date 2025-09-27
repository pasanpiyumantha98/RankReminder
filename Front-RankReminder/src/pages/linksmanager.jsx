import Header from "../components/header";


function LinksManager() {
  return (
    <div>
        <Header/>

        <h1 class="font-bold text-4xl mt-7 text-center">Links Manager</h1>
      
      <div class="grid grid-cols-3 m-10 p-10 ">
       
       <div></div>
       <div class="bg-gray-300 border-4 border-black p-3 rounded-2xl">
        <h2 class="text-2xl font-semibold content-center pb-3">Submit New Links</h2>
        
        <form action="/api/tracks" method="POST">
        
        
        <label for="url" class="text-xl mr-15">URL </label>
        <input id="url" class="bg-amber-100 p-2 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="https://example.com" required />

         <br/>
        <label for="url" class="text-xl mr-3">Keywords </label>
        <textarea id="url" class="bg-amber-100 p-2 rounded-2xl hover:bg-white m-2"  name="url" type="url" placeholder="GTA 6, Mods, Serp...." required />

         <br/>
        <label for="url" class="text-xl mr-5">Location </label>
        <input id="url" class="bg-amber-100 p-2 rounded-2xl hover:bg-white m-2 w-60"  name="url" type="url" placeholder="GTA 6, Mods, Serp...." required />

        <br/>
         <button class="m-3 pt-3 bg-black rounded-2xl hover:bg-amber-500 text-amber-50 p-2 text-[15px] font-mono content-center" type="submit">Submit</button>
        
        </form> 
        
        </div>
       <div></div>

      </div>
    </div>
  );
}   
export default LinksManager;