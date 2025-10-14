import img from '../assets/img/1logo.png';

function Signup(){

return(



<div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 bg-black h-screen">

<div class="col-span-1"></div>

<div class="col-span-4  border-4 m-10  bg-gray-100 rounded-2xl">

<div class=" grid grid-cols-1  sm:grid-cols-2">

    <div class=" justify-center items-center bg-gray-200 h-151">
    <img src={img} class="size-80 mt-20 ml-20"></img>
    <p class="font-semibold text-center">SERP Tracking Made easy..</p>
   
    </div>
    
    
    <div>
        <h1 class="text-3xl text-center font-bold mt-20">Register</h1>
        <form class="mt-5" >
            <div class="mb-6 mx-10">    
            <label for="email" class="block mb-1 text-sm font-medium text-gray-900">Your Name</label>
            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=""/>      
            </div>
            <div class="mb-6 mx-10">    
            <label for="email" class="block mb-1 text-sm font-medium text-gray-900">Your Email</label>
            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=""/>      
            </div>
            <div class="mb-6 mx-10">
            <label for="password" class="block mb-1 text-sm font-medium text-gray-900">Your Password</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=""/>
            </div>
            <div class="mb-6 mx-10">
            <label for="password" class="block mb-1 text-sm font-medium text-gray-900">Re-enter Password</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=""/>
            </div>
            <div class="flex items-start mb-6 mx-10">
            <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"></input>
            </div>
            <label for="remember" class="ml-2 text-sm font-medium text-gray-900">Remember me</label>
            </div>
            <button type="submit" class="block mx-auto  text-white bg-black hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-100 sm:w-auto px-5 py-2.5 text-center  ">Sign Up</button>
        </form>
    
    </div>
</div>




</div>


<div class="col-span-1"></div>

</div>




)


} export default Signup;