import icon from '../assets/img/icon.png';
import user from '../assets/img/user.png';
import { useState } from 'react';




function Header() {



  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  function logout(){

    localStorage.clear();
    window.location.href = "/";

  }

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

     <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none"
          >
           <img src={user} class="w-9 mr-10"></img>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-50">
              <a
                href="/account"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Account
              </a>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>


  </div>
</header>

  );
}

export default Header;