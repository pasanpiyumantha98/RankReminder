
function UrlListWithRanks() {
    return (
        <div>
            <h2 class="text-2xl font-black text-center m-10">Your Rankings</h2>

        <div class="flex justify-center">
            <p class="text-center mt-3">Last Checked - 23/10/2025 </p>  
            <button  class=" bg-black rounded-3xl hover:bg-amber-500 text-amber-50 p-2 text-[15px] font-mono content-center ml-5" type="submit">Check  </button>
        </div>


        <div class="gris grid-cols-5">
        <div class="col-span-1"></div>

        
        <div class="col-span-3">

        <div class="overflow-x-auto">
  

        </div>

        </div>
        
        
        <div class="col-span-1"></div>
        </div>

        </div>
    );
}

export default UrlListWithRanks;