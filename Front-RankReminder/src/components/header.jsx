import icon from '../assets/img/icon.png';


function Header() {
  return (
<header class="bg-black text-white px-8 py-4 shadow-md">
  <div class="flex flex-wrap items-center justify-between">
    
    <div class="flex items-center space-x-3">
      <img src={icon} alt="Rank Reminder Logo" class="w-14 h-14 object-contain ml-20 mt-3"></img>
      <h1 class="text-2xl font-bold tracking-wide">Rank Reminder</h1>
    </div>

   
    <nav class="flex items-center space-x-8 text-lg font-medium">
      <a href="/dashboard" class="hover:text-amber-400 transition-colors duration-200">Dashboard</a>
      <a href="/links" class="hover:text-amber-400 transition-colors duration-200">Links</a>
      <a href="/account" class="hover:text-amber-400 transition-colors duration-200">My Account</a>
    </nav>
  </div>
</header>

  );
}

export default Header;