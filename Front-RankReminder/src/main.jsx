import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/home.jsx'
import LinksManager from './pages/linksmanager.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Account from './pages/account.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
   <ToastContainer />
    <Routes>
      <Route path='/dashboard' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/links' element={<ProtectedRoute><LinksManager/></ProtectedRoute>} />
      <Route path='/'element={<Login/>}/> 
      <Route path='/signup'element={<Signup/>}/>   
      <Route path='/account'element={<ProtectedRoute><Account/></ProtectedRoute>}/> 
      <Route path='*' element={<Login/>}/>
      
   
    </Routes>
   </QueryClientProvider>
  </BrowserRouter>,
)
