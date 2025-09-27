import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/home.jsx'
import LinksManager from './pages/linksmanager.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/links' element={<LinksManager/>} />
   
   
   
    </Routes>
   
  </BrowserRouter>,
)
