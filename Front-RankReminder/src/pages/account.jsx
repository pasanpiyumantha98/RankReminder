import Header from "../components/header";
import man from "../assets/img/man.png";
import pro from '../assets/img/pro.png';
import free from '../assets/img/free.png';
import { useState } from "react";
import axios from "axios";
import { useQuery,useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";



function Account() {



  const[tier,setTier] = useState(localStorage.getItem('tier') || 'free');
  const[username,setUsername] = useState(localStorage.getItem('username') || 'User');

  const[uid,setUid] = useState(localStorage.getItem('uid') || 'No');


  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const [deactivateCheck, setdeactivateCheck] = useState("");

  const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 0,
};

// Deactivate account 
  const [open, setOpen] = useState(false); 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


// Change password 
  const [openPass, setPassOpen] = useState(false); 
  const setPassHandleOpen = () => setPassOpen(true);
  const setPassHandleClose = () => setPassOpen(false);

  const {data:UserData} =useQuery({
    queryKey: ['getUserDetails', uid],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/user/details/${uid}`);
      return response.data;
    }



  })

  const creditsLeft = UserData ? UserData.credits : 0;

  const { mutateAsync:changePass } = useMutation({
    mutationFn: async () => {
      const res = await axios.post('http://localhost:3000/api/user/change/password', {uid:uid, cpass:currentPass, npass:newPass});
      return res.data; 
    }});

  async function loginSubmit(e){
    e.preventDefault();
    if(newPass !== confirmNewPass){
      toast.error("New Password and Confirm New Password do not match.");
      return;
    }
    const stat = await changePass();

    if(stat === 'WrongPass'){  
      toast.error("Current Password is incorrect.");
      return;
    } else if(stat === 'success'){
      toast.success("Password changed successfully.");
      setPassHandleClose();
    }

  }

  const {mutateAsync:deactivateAccount} = useMutation({
    mutationFn : async () =>{ 
      const res = await axios.post('http://localhost:3000/api/user/deactivate/account', {uid:uid});
      return res.data;
    }});

  async function deactivateSubmit(e){
    e.preventDefault();

    if(deactivateCheck !== "Deactivate My Account"){
      toast.error("Challange does not match!");
      return;
    }
    const stat = await deactivateAccount();
    if(stat === 'success'){
      toast.success("Account deactivated successfully.");
      localStorage.clear();
      window.location.href = "/";
    }

  }

  


  return (
    <>
    <Header/>

    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 bg-gray-300 h-screen">

    <div class="grid-cols-1"></div>

    <div class="col-span-4   m-10  bg-white rounded-3xl p-10 ">
     <img src={tier === 'pro' ? pro : free} alt="Tier Icon" className="w-8 h-8" />
    

   <div class="flex flex-col items-center justify-center">
  <img src={man} class="rounded-4xl" />
  <h1 class="text-3xl font-bold font-sans mt-4">Hello {username}....</h1>


  <h2 class="text-9xl text-amber-400 font-bold mt-8">{creditsLeft}</h2>  
  <h3 class="text-1xl  font-sans mt-1">Credits Left</h3> 

  
  <div class="flex flex-row items-center justify-center">
  <button onClick={setPassHandleOpen} class="mt-3 bg-black rounded-2xl hover:bg-amber-500 text-amber-50 p-2 text-[11px] font-mono content-center">Change Password</button>
  <button class="mt-3 ml-2 bg-black rounded-2xl hover:bg-amber-500 text-amber-50 p-2 text-[15px] font-mono content-center font-semibold">Upgrade Plan</button>
  <button onClick={handleOpen} class="mt-3 ml-2 bg-black rounded-2xl hover:bg-amber-500 text-amber-50 p-2 text-[11px] font-mono content-center">Deactivate Account</button>
    
    <Modal
  open={openPass}
  onClose={setPassHandleClose}
  aria-labelledby="change-password-title"
  aria-describedby="change-password-description"
>
  <Box sx={style}>
    <Typography
      id="change-password-title"
      variant="h6"
      component="h2"
      className="text-center font-bold mb-4"
    >
      Change Password
    </Typography>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        // 👉 Handle password change logic here
        console.log("Password changed!");
        setPassHandleClose();
      }}
    >
      <div className="flex flex-col space-y-3">
        <input
          type="password"
          placeholder="Current Password"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
          onChange={e=> setCurrentPass(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
          onChange={e=> setNewPass(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
          onChange={e=> setConfirmNewPass(e.target.value)}
        />
      </div>
      {newPass==confirmNewPass ? null : <p class="text-red-500 mt-2">New Password and Confirm New Password do not match.</p>}

      <div className="flex justify-end space-x-3 mt-5">
        <button
          type="button"
          onClick={setPassHandleClose}
          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
        >
          Cancel
        </button>
        <button
          onClick={loginSubmit}
          type="submit"
          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-amber-500"
        >
          Update
        </button>
      </div>
    </form>
  </Box>
</Modal>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" clas="text-center">
           Deactivation!
          </Typography>

           <form
      onSubmit={(e) => {
        e.preventDefault();
        // 👉 Handle password change logic here
        console.log("Password changed!");
        handleClose();
      }}
    >
      <div className="flex flex-col space-y-3">
        <p clas="m-3">Please type "Deactivate My Account" and click</p>
        <input
          type="text"
          placeholder="Enter the challange"
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
          onChange={e=> setdeactivateCheck(e.target.value)}
        />
      </div>
      {deactivateCheck=="Deactivate My Account" ? null : <p class="text-red-500 mt-2">Challange does not match!</p>}

      <div className="flex justify-end space-x-3 mt-5">
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
        >
          Cancel
        </button>
        <button
          onClick={deactivateSubmit}
          type="submit"
          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-amber-500"
        >
          Deactivate
        </button>
      </div>
    </form>
         
            </Box>
      </Modal>
   
    </div>

  </div>


    </div>

    <div class="grid-cols-1"></div>
    </div>
    


    
    </>
  );
}

export default Account;