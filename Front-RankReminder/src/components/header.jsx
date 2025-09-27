
function Header() {
  return (
    <header class="bg-black text-white p-6 pb-8">
        <div class="grid grid-cols-2">
             <h1 class="text-2xl font-bold pl-5">Rank Reminder</h1>
             
             <div class="grid-cols-3 text-mid p-3 text-right pr-24">
                <a href="/" class="px-4 ">Dashboard</a>
                <a href="/links" class="px-4  ">Links </a>
                <a href="/contact" class="px-4 ">Support</a> 
             </div>
        </div>
     
    </header>
  );
}

export default Header;