import { Link } from 'react-router-dom';
import { useState } from 'react';
import img from '../assets/img/1logo.png';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login(){


    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");


    const{ mutateAsync:logUser, isPending } = useMutation({
        mutationFn: async () =>{
            const res = await axios.post('http://localhost:3000/api/user/login', {
                email:email,
                password:password,
                });
            return res.data; // 'NoUser' | 'WrongPass' | {status:'success', username:user.username, tier:user.tier}
        }

    })


    async function login(e){
        e.preventDefault();

        if(email == " " || password == " "){
            toast.error("All fields are required");
            return;
        } else {
            const stat = await logUser();   
            if(stat === 'NoUser'){
                toast.error("No user found with this email");  
                return;
            } else if(stat === 'WrongPass'){
                toast.error("Incorrect password");
                return;
            } else if(stat.status === 'success'){
                toast.success("Login successful");
                window.location.href = "/dashboard";
            }

        }


    }



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
        <h1 class="text-3xl text-center font-bold mt-20">Login</h1>
        <p class="mt-7 text-center">Don't have an account? <Link to="/signup">Register Today!</Link></p>
        <form class="mt-10" >
            <div class="mb-6 mx-10">    
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input onChange={e => setEmail(e.target.value)} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=""/>      
            </div>
            <div class="mb-6 mx-10">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=""/>
                        </div>
            <div class="flex items-start mb-6 mx-10">
            <div class="flex items-center h-5">
            <input onChange={e => setPassword(e.target.value)} id="remember" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"></input>
            </div>
           
            </div>
            <button onClick={login} type="submit" class="text-white bg-black hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-100 sm:w-auto px-5 py-2.5 text-center block mx-auto ">Login to your account</button>
        </form>
    
    </div>
</div>




</div>


<div class="col-span-1"></div>

</div>




)


} export default Login;